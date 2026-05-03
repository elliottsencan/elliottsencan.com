import fs from "node:fs/promises";
import path from "node:path";

const LABS_DIR = "src/content/labs";

/**
 * Build-time loader for a lab cell's raw measurements JSON.
 *
 * `dataPath` is treated as relative to `src/content/labs/`. Used by both
 * the index preview and the entry page so the rendered HTML is inert — no
 * client-side fetches, no runtime file reads. Failures (missing file,
 * parse error) degrade to `null` and log a warning rather than failing
 * the build, since a cell can ship its prose before the data lands.
 *
 * Ported from PR #25's `loadExperimentData` (a workable scaffold for the
 * /experiments surface, renamed here to match the new IA's /labs naming).
 */
export async function loadLabData(dataPath: string | undefined): Promise<unknown | null> {
  if (!dataPath) {
    return null;
  }
  // Normalize before the boundary check so `..` segments collapse.
  const resolved = path.normalize(path.join(LABS_DIR, dataPath));
  if (!resolved.startsWith(`${LABS_DIR}/`)) {
    console.warn(`[labs] dataPath escapes content dir: ${dataPath}`);
    return null;
  }
  try {
    const raw = await fs.readFile(resolved, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.warn(
      `[labs] failed to load dataPath ${dataPath}: ${err instanceof Error ? err.message : "unknown"}`,
    );
    return null;
  }
}
