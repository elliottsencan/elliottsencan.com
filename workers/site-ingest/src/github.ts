/**
 * GitHub REST API wrapper. Two commit shapes supported:
 *   - PR flow (used by the /now weekly draft): create branch → commit file →
 *     open PR against main.
 *   - Direct commit to main (used by the /link reading pipeline): single PUT
 *     per entry, no PR.
 *
 * Auth: fine-grained PAT with contents:write + pull_requests:write on the
 * elliottsencan.com repo only. No other scopes, no other repos.
 */

import type { Result } from "./types.ts";
import { log } from "./util.ts";

const API_ROOT = "https://api.github.com";
const USER_AGENT = "site-ingest-worker";

interface GitHubDeps {
  token: string;
  repo: string; // owner/name
}

async function ghFetch<T>(
  path: string,
  init: RequestInit,
  deps: GitHubDeps,
  op: string,
): Promise<Result<T>> {
  try {
    const res = await fetch(`${API_ROOT}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${deps.token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": USER_AGENT,
        ...(init.body ? { "Content-Type": "application/json" } : {}),
        ...(init.headers ?? {}),
      },
    });
    if (!res.ok) {
      const body = await res.text();
      log.warn("github", op, "non-ok response", {
        status: res.status,
        path,
        bodyLen: body.length,
      });
      return { ok: false, error: `HTTP ${res.status}` };
    }
    // 204 No Content paths (rare here) → empty data
    if (res.status === 204) return { ok: true, data: {} as T };
    return { ok: true, data: (await res.json()) as T };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    log.error("github", op, "fetch threw", { path, msg });
    return { ok: false, error: msg };
  }
}

// ---------- file contents ----------

interface ContentsResponse {
  sha: string;
  content: string;
  encoding: string;
}

/**
 * Fetch a file from the repo at the given ref (defaults to main). Returns
 * decoded UTF-8 content plus the blob SHA needed to update the file.
 */
export async function getFile(
  path: string,
  ref: string,
  deps: GitHubDeps,
): Promise<Result<{ content: string; sha: string }>> {
  const url = `/repos/${deps.repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(ref)}`;
  const res = await ghFetch<ContentsResponse>(url, { method: "GET" }, deps, "get-file");
  if (!res.ok) return res;
  if (res.data.encoding !== "base64") {
    return { ok: false, error: `unexpected encoding ${res.data.encoding}` };
  }
  // atob works at the Workers runtime and yields a binary string; decode as UTF-8.
  const binary = atob(res.data.content.replace(/\n/g, ""));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  const content = new TextDecoder("utf-8").decode(bytes);
  return { ok: true, data: { content, sha: res.data.sha } };
}

// ---------- branches ----------

interface RefResponse {
  ref: string;
  object: { sha: string };
}

/** Get the tip commit SHA for a branch. */
export async function getBranchSha(branch: string, deps: GitHubDeps): Promise<Result<string>> {
  const res = await ghFetch<RefResponse>(
    `/repos/${deps.repo}/git/ref/heads/${encodeURIComponent(branch)}`,
    { method: "GET" },
    deps,
    "get-branch",
  );
  if (!res.ok) return res;
  return { ok: true, data: res.data.object.sha };
}

/**
 * Create a new branch from an existing commit SHA. Returns `ok: true` with
 * `alreadyExists: true` if the branch exists — idempotent by design so a
 * re-run of the same day's cron doesn't fail.
 */
export async function createBranch(
  branch: string,
  fromSha: string,
  deps: GitHubDeps,
): Promise<Result<{ alreadyExists: boolean }>> {
  const existing = await getBranchSha(branch, deps);
  if (existing.ok) {
    return { ok: true, data: { alreadyExists: true } };
  }
  const res = await ghFetch<RefResponse>(
    `/repos/${deps.repo}/git/refs`,
    {
      method: "POST",
      body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: fromSha }),
    },
    deps,
    "create-branch",
  );
  if (!res.ok) return res;
  return { ok: true, data: { alreadyExists: false } };
}

// ---------- file writes ----------

interface PutFileResponse {
  content: { sha: string; path: string };
  commit: { sha: string };
}

/**
 * Create-or-update a file on a given branch. If the path already exists on
 * that branch, pass `sha` (the blob SHA from getFile); otherwise omit it.
 */
export async function putFile(args: {
  path: string;
  branch: string;
  content: string;
  message: string;
  sha?: string;
  deps: GitHubDeps;
}): Promise<Result<{ blobSha: string; commitSha: string }>> {
  const { path, branch, content, message, sha, deps } = args;
  // Encode content as base64 (UTF-8-safe).
  const bytes = new TextEncoder().encode(content);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  const base64 = btoa(binary);

  const body: Record<string, unknown> = {
    message,
    content: base64,
    branch,
  };
  if (sha) body.sha = sha;

  const res = await ghFetch<PutFileResponse>(
    `/repos/${deps.repo}/contents/${encodeURIComponent(path)}`,
    { method: "PUT", body: JSON.stringify(body) },
    deps,
    "put-file",
  );
  if (!res.ok) return res;
  return {
    ok: true,
    data: { blobSha: res.data.content.sha, commitSha: res.data.commit.sha },
  };
}

// ---------- pull requests ----------

interface PullRequestResponse {
  number: number;
  html_url: string;
  state: string;
}

interface PullListItem {
  number: number;
  head: { ref: string };
}

/** Does an open PR exist with the given head branch? (Idempotency check.) */
export async function findOpenPrByBranch(
  branch: string,
  deps: GitHubDeps,
): Promise<Result<PullRequestResponse | null>> {
  const [owner] = deps.repo.split("/");
  const res = await ghFetch<PullListItem[]>(
    `/repos/${deps.repo}/pulls?state=open&head=${encodeURIComponent(`${owner}:${branch}`)}`,
    { method: "GET" },
    deps,
    "find-pr",
  );
  if (!res.ok) return res;
  if (res.data.length === 0) return { ok: true, data: null };
  const found = res.data[0];
  if (!found) return { ok: true, data: null };
  return {
    ok: true,
    data: {
      number: found.number,
      html_url: "",
      state: "open",
    },
  };
}

export async function openPullRequest(args: {
  title: string;
  body: string;
  head: string;
  base: string;
  deps: GitHubDeps;
}): Promise<Result<PullRequestResponse>> {
  const { title, body, head, base, deps } = args;
  return ghFetch<PullRequestResponse>(
    `/repos/${deps.repo}/pulls`,
    {
      method: "POST",
      body: JSON.stringify({ title, body, head, base }),
    },
    deps,
    "open-pr",
  );
}

// ---------- directory listing (used to read recent reading entries) ----------

interface DirEntry {
  type: "file" | "dir";
  name: string;
  path: string;
  sha: string;
}

export async function listDir(
  path: string,
  ref: string,
  deps: GitHubDeps,
): Promise<Result<DirEntry[]>> {
  const res = await ghFetch<DirEntry[] | ContentsResponse>(
    `/repos/${deps.repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(ref)}`,
    { method: "GET" },
    deps,
    "list-dir",
  );
  if (!res.ok) return res;
  if (!Array.isArray(res.data)) {
    return { ok: false, error: "path is a file, not a directory" };
  }
  return { ok: true, data: res.data };
}
