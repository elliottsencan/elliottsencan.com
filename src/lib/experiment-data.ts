import fs from "node:fs/promises";
import path from "node:path";

const EXPERIMENTS_DIR = "src/content/experiments";

/**
 * Build-time loader for an experiment's raw measurements JSON.
 *
 * `dataPath` is treated as relative to `src/content/experiments/`. Used by
 * the experiments detail page so the rendered HTML is inert — no client-side
 * fetches, no runtime file reads. Failures (missing file, parse error)
 * degrade to `null` and log a warning rather than failing the build, since
 * an experiment can ship its prose before the data lands.
 */
export async function loadExperimentData(dataPath: string | undefined): Promise<unknown | null> {
  if (!dataPath) {
    return null;
  }
  // Normalize before the boundary check so `..` segments collapse.
  const resolved = path.normalize(path.join(EXPERIMENTS_DIR, dataPath));
  if (!resolved.startsWith(`${EXPERIMENTS_DIR}/`)) {
    console.warn(`[experiments] dataPath escapes content dir: ${dataPath}`);
    return null;
  }
  try {
    const raw = await fs.readFile(resolved, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.warn(
      `[experiments] failed to load dataPath ${dataPath}: ${err instanceof Error ? err.message : "unknown"}`,
    );
    return null;
  }
}
