# Cloudflare Deployment (scaffold)

This document describes how to deploy `opsvantage-web` to Cloudflare Pages and Workers.

Prerequisites
- Cloudflare account and Pages enabled
- Repository connected to Cloudflare Pages (or use `cloudflare/pages-action` in CI)
- Secrets set in GitHub: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`

Deploy (CI-driven)
1. Ensure the following GitHub Actions secrets are set in repository Settings → Secrets → Actions:
   - `CLOUDFLARE_API_TOKEN` (with Pages publish permissions)
   - `CLOUDFLARE_ACCOUNT_ID`

2. The repository contains a workflow at `.github/workflows/deploy-cloudflare-pages.yml` that will:
   - Install dependencies for `opsvantage-web`
   - Build the Next.js app
   - Run the Cloudflare Pages Action to deploy the `.next` build output

Notes
- If you prefer a static export (no API routes), set `output: 'export'` in `opsvantage-web/next.config.mjs` and deploy the generated `out/` directory instead.
- Static export disables API routes; if you need `pages/api/*` endpoints, use SSR-capable deployment (Cloudflare Pages with Next support or a server platform).
