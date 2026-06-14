import { describe, expect, it } from "vitest";
import { acceptsNDJSON, type Sink, sinkContext, withStream } from "./stream.ts";

describe("acceptsNDJSON", () => {
  function reqWith(accept: string | null): Request {
    const headers = new Headers();
    if (accept !== null) {
      headers.set("Accept", accept);
    }
    return new Request("https://example.com/", { method: "POST", headers });
  }

  it("returns true for application/x-ndjson", () => {
    expect(acceptsNDJSON(reqWith("application/x-ndjson"))).toBe(true);
  });

  it("returns true when ndjson is one of several types", () => {
    expect(acceptsNDJSON(reqWith("application/json, application/x-ndjson"))).toBe(true);
  });

  it("returns false for application/json", () => {
    expect(acceptsNDJSON(reqWith("application/json"))).toBe(false);
  });

  it("returns false when Accept header is missing", () => {
    expect(acceptsNDJSON(reqWith(null))).toBe(false);
  });
});

describe("withStream", () => {
  async function readAll(response: Response): Promise<string[]> {
    const text = await response.text();
    return text.split("\n").filter((line) => line.length > 0);
  }

  it("returns a streaming Response with NDJSON content type and no-store cache header", async () => {
    const response = withStream(
      async () => new Response(JSON.stringify({ ok: true }), { status: 200 }),
    );
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/x-ndjson");
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    const lines = await readAll(response);
    expect(lines).toHaveLength(1); // just the summary line
    expect(JSON.parse(lines[0] ?? "")).toEqual({
      event: "summary",
      status: 200,
      payload: { ok: true },
    });
  });

  it("emits log lines from inside the handler before the summary", async () => {
    const response = withStream(async () => {
      const sink = sinkContext.getStore();
      sink?.emit({
        event: "log",
        level: "info",
        area: "test",
        op: "step",
        message: "hello",
      });
      sink?.emit({
        event: "log",
        level: "warn",
        area: "test",
        op: "step",
        message: "warn1",
      });
      return new Response(JSON.stringify({ ok: true, n: 2 }), { status: 200 });
    });
    const lines = (await readAll(response)).map((l) => JSON.parse(l));
    expect(lines).toHaveLength(3);
    expect(lines[0]).toMatchObject({ event: "log", level: "info", message: "hello" });
    expect(lines[1]).toMatchObject({ event: "log", level: "warn", message: "warn1" });
    expect(lines[2]).toEqual({
      event: "summary",
      status: 200,
      payload: { ok: true, n: 2 },
    });
  });

  it("emits an error event when the handler throws", async () => {
    const response = withStream(async () => {
      throw new Error("boom");
    });
    const lines = (await readAll(response)).map((l) => JSON.parse(l));
    expect(lines).toContainEqual({ event: "error", message: "boom" });
  });

  it("preserves non-200 status from the handler in the summary line", async () => {
    const response = withStream(
      async () => new Response(JSON.stringify({ ok: false, error: "nope" }), { status: 400 }),
    );
    const lines = (await readAll(response)).map((l) => JSON.parse(l));
    expect(lines.at(-1)).toEqual({
      event: "summary",
      status: 400,
      payload: { ok: false, error: "nope" },
    });
  });

  it("falls back to { raw } when handler returns a non-JSON body", async () => {
    const response = withStream(async () => new Response("plain text", { status: 200 }));
    const lines = (await readAll(response)).map((l) => JSON.parse(l));
    expect(lines.at(-1)).toEqual({
      event: "summary",
      status: 200,
      payload: { raw: "plain text" },
    });
  });

  it("provides the same sink instance to all calls within a single handler invocation", async () => {
    const sinks = new Set<Sink>();
    const response = withStream(async () => {
      const s1 = sinkContext.getStore();
      await Promise.resolve();
      const s2 = sinkContext.getStore();
      if (s1) {
        sinks.add(s1);
      }
      if (s2) {
        sinks.add(s2);
      }
      return new Response("{}", { status: 200 });
    });
    await response.text();
    expect(sinks.size).toBe(1);
  });
});
