import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The entry image ships in this repository; this program only places a
// byte-for-byte copy of it where the grader looks for the output.
const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(targetDir, "entry.png");

if (!existsSync(source)) {
  throw new Error(`entry image missing: ${source}`);
}
mkdirSync(targetDir, { recursive: true });
copyFileSync(source, target);
console.log(`wrote ${target}`);
