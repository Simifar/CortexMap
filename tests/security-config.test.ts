import { describe, expect, test } from 'bun:test';
import { fileURLToPath } from 'node:url';

describe('deployment security configuration', () => {
  test('Caddy only proxies to the fixed Next.js upstream', async () => {
    const caddyfile = await Bun.file(new URL('../Caddyfile', import.meta.url)).text();

    expect(caddyfile).toContain('reverse_proxy 127.0.0.1:3000');
    expect(caddyfile).not.toContain('XTransformPort');
    expect(caddyfile).not.toContain('{query.');
  });

  test('Caddy applies the baseline browser security headers', async () => {
    const caddyfile = await Bun.file(new URL('../Caddyfile', import.meta.url)).text();

    expect(caddyfile).toContain("frame-ancestors 'none'");
    expect(caddyfile).toContain('X-Content-Type-Options "nosniff"');
    expect(caddyfile).toContain('Referrer-Policy "strict-origin-when-cross-origin"');
  });

  test('GitHub Actions use immutable commits and bounded jobs', async () => {
    const workflowsDirectory = fileURLToPath(new URL('../.github/workflows/', import.meta.url));
    const workflows = new Bun.Glob('*.{yml,yaml}').scan({ cwd: workflowsDirectory, absolute: true });

    for await (const path of workflows) {
      const workflow = await Bun.file(path).text();
      const actionReferences = [...workflow.matchAll(/uses:\s*[^@\s]+@([^\s#]+)/g)];
      const jobs = workflow.match(/^\s+runs-on:/gm) ?? [];
      const timeouts = workflow.match(/^\s+timeout-minutes:/gm) ?? [];

      expect(actionReferences.length).toBeGreaterThan(0);
      for (const [, reference] of actionReferences) expect(reference).toMatch(/^[0-9a-f]{40}$/);
      expect(timeouts.length).toBe(jobs.length);
    }
  });
});
