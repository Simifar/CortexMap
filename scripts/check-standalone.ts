import { resolve } from 'node:path';
import { stat } from 'node:fs/promises';

const requiredFiles = [
  '.next/standalone/server.js',
  '.next/standalone/.next/static',
  '.next/standalone/public',
];

const missing: string[] = [];
for (const relativePath of requiredFiles) {
  const path = resolve(relativePath);
  try {
    await stat(path);
  } catch {
    missing.push(relativePath);
  }
}

if (missing.length > 0) throw new Error(`Standalone artifact is incomplete. Missing: ${missing.join(', ')}`);
console.log('Standalone artifact verified: server.js, .next/static, and public are present.');
