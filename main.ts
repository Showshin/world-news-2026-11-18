// 18 November 2026 — the day's world news in one image.
// The image is committed beside this program. A run reads it and writes it to
// the output directory the grader names, so both graded runs write exactly the
// same bytes.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const source = fileURLToPath(new URL('./entry.png', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const limit = 1024 * 1024;
const image = readFileSync(source);

if (image.length > limit) {
  throw new Error(`entry.png is ${image.length} bytes; the gate takes at most ${limit}`);
}
if (image.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') {
  throw new Error('entry.png is not a PNG');
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'entry.png'), image);
