const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/api/tier' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ tier: 'free' }));
    return;
  }
  if (req.url === '/api/upgrade' && req.method === 'POST') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('OK');
});

server.listen(3000, () => console.log('api mock listening on 3000'));

// keep process alive
process.on('SIGINT', () => server.close(() => process.exit(0)));
