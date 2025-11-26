Wrangler dev runbook

Prerequisites
- Install wrangler: `npm install -g wrangler`
- Ensure you have a Cloudflare account and are logged in: `wrangler login`

Run Worker locally
1. Start wrangler dev:
   `npx wrangler dev workers/index.js --port 8787`

2. Run smoke test against Worker:
   `LOCAL_BASE=http://127.0.0.1:8787 npm run smoke`

Notes
- `wrangler login` is interactive and opens a browser.
- Do not store Cloudflare tokens in the repo.
- To stop wrangler dev: Ctrl+C
