/**
 * GitHub client via Octokit. Two commit shapes supported:
 *   - PR flow (used by the /now weekly draft): create branch → commit file →
 *     open PR against main.
 *   - Direct commit to main (used by the /link reading pipeline): single PUT
 *     per entry, no PR.
 *
 * Auth: fine-grained PAT with contents:write + pull_requests:write on the
 * elliottsencan.com repo only. No other scopes, no other repos.
 */

import { RequestError } from "@octokit/request-error";
import { Octokit } from "octokit";
import type { Result } from "./types.ts";
import { log } from "./util.ts";

const USER_AGENT = "site-ingest-worker";

export interface GitHubClient {
  octokit: Octokit;
  owner: string;
  repo: string;
}

export function createGitHubClient(token: string, fullRepo: string): GitHubClient {
  const [owner, repo] = fullRepo.split("/");
  if (!owner || !repo) {
    throw new Error(`invalid repo "${fullRepo}" — expected owner/name`);
  }
  const octokit = new Octokit({ auth: token, userAgent: USER_AGENT });
  return { octokit, owner, repo };
}

// ---------- file contents ----------

export async function getFile(
  path: string,
  ref: string,
  gh: GitHubClient,
): Promise<Result<{ content: string; sha: string }>> {
  try {
    const { data } = await gh.octokit.rest.repos.getContent({
      owner: gh.owner,
      repo: gh.repo,
      path,
      ref,
    });
    if (Array.isArray(data) || data.type !== "file") {
      return { ok: false, error: "path is not a file" };
    }
    if (data.encoding !== "base64") {
      return { ok: false, error: `unexpected encoding ${data.encoding}` };
    }
    const binary = atob(data.content.replace(/\n/g, ""));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const content = new TextDecoder("utf-8").decode(bytes);
    return { ok: true, data: { content, sha: data.sha } };
  } catch (err) {
    return mapError(err, "get-file", { path, ref });
  }
}

// ---------- branches ----------

export async function getBranchSha(branch: string, gh: GitHubClient): Promise<Result<string>> {
  try {
    const { data } = await gh.octokit.rest.git.getRef({
      owner: gh.owner,
      repo: gh.repo,
      ref: `heads/${branch}`,
    });
    return { ok: true, data: data.object.sha };
  } catch (err) {
    return mapError(err, "get-branch", { branch });
  }
}

/**
 * Create a new branch from an existing commit SHA. Returns `alreadyExists:
 * true` if the branch exists — idempotent by design so a same-day re-run
 * of the cron doesn't fail.
 */
export async function createBranch(
  branch: string,
  fromSha: string,
  gh: GitHubClient,
): Promise<Result<{ alreadyExists: boolean }>> {
  const existing = await getBranchSha(branch, gh);
  if (existing.ok) {
    return { ok: true, data: { alreadyExists: true } };
  }
  try {
    await gh.octokit.rest.git.createRef({
      owner: gh.owner,
      repo: gh.repo,
      ref: `refs/heads/${branch}`,
      sha: fromSha,
    });
    return { ok: true, data: { alreadyExists: false } };
  } catch (err) {
    return mapError(err, "create-branch", { branch });
  }
}

// ---------- file writes ----------

export async function putFile(args: {
  path: string;
  branch: string;
  content: string;
  message: string;
  sha?: string;
  gh: GitHubClient;
}): Promise<Result<{ blobSha: string; commitSha: string }>> {
  const { path, branch, content, message, sha, gh } = args;
  // base64-encode UTF-8.
  const bytes = new TextEncoder().encode(content);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  const base64 = btoa(binary);

  try {
    const { data } = await gh.octokit.rest.repos.createOrUpdateFileContents({
      owner: gh.owner,
      repo: gh.repo,
      path,
      message,
      content: base64,
      branch,
      ...(sha ? { sha } : {}),
    });
    if (!data.content?.sha || !data.commit?.sha) {
      return { ok: false, error: "missing sha in response" };
    }
    return { ok: true, data: { blobSha: data.content.sha, commitSha: data.commit.sha } };
  } catch (err) {
    return mapError(err, "put-file", { path, branch });
  }
}

/**
 * Atomic multi-file commit via the Git Trees API. One commit on `branch`
 * regardless of how many files are written, so a synthesis run that touches
 * 20 wiki articles produces 1 commit (and 1 Cloudflare Pages preview build)
 * instead of 20.
 *
 * Sha-free by construction: blob shas come from `git/blobs`, the tree is
 * built off the branch's current head, and the ref is advanced atomically.
 * No "look up sha first" dance, no main-vs-branch confusion.
 *
 * Empty `files` is a caller bug (it would still create a no-op commit), so
 * fail loudly rather than silently producing an empty commit.
 */
