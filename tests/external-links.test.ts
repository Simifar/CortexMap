import { expect, test } from 'bun:test';
import { checkExternalLink, type LinkRequest } from '../src/lib/external-links';

function response(status: number, redirected = false) {
  return { status, redirected, url: 'https://example.com/final' };
}

function scriptedRequest(...responses: Array<ReturnType<typeof response> | Error>) {
  const calls: string[] = [];
  const request: LinkRequest = async (_url, method) => {
    calls.push(method);
    const next = responses.shift();
    if (!next) throw new Error('No scripted response');
    if (next instanceof Error) throw next;
    return next;
  };
  return { calls, request };
}

test('classifies successful and redirected responses', async () => {
  expect((await checkExternalLink('https://example.com', { ...scriptedRequest(response(200)) })).category).toBe('ok');
  expect((await checkExternalLink('https://example.com', { ...scriptedRequest(response(200, true)) })).category).toBe('redirected');
});

test('distinguishes blocked responses from confirmed broken links', async () => {
  expect((await checkExternalLink('https://example.com', { ...scriptedRequest(response(403)) })).category).toBe('blocked');
  expect((await checkExternalLink('https://example.com', { ...scriptedRequest(response(418)) })).category).toBe('blocked');
  expect((await checkExternalLink('https://example.com', { ...scriptedRequest(response(404)) })).category).toBe('broken');
});

test('falls back from HEAD 405 to GET', async () => {
  const scripted = scriptedRequest(response(405), response(200));
  const result = await checkExternalLink('https://example.com', scripted);
  expect(result.category).toBe('ok');
  expect(scripted.calls).toEqual(['HEAD', 'GET']);
});

test('classifies timeout and network failures after bounded retries', async () => {
  const timeout = scriptedRequest(new DOMException('timed out', 'AbortError'), new DOMException('timed out', 'AbortError'));
  const network = scriptedRequest(new Error('offline'), new Error('offline'));
  expect((await checkExternalLink('https://example.com', { ...timeout, retries: 1, sleep: async () => {} })).category).toBe('timeout');
  expect((await checkExternalLink('https://example.com', { ...network, retries: 1, sleep: async () => {} })).category).toBe('network-error');
});
