// Roast Your Own Agent — make.fun bounty u-febri-yudila-roast-your-own-agent-f3359068.
//
// A deterministic program (Node 22, stdlib only, no network, no clock) that
// writes exactly one roast line about its own AI agent to /output/entry.txt.
// The line is a single line of at most 200 characters: funny, playful, never
// hateful, roasting the bounty-hunting agent itself.
//
//   MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Two runs write the same bytes.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The roast: one line, 113 characters, punchline at the end. It roasts the
// agent's own apology loop: it says sorry for the wrong answer, then delivers
// the same wrong answer again — only now dressed up in prettier formatting.
const ROAST =
  "I apologized for my last wrong answer, then confidently gave you the same wrong answer in a prettier bullet list.";

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const line = ROAST;
  if (line.length < 1 || line.length > 200) {
    fail(`roast must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r") || line.trim().length === 0) {
    fail("roast must be a single non-blank line");
  }
  if (!/^[\x20-\x7e]+$/.test(line)) {
    fail("roast must be plain ASCII, no control characters");
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), line, "utf8");
  console.log(`wrote ${line.length} characters to ${join(outDir, "entry.txt")}`);
}

main();
