export const linkCategories = ['ok', 'redirected', 'blocked', 'timeout', 'network-error', 'broken'] as const;
export type LinkCategory = (typeof linkCategories)[number];

export type LinkProbeResponse = {
  status: number;
  redirected: boolean;
  url: string;
};

export type LinkRequest = (url: string, method: 'HEAD' | 'GET', signal: AbortSignal) => Promise<LinkProbeResponse>;

export type LinkCheckResult = {
  url: string;
  category: LinkCategory;
  status?: number;
  finalUrl?: string;
  attempts: number;
  detail?: string;
};

type LinkCheckOptions = {
  request?: LinkRequest;
  retries?: number;
  timeoutMs?: number;
  sleep?: (ms: number) => Promise<void>;
};

const defaultRequest: LinkRequest = async (url, method, signal) => {
  const response = await fetch(url, {
    method,
    redirect: 'follow',
    signal,
    headers: { 'user-agent': 'CortexMap external link checker' },
  });
  return response;
};

function classifyResponse(response: LinkProbeResponse): LinkCategory {
  if (response.status >= 200 && response.status < 400) return response.redirected || response.status >= 300 ? 'redirected' : 'ok';
  if (response.status === 408) return 'timeout';
  if ([401, 403, 406, 409, 418, 429, 451].includes(response.status) || response.status >= 500) return 'blocked';
  return 'broken';
}

function isTimeout(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError' || error instanceof Error && error.name === 'TimeoutError';
}

function errorDetail(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export async function checkExternalLink(url: string, options: LinkCheckOptions = {}): Promise<LinkCheckResult> {
  const request = options.request ?? defaultRequest;
  const retries = options.retries ?? 2;
  const timeoutMs = options.timeoutMs ?? 15_000;
  const sleep = options.sleep ?? ((ms: number) => new Promise((resolve) => setTimeout(resolve, ms)));
  let attempts = 0;

  while (true) {
    attempts += 1;
    try {
      const signal = AbortSignal.timeout(timeoutMs);
      let response = await request(url, 'HEAD', signal);
      if (response.status === 405 || response.status === 501) response = await request(url, 'GET', signal);
      const category = classifyResponse(response);
      if ((category === 'timeout' || category === 'network-error') && attempts <= retries) {
        await sleep(250 * 2 ** (attempts - 1));
        continue;
      }
      return { url, category, status: response.status, finalUrl: response.url, attempts, detail: `HTTP ${response.status}` };
    } catch (error) {
      const category: LinkCategory = isTimeout(error) ? 'timeout' : 'network-error';
      if (attempts <= retries) {
        await sleep(250 * 2 ** (attempts - 1));
        continue;
      }
      return { url, category, attempts, detail: errorDetail(error) };
    }
  }
}
