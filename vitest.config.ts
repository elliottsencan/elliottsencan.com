import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Mirrors `paths: { "@*": ["./src/*"] }` in tsconfig.json so test files
// can use the same import shape as runtime code. Site-only — the worker
// at workers/site-ingest/ has its own vitest install + config.
export default defineConfig({
  resolve: {
    alias: [
      {
        // Matches `@lib/...`, `@components/...`, etc. Trailing slash so `@`
        // alone (rare) isn't rewritten.
        find: /^@(?=\w)/,
        replacement: fileURLToPath(new URL("./src/", import.meta.url)),
      },
    ],
  },
  test: {
    include: ["src/**/*.test.ts"],
    exclude: ["workers/**", "node_modules/**", "dist/**"],
    environment: "node",
  },
});
