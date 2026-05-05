/**
 * AST helpers for the crosslink phase. Wraps mdast-util-from-markdown +
 * mdast-util-to-markdown with GFM so insertion is structural (text-node
 * splice) rather than substring-replace. This lets us:
 *
 *  - Detect anchors inside code, inline-code, image alt, and existing links
 *    by node type, not regex state machines.
 *  - Disambiguate body-wide anchor uniqueness via the source_passage's
 *    containing block, which the substring approach couldn't.
 */

import type { Link, Nodes, Parent, Root, Text } from "mdast";
import { fromMarkdown } from "mdast-util-from-markdown";
import { gfmFromMarkdown, gfmToMarkdown } from "mdast-util-gfm";
import { toMarkdown } from "mdast-util-to-markdown";
import { gfm } from "micromark-extension-gfm";

export type AnchorContext = "eligible" | "in-link" | "in-code" | "in-inline-code" | "in-image-alt";

export type AnchorOccurrence = {
  context: AnchorContext;
  textNode?: Text;
  textNodeOffset?: number;
  block?: Nodes;
};

export function parseMarkdown(value: string): Root {
  return fromMarkdown(value, {
    extensions: [gfm()],
    mdastExtensions: [gfmFromMarkdown()],
  });
}

export function stringifyMarkdown(root: Root): string {
  return toMarkdown(root, { extensions: [gfmToMarkdown()] });
}

export function joinedText(node: Nodes): string {
  if (node.type === "text") {
    return node.value;
  }
  if (node.type === "inlineCode") {
    return node.value;
  }
  if (node.type === "code") {
    return node.value;
  }
  if (node.type === "image") {
    return node.alt ?? "";
  }
  if ("children" in node) {
    let out = "";
    for (const child of node.children) {
      out += joinedText(child as Nodes);
    }
    return out;
  }
  return "";
}

function isInLink(parents: Parent[]): boolean {
  return parents.some((p) => p.type === "link" || p.type === "linkReference");
}

export function findAnchorOccurrences(root: Root, anchor: string): AnchorOccurrence[] {
  if (!anchor) {
    return [];
  }
  const out: AnchorOccurrence[] = [];

  const walk = (node: Nodes, parents: Parent[], block: Nodes | undefined): void => {
    if (node.type === "text") {
      let from = 0;
      while (true) {
        const idx = node.value.indexOf(anchor, from);
        if (idx < 0) {
          break;
        }
        out.push({
          context: isInLink(parents) ? "in-link" : "eligible",
          textNode: node,
          textNodeOffset: idx,
          block,
        });
        from = idx + anchor.length;
      }
      return;
    }
    if (node.type === "inlineCode") {
      if (node.value.includes(anchor)) {
        out.push({ context: "in-inline-code", block });
      }
      return;
    }
    if (node.type === "code") {
      if (node.value.includes(anchor)) {
        out.push({ context: "in-code", block });
      }
      return;
    }
    if (node.type === "image") {
      if (node.alt?.includes(anchor)) {
        out.push({ context: "in-image-alt", block });
      }
      return;
    }
    if ("children" in node) {
      const isBlock = isBlockNode(node);
      const nextBlock: Nodes | undefined = isBlock ? node : block;
      const nextParents = [...parents, node as Parent];
      for (const child of node.children) {
        walk(child as Nodes, nextParents, nextBlock);
      }
    }
  };

  walk(root, [], undefined);
  return out;
}

function isBlockNode(node: Nodes): boolean {
  return (
    node.type === "paragraph" ||
    node.type === "heading" ||
    node.type === "blockquote" ||
    node.type === "listItem" ||
    node.type === "tableCell"
  );
}

export type LocateResult =
  | { ok: true; textNode: Text; offset: number; block: Nodes }
  | { ok: false; reason: string };

/**
 * Locates the unique eligible occurrence of `anchor` anywhere in the parsed
 * tree. Used for proposal validation — the source_passage IS the document
 * being checked, so there's no separate passage-scope filter.
 */