export async function commitFiles(args: {
  branch: string;
  files: Array<{ path: string; content: string }>;
  message: string;
  gh: GitHubClient;
}): Promise<Result<{ commitSha: string }>> {
  const { branch, files, message, gh } = args;
  if (files.length === 0) {
    return { ok: false, error: "commitFiles called with no files" };
  }
  try {
    const head = await gh.octokit.rest.git.getRef({
      owner: gh.owner,
      repo: gh.repo,
      ref: `heads/${branch}`,
    });
    const parentSha = head.data.object.sha;
    const parentCommit = await gh.octokit.rest.git.getCommit({
      owner: gh.owner,
      repo: gh.repo,
      commit_sha: parentSha,
    });
    const baseTreeSha = parentCommit.data.tree.sha;

    const blobs = await Promise.all(
      files.map(async (f) => {
        const bytes = new TextEncoder().encode(f.content);
        let binary = "";
        for (const byte of bytes) {
          binary += String.fromCharCode(byte);
        }
        const base64 = btoa(binary);
        const r = await gh.octokit.rest.git.createBlob({
          owner: gh.owner,
          repo: gh.repo,
          content: base64,
          encoding: "base64",
        });
        return { path: f.path, sha: r.data.sha };
      }),
    );

    const tree = await gh.octokit.rest.git.createTree({
      owner: gh.owner,
      repo: gh.repo,
      base_tree: baseTreeSha,
      tree: blobs.map((b) => ({
        path: b.path,
        mode: "100644",
        type: "blob",
        sha: b.sha,
      })),
    });

    const commit = await gh.octokit.rest.git.createCommit({
      owner: gh.owner,
      repo: gh.repo,
      message,
      tree: tree.data.sha,
      parents: [parentSha],
    });

    await gh.octokit.rest.git.updateRef({
      owner: gh.owner,
      repo: gh.repo,
      ref: `heads/${branch}`,
      sha: commit.data.sha,
    });

    return { ok: true, data: { commitSha: commit.data.sha } };
  } catch (err) {
    return mapError(err, "commit-files", { branch, files: String(files.length) });
  }
}

// ---------- pull requests ----------

export async function findOpenPrByBranch(
  branch: string,
  gh: GitHubClient,
): Promise<Result<{ number: number } | null>> {
  try {
    const { data } = await gh.octokit.rest.pulls.list({
      owner: gh.owner,
      repo: gh.repo,
      state: "open",
      head: `${gh.owner}:${branch}`,
    });
    const first = data[0];
    if (!first) {
      return { ok: true, data: null };
    }
    return { ok: true, data: { number: first.number } };
  } catch (err) {
    return mapError(err, "find-pr", { branch });
  }
}

export async function openPullRequest(args: {
  title: string;
  body: string;
  head: string;
  base: string;
  gh: GitHubClient;
}): Promise<Result<{ number: number; html_url: string }>> {
  const { title, body, head, base, gh } = args;
  try {
    const { data } = await gh.octokit.rest.pulls.create({
      owner: gh.owner,
      repo: gh.repo,
      title,
      body,
      head,
      base,
    });
    return { ok: true, data: { number: data.number, html_url: data.html_url } };
  } catch (err) {
    return mapError(err, "open-pr", { head, base });
  }
}

// ---------- directory listing ----------

export async function listDir(
  path: string,
  ref: string,
  gh: GitHubClient,
): Promise<Result<Array<{ type: "file" | "dir"; name: string; path: string; sha: string }>>> {
  try {
    const { data } = await gh.octokit.rest.repos.getContent({
      owner: gh.owner,
      repo: gh.repo,
      path,
      ref,
    });
    if (!Array.isArray(data)) {
      return { ok: false, error: "path is a file, not a directory" };
    }
    const entries = data
      .filter(
        (e): e is typeof e & { type: "file" | "dir" } => e.type === "file" || e.type === "dir",
      )
      .map((e) => ({ type: e.type, name: e.name, path: e.path, sha: e.sha }));
    return { ok: true, data: entries };
  } catch (err) {
    return mapError(err, "list-dir", { path, ref });
  }
}

// ---------- error mapping ----------

function mapError(
  err: unknown,
  op: string,
  fields: Record<string, string>,
): { ok: false; error: string } {
  if (err instanceof RequestError) {
    // Include err.message — GitHub's 422s carry semantic detail ("Reference
    // already exists", "Invalid content encoding") that a bare "HTTP 422"
    // would drop on the floor.
    log.warn("github", op, "request failed", {
      status: err.status,
      msg: err.message,
      ...fields,
    });
    return { ok: false, error: `HTTP ${err.status}: ${err.message}` };
  }
  const msg = err instanceof Error ? err.message : String(err);
  log.error("github", op, "threw", { msg, ...fields });
  return { ok: false, error: msg };
}
