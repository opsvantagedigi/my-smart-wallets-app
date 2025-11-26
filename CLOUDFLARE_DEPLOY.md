# Cloudflare Deploy

This document describes how to deploy the minimal Worker scaffold and how to configure Cloudflare Pages for this repository.

Environment variables required:

- `NEXT_PUBLIC_ALCHEMY_API_KEY` — Alchemy App API key (public key for client-side usage)
- `NEXT_PUBLIC_ALCHEMY_POLICY_ID` — Alchemy Sponsorship policy ID (optional)
- `NEXT_PUBLIC_RPC_URL` — Public RPC URL to use for quick health checks (e.g. https://marz.opsvantagedigital.online)

Deploying the Worker (basic / mock):

1. Install Wrangler: `npm install -g wrangler` or use Cloudflare dashboard.
2. Authenticate: `wrangler login`.
3. Publish the mock worker: `wrangler publish --env production`.

Notes:

- `workers/index.js` in this repo is a mock scaffold intended for local testing and CI smoke tests. Replace logic with real payment verification and persistence for production.
- Do NOT commit real secrets. Use Cloudflare dashboard secrets or `wrangler secret put` for private keys.

Cloudflare Pages:

- Ensure Node version is set to 20 (we include `.nvmrc`).
- Set the Pages environment variables listed above in the Pages UI.
- Build command: `npm run build`.
- Output directory: `.next`.

Rollback:

- To undo these changes on this branch: `git checkout main && git revert <commit-hash>`
