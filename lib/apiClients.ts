/*
  Minimal API client skeletons for platform integrations.
  - NFT API
  - Portfolio API
  - Token API
  - Transfers API
  - Websockets helper
  - Webhook helper

  These are placeholders to wire into real endpoints and secrets.
  Set environment variables in Vercel/CI and implement concrete endpoints.
*/

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_APP_URL || '';
const WS_BASE = process.env.NEXT_PUBLIC_WS_URL || '';

async function apiFetch(path: string, opts: RequestInit = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(`API ${url} failed: ${res.status}`);
  return res.json();
}

export async function fetchNFTs(address: string, limit = 50) {
  return apiFetch(`/nft/${address}?limit=${limit}`);
}

export async function fetchPortfolio(address: string) {
  return apiFetch(`/portfolio/${address}`);
}

export async function fetchTokens() {
  return apiFetch('/tokens');
}

export async function sendTransfer(payload: any) {
  return apiFetch('/transfers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export function createTransfersWebsocket(onMessage: (data: any) => void) {
  if (!WS_BASE) throw new Error('NEXT_PUBLIC_WS_URL not configured');
  const ws = new WebSocket(WS_BASE);
  ws.onopen = () => console.info('Transfers WS open');
  ws.onmessage = (ev) => {
    try {
      const d = JSON.parse(ev.data);
      onMessage(d);
    } catch (e) {
      console.warn('WS parse error', e);
    }
  };
  ws.onerror = (e) => console.warn('WS error', e);
  ws.onclose = () => console.info('Transfers WS closed');
  return ws;
}

export async function registerWebhook(targetUrl: string, event: string) {
  return apiFetch('/webhooks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: targetUrl, event }),
  });
}

export default {
  fetchNFTs,
  fetchPortfolio,
  fetchTokens,
  sendTransfer,
  createTransfersWebsocket,
  registerWebhook,
};
