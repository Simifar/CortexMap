import { copyFile, mkdir, readdir, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

const sourceRoot = resolve('.next/standalone');
const targetRoot = resolve('.standalone');

async function copyTree(source: string, target: string): Promise<void> {
  await mkdir(target, { recursive: true });

  for (const entry of await readdir(source, { withFileTypes: true })) {
    const sourcePath = join(source, entry.name);
    const targetPath = join(target, entry.name);

    if (entry.isDirectory()) {
      await copyTree(sourcePath, targetPath);
    } else {
      await mkdir(dirname(targetPath), { recursive: true });
      await copyFile(sourcePath, targetPath);
    }
  }
}

try {
  await stat(join(sourceRoot, 'server.js'));
} catch {
  throw new Error('Next standalone build is incomplete. Missing: .next/standalone/server.js');
}

await copyTree(sourceRoot, targetRoot);
console.log('Standalone artifact persisted in .standalone/.');
