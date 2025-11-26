Wrangler dev runbook

Prerequisites
- Install wrangler globally (optional): `npm install -g wrangler`
- Or use npx: `npx wrangler`
- Ensure you have a Cloudflare account and are logged in when needed: `npx wrangler login`

Run Worker locally
1. Start wrangler dev locally:

```bash
npx wrangler dev workers/index.js --port 8787
```

2. Run the smoke test against the Worker:

```bash
LOCAL_BASE=http://127.0.0.1:8787 npm run smoke
```

Notes
- `wrangler login` is interactive and opens a browser to authenticate; do not run it in CI.
- Do not store Cloudflare API tokens or account secrets in the repository.
- To stop `wrangler dev`, press `Ctrl+C` in the terminal running it.

Troubleshooting
- If the Worker port is already in use, change `--port` or stop the conflicting process.
- If `npm run smoke` fails, ensure the Worker is serving `/api/tier` and `/_health` endpoints.
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
