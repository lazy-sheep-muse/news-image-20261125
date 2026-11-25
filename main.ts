// Entry point for the 25 November 2026 news-image bounty.
//
// The finished front page already lives in this repo as entry.png.
// All this script does is drop an exact copy of it at /output/entry.png,
// which is where the grader looks for the deliverable.
//
// Nothing here is computed or fetched: the bytes that go out are the
// bytes that are already in the repo, so repeated runs always produce
// the same file. Only the Node standard library is used.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve everything from this file's own location, so the script
// behaves the same no matter which directory it is launched from.
const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourceImage = join(scriptDir, "entry.png");
const targetImage = join("/output", "entry.png");

mkdirSync(dirname(targetImage), { recursive: true });

const frontPage = readFileSync(sourceImage);
writeFileSync(targetImage, frontPage);

// Fail loudly instead of silently shipping a truncated copy.
if (readFileSync(targetImage).length !== frontPage.length) {
  throw new Error("entry.png copy is incomplete");
}
