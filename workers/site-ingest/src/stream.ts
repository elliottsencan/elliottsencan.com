/**
 * NDJSON streaming substrate. Wraps a handler so its log emissions tee to
 * the response body (one JSON object per line) and its final Response is
 * appended as a `{ event: "summary", ... }` line. Operators and agents see
 * progress immediately instead of waiting 30-90s for a buffered JSON blob.
 *
 * The active sink is propagated via AsyncLocalStorage so `util.ts/log.*` can
 * read it without callers having to thread a sink argument through every
 * layer. `nodejs_compat` (already enabled in wrangler.toml) provides
 * `node:async_hooks`.
 */

import { AsyncLocalStorage } from "node:async_hooks";

export type StreamEvent =
  | {
      event: "log";
      level: "info" | "warn" | "error";
      area: string;
      op: string;
      message: string;
      fields?: Record<string, unknown>;
    }
  | { event: "summary"; status: number; payload: unknown }
  | { event: "error"; message: string };

export interface Sink {
  emit(event: StreamEvent): void;
}

export const sinkContext = new AsyncLocalStorage<Sink>();

const encoder = new TextEncoder();

/** True if the request opts into NDJSON streaming. */
export function acceptsNDJSON(request: Request): boolean {
  const accept = request.headers.get("Accept") ?? "";
  return accept.includes("application/x-ndjson");
}

/**
 * Runs `handler` inside an ALS context with an active sink, returning a
 * streaming Response. `log.*` calls inside `handler` tee to the sink. When
 * `handler` resolves, its Response body is parsed (best-effort JSON) and
 * emitted as a final summary line, preserving the existing JSON payload
 * for callers that read past the line breaks.
 */
export function withStream(handler: () => Promise<Response>): Response {
  const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>();
  const writer = writable.getWriter();
  const sink: Sink = {
    emit(event) {
      // Best-effort: if the writer is closed (caller hung up), swallow.
      writer.write(encoder.encode(`${JSON.stringify(event)}\n`)).catch(() => {});
    },
  };

  // Don't await the drain — return the streaming Response immediately so
  // bytes flow as soon as the handler emits them. The handler runs
  // concurrently and writes through the sink.
  void sinkContext.run(sink, async () => {
    try {
      const response = await handler();
      const text = await response.clone().text();
      let payload: unknown;
      try {
        payload = JSON.parse(text);
      } catch {
        payload = { raw: text };
      }
      sink.emit({ event: "summary", status: response.status, payload });
    } catch (err) {
      sink.emit({
        event: "error",
        message: err instanceof Error ? err.message : String(err),
      });
    } finally {
      try {
        await writer.close();
      } catch {
        // Already closed.
      }
    }
  });

  return new Response(readable, {
    status: 200,
    headers: {
      "Content-Type": "application/x-ndjson",
      "Cache-Control": "no-store",
    },
  });
}
