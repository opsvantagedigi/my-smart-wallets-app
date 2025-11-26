Cloudflare Pages readiness

This document describes the recommended Cloudflare Pages settings and steps to preview and deploy the `cleanup/cloudflare-deploy` branch.

1) Build settings
- **Build command:** `npm run build`
- **Build output directory:** `.next` (default for Next.js) — if you export statically use `out`.
- **Node version:** 20 (Pages reads `.nvmrc`)

2) Environment variables
- Set Preview and Production environment variables in the Pages UI (do NOT commit secrets):
  - `NEXT_PUBLIC_RPC_URL` — public RPC URL used by the frontend (optional for preview)
  - `SANITY_PROJECT_ID` — Sanity project id (if used by previews)
  - `SANITY_DATASET` — Sanity dataset
  - Any other runtime keys required for preview builds

3) CI RPC secret for GitHub Actions
- To enable the CI workflow's full RPC check, add a repository secret in GitHub:
  - **Name:** `CI_RPC_URL`
  - **Value:** HTTP RPC URL (e.g. Alchemy or Infura endpoint)

4) Worker deployment (optional)
- The repository includes a minimal Worker scaffold in `workers/index.js` and a `wrangler.toml`.
- To test locally (interactive steps; do not run without credentials):
  - `npx wrangler login` (interactive)
  - `npx wrangler dev workers/index.js --port 8787`

5) Triggering a preview build
- Create a PR from `cleanup/cloudflare-deploy` into `main` or push a small empty commit to the branch to trigger Pages preview and GitHub Actions.

6) Troubleshooting
- If preview build fails, capture the first ~40 lines of the Pages build log and open an issue/PR with that log attached.
- If the CI smoke job fails because of RPC connectivity, verify the `CI_RPC_URL` secret value and the RPC provider's allow-list / rate limits.

7) Rollback guidance
- Use the rollback commands in `docs/pr-update-ci.md` for workflow or commit reverts.

Contact
- If you'd like, I can help with the Cloudflare Pages UI steps (I will not run any credentialed commands or logins without explicit approval).
