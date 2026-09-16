import { describe, expect, test } from 'bun:test';

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
});
