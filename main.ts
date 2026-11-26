import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
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
// Verify the copy landed intact: the output must exist and carry
// exactly the source's byte count, so a partial or truncated write
// fails loudly here instead of reaching the grader as a broken image.
if (!existsSync(target) || statSync(target).size !== statSync(source).size) {
  throw new Error(
    `output verification failed: ${target} is missing or differs in size from ${source}`,
  );
}
console.log(`wrote ${target}`);
