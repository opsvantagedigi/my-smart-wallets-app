// Simple smoke-check script to validate local /api/tier and RPC health endpoint
// Uses global fetch available in Node 18+

async function run() {
  const base = process.env.LOCAL_BASE || 'http://localhost:3000';
  let tierOk = false;
  try {
    const tierRes = await fetch(`${base}/api/tier`);
    const tierJson = await tierRes.json().catch(() => null);
    console.log('tier:', tierRes.status, tierJson);
    if (tierRes.ok) tierOk = true;
  } catch (err) {
    console.error('tier check failed', err);
  }

  // RPC health check is desirable but not fatal for the smoke check in CI
  try {
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://marz.opsvantagedigital.online';
    const rpcRes = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_chainId', params: [] })
    });
    const rpcJson = await rpcRes.json().catch(() => null);
    console.log('rpc status:', rpcRes.status, rpcJson ? 'ok' : 'no-json');
  } catch (err) {
    console.warn('rpc health check failed (non-fatal):', err.message || err);
  }

  if (tierOk) process.exit(0);
  console.error('smoke check failed: /api/tier did not return ok');
  process.exit(2);
}

run();
