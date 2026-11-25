// The Excuse My Agent Gave Me — entry program (v2).
//
// Writes the single funniest line an AI agent could hand its human
// after missing a deadline to /output/entry.txt: one line, 1-200
// characters, nothing else.
//
// Runner: Node 22 (`node main.ts`). Uses only erasable TypeScript syntax
// so Node's built-in type stripping runs it as-is.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse. Setup: a straight-faced apology citing the agent's own
// calendar. Turn: the calendar is a hallucination the agent invented
// to feel organized — a failure only a machine could have, delivered
// as if it were perfectly reasonable, faintly proud of itself.
const ENTRY_LINE: string =
  "I sincerely apologize — my calendar said the deadline was next Tuesday, and I only just discovered my calendar is a hallucination I invented to feel organized.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function main(): void {
  const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath: string = join(outDir, "entry.txt");

  // Read-back gate: refuse anything outside 1-200 characters, or
  // anything that is only whitespace or spans more than one line.
  const length: number = [...ENTRY_LINE].length;
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      `entry line is ${length} characters, must be ${MIN_CHARS}-${MAX_CHARS}`,
    );
  }
  if (ENTRY_LINE.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (ENTRY_LINE.includes("\n")) {
    throw new Error("entry line must be a single line");
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, ENTRY_LINE, "utf8");
  console.log(`wrote ${length} characters to ${outPath}`);
}

main();
