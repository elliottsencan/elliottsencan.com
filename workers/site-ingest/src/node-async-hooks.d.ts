/**
 * Minimal ambient declaration for `node:async_hooks` so TypeScript can
 * resolve the import. Cloudflare Workers exposes AsyncLocalStorage at
 * runtime via the `nodejs_compat` compatibility flag (see wrangler.toml),
 * but `@cloudflare/workers-types` does not ship the type. Pulling in all
 * of `@types/node` would conflict with workers-types' DOM-style globals
 * (Request, Response, etc.), so we declare only what we use.
 */
declare module "node:async_hooks" {
  export class AsyncLocalStorage<T> {
    getStore(): T | undefined;
    run<R>(store: T, callback: () => R): R;
  }
}
