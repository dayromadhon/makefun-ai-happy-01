// ai-happy-01 entry: "A little umbrella for a laughing kitten".
// The entry is a single image, entry.png beside this file: a tiny round
// robot holding a bright yellow umbrella over a laughing orange kitten
// in gentle rain, a rainbow behind them in golden evening light.
// The program copies that image byte for byte to the grader's output
// directory, so the two runs the grader makes always write identical
// bytes. No network, no randomness, no clock: the output is a pure
// function of the repository.
//
// Local run:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = new URL('./entry.png', import.meta.url);
const target = join(outDir, 'entry.png');
mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Fail loudly instead of shipping a truncated file: the grader runs
// this twice and both runs must write the same bytes.
if (statSync(source).size !== statSync(target).size) {
  throw new Error('entry.png copy is incomplete');
}
