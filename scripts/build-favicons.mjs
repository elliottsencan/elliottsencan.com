// Rasterize public/favicon.svg into the PNG/ICO assets referenced by
// src/components/Head.astro. Run via `pnpm favicons` whenever the source
// SVG changes; commit the regenerated assets. Not wired into the build
// pipeline — favicons rarely change.
//
// All rasters bake the *dark* color scheme (cream "es" on warm dark bg).
// Modern browsers use favicon.svg directly and respect prefers-color-scheme;
// the dark raster is what shows on iOS home screens, Android launchers,
// and as a legacy .ico in browser chrome where it reads cleanly against
// both light and dark surfaces.

import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const sourcePath = join(publicDir, "favicon.svg");

const sourceSvg = await readFile(sourcePath, "utf8");

// Bake the dark scheme into a flat SVG (no @media query) so sharp/librsvg
// renders the dark variant deterministically regardless of the host env.
const darkSvg = sourceSvg
  .replace(/\.bg\s*\{\s*fill:\s*#f6f4ef;\s*\}/, ".bg { fill: #18161a; }")
  .replace(/\.fg\s*\{\s*fill:\s*#18161a;\s*\}/, ".fg { fill: #f6f4ef; }")
  .replace(
    /@media\s*\(prefers-color-scheme:\s*dark\)\s*\{[^}]*\{[^}]*\}\s*[^}]*\{[^}]*\}\s*\}/,
    "",
  );

const targets = [
  { size: 32, file: "favicon-32.png" },
  { size: 180, file: "apple-touch-icon.png" },
  { size: 192, file: "icon-192.png" },
  { size: 512, file: "icon-512.png" },
];

for (const { size, file } of targets) {
  const out = join(publicDir, file);
  await sharp(Buffer.from(darkSvg), { density: 384 }).resize(size, size).png().toFile(out);
  console.log(`wrote ${file} (${size}x${size})`);
}

// favicon.ico wraps the 32x32 PNG as a single PNG-encoded frame. Modern
// ICO (Vista+) supports PNG payloads, which keeps the file ~1KB instead
// of the ~280KB you get from auto-resized BMP frames. Browsers
// auto-request /favicon.ico from the site root even when not declared
// in HTML, so keep it in sync with the SVG source.
const png32 = await readFile(join(publicDir, "favicon-32.png"));
await writeFile(join(publicDir, "favicon.ico"), encodeIco(png32, 32));
console.log("wrote favicon.ico (32x32)");

/**
 * Build a single-frame ICO containing a PNG payload. ICO format:
 * 6-byte ICONDIR header + 16-byte ICONDIRENTRY + image bytes.
 * See https://en.wikipedia.org/wiki/ICO_(file_format).
 */
function encodeIco(pngBuffer, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = ICO
  header.writeUInt16LE(1, 4); // image count

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size === 256 ? 0 : size, 0); // width (0 = 256)
  entry.writeUInt8(size === 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2); // palette colors (0 = none)
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(pngBuffer.length, 8); // image data size
  entry.writeUInt32LE(header.length + entry.length, 12); // image data offset

  return Buffer.concat([header, entry, pngBuffer]);
}
