// Simple smoke-check script to validate local /api/tier and RPC health endpoint
// Uses global fetch available in Node 18+

async function run() {
  const base = process.env.LOCAL_BASE || 'http://localhost:3000';
  try {
    const tierRes = await fetch(`${base}/api/tier`);
    const tierJson = await tierRes.json().catch(() => null);
    console.log('tier:', tierRes.status, tierJson);

    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://marz.opsvantagedigital.online';
    const rpcRes = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_chainId', params: [] })
    });
    const rpcJson = await rpcRes.json().catch(() => null);
    console.log('rpc status:', rpcRes.status, rpcJson ? 'ok' : 'no-json');
    process.exit(0);
  } catch (err) {
    console.error('smoke check failed', err);
    process.exit(2);
  }
}

run();