export function locateAnchor(root: Root, anchor: string): LocateResult {
  const occs = findAnchorOccurrences(root, anchor);
  return resolveOccurrences(occs);
}

/**
 * Locates the unique eligible occurrence of `anchor` within blocks whose
 * rendered text matches the passage's rendered text. Used at apply time:
 * the body may contain the same anchor multiple times, but the passage's
 * location disambiguates which one to link.
 *
 * Compares rendered (joined) text on both sides so a model-supplied passage
 * with markdown markup ("Read [here](/x)") still matches the body's already-
 * rendered representation ("Read here").
 */
export function locateAnchorInPassage(
  bodyRoot: Root,
  passage: string,
  anchor: string,
): LocateResult {
  const passageRendered = joinedText(parseMarkdown(passage)).trim();
  const occs = findAnchorOccurrences(bodyRoot, anchor);
  if (occs.length === 0) {
    return { ok: false, reason: "anchor-not-found" };
  }

  const inPassage = occs.filter((o) => {
    if (!o.block) {
      return false;
    }
    if (!passageRendered) {
      return true;
    }
    return joinedText(o.block).includes(passageRendered);
  });

  if (inPassage.length === 0) {
    const first = occs[0]!;
    return { ok: false, reason: contextToReason(first.context) };
  }
  return resolveOccurrences(inPassage);
}

function resolveOccurrences(occs: AnchorOccurrence[]): LocateResult {
  const first = occs[0];
  if (!first) {
    return { ok: false, reason: "anchor-not-found" };
  }
  const eligible = occs.filter((o) => o.context === "eligible");
  if (eligible.length === 0) {
    return { ok: false, reason: contextToReason(first.context) };
  }
  if (eligible.length > 1) {
    return { ok: false, reason: "anchor-not-unique" };
  }
  const winner = eligible[0];
  if (!winner?.textNode || winner.textNodeOffset === undefined || !winner.block) {
    return { ok: false, reason: "anchor-not-found" };
  }
  return {
    ok: true,
    textNode: winner.textNode,
    offset: winner.textNodeOffset,
    block: winner.block,
  };
}

function contextToReason(ctx: AnchorContext): string {
  switch (ctx) {
    case "in-link":
      return "already-link";
    case "in-code":
      return "code-fence";
    case "in-inline-code":
      return "inline-code";
    case "in-image-alt":
      return "image-alt";
    case "eligible":
      return "anchor-not-found";
  }
}

export function spliceLinkAtTextNode(
  root: Root,
  textNode: Text,
  offset: number,
  anchor: string,
  targetUrl: string,
): boolean {
  const parent = findImmediateParent(root, textNode);
  if (!parent) {
    return false;
  }
  const idx = parent.children.indexOf(textNode);
  if (idx < 0) {
    return false;
  }

  const before = textNode.value.slice(0, offset);
  const after = textNode.value.slice(offset + anchor.length);

  const linkNode: Link = {
    type: "link",
    url: targetUrl,
    children: [{ type: "text", value: anchor }],
  };

  const replacement: Nodes[] = [];
  if (before) {
    replacement.push({ type: "text", value: before });
  }
  replacement.push(linkNode);
  if (after) {
    replacement.push({ type: "text", value: after });
  }

  parent.children.splice(idx, 1, ...(replacement as Parent["children"]));
  return true;
}

function findImmediateParent(root: Root, target: Nodes): Parent | undefined {
  let found: Parent | undefined;
  const walk = (node: Nodes): boolean => {
    if (!("children" in node)) {
      return false;
    }
    const parent = node as Parent;
    for (const child of parent.children) {
      if ((child as Nodes) === target) {
        found = parent;
        return true;
      }
      if (walk(child as Nodes)) {
        return true;
      }
    }
    return false;
  };
  walk(root);
  return found;
}

