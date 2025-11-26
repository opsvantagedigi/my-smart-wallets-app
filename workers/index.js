addEventListener('fetch', event => {
  event.respondWith(handle(event.request));
});

async function handle(request) {
  const url = new URL(request.url);
  if (url.pathname === '/api/tier' && request.method === 'GET') {
    return new Response(JSON.stringify({ tier: 'free' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (url.pathname === '/api/upgrade' && request.method === 'POST') {
    // In production, validate payment and update DB
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return new Response('OK', { status: 200 });
}
