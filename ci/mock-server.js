// ci/mock-server.js
const http = require('http');

const port = process.env.CI_MOCK_PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/api/tier') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ tier: 'free' }));
    return;
  }
  if (req.url === '/_health') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('ok');
    return;
  }
  res.writeHead(404);
  res.end();
});

server.listen(port, () => {
  console.log(`CI mock server listening on ${port}`);
});

process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});