export function applyAnchorInsertion(
  body: string,
  passage: string,
  anchor: string,
  targetUrl: string,
): string {
  const root = parseMarkdown(body);
  const located = locateAnchorInPassage(root, passage, anchor);
  if (!located.ok) {
    return body;
  }
  const ok = spliceLinkAtTextNode(root, located.textNode, located.offset, anchor, targetUrl);
  if (!ok) {
    return body;
  }
  // mdast-util-to-markdown adds a trailing newline; preserve original's
  // trailing-newline style so round-trips are minimally surprising.
  const out = stringifyMarkdown(root);
  return body.endsWith("\n") ? out : out.replace(/\n$/, "");
}

export type DroppedLinkReason = "unknown-reading-slug" | "wiki-link";
export type DroppedLink = { url: string; anchor: string; reason: DroppedLinkReason };

/**
 * Unwrap LLM-emitted /wiki/<slug> links unconditionally (those are inserted
 * downstream by the validated crosslink phase) and unwrap /reading/<slug>
 * links whose slug isn't in the known set. Unwrapping replaces the link
 * node with its inline children, preserving the anchor text.
 */
export function repairWikiBodyLinks(
  body: string,
  knownReadingSlugs: ReadonlySet<string>,
): { body: string; dropped: DroppedLink[] } {
  const root = parseMarkdown(body);
  const dropped: DroppedLink[] = [];
  let normalizedCount = 0;
  const toUnwrap: Array<{ parent: Parent; index: number; link: Link; reason: DroppedLinkReason }> =
    [];

  const walk = (node: Nodes): void => {
    if (!("children" in node)) {
      return;
    }
    const parent = node as Parent;
    parent.children.forEach((child, index) => {
      if ((child as Nodes).type === "link") {
        const link = child as Link;
        if (normalizeRelativeReadingLink(link)) {
          normalizedCount++;
        }
        const slug = readingSlugFromInternalUrl(link.url);
        if (slug !== null) {
          if (!knownReadingSlugs.has(slug)) {
            toUnwrap.push({ parent, index, link, reason: "unknown-reading-slug" });
          }
          return;
        }
        if (isWikiUrl(link.url)) {
          toUnwrap.push({ parent, index, link, reason: "wiki-link" });
          return;
        }
      }
      walk(child as Nodes);
    });
  };
  walk(root);

  // Unwrap from highest index down so earlier indices remain valid as we splice.
  const grouped = new Map<Parent, typeof toUnwrap>();
  for (const item of toUnwrap) {
    const list = grouped.get(item.parent);
    if (list) {
      list.push(item);
    } else {
      grouped.set(item.parent, [item]);
    }
  }
  for (const [parent, items] of grouped) {
    items.sort((a, b) => b.index - a.index);
    for (const { index, link, reason } of items) {
      const anchor = joinedText(link);
      dropped.push({ url: link.url, anchor, reason });
      parent.children.splice(index, 1, ...(link.children as Parent["children"]));
    }
  }

  if (dropped.length === 0 && normalizedCount === 0) {
    return { body, dropped };
  }
  const out = stringifyMarkdown(root);
  return {
    body: body.endsWith("\n") ? out : out.replace(/\n$/, ""),
    dropped,
  };
}

function normalizeRelativeReadingLink(link: Link): boolean {
  if (!/^reading\//.test(link.url)) {
    return false;
  }
  link.url = `/${link.url}`;
  return true;
}

function readingSlugFromInternalUrl(url: string): string | null {
  const cleaned = stripQueryAndFragment(url);
  const match = cleaned.match(/^\/reading\/(.+?)\/?$/);
  if (!match) {
    return null;
  }
  return match[1] ?? null;
}

function isWikiUrl(url: string): boolean {
  return /^\/wiki\//.test(stripQueryAndFragment(url));
}

function stripQueryAndFragment(url: string): string {
  const trimmed = url.trim();
  const hashIdx = trimmed.indexOf("#");
  const queryIdx = trimmed.indexOf("?");
  let end = trimmed.length;
  if (hashIdx >= 0) {
    end = Math.min(end, hashIdx);
  }
  if (queryIdx >= 0) {
    end = Math.min(end, queryIdx);
  }
  return trimmed.slice(0, end);
}
