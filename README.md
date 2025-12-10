# Sanity Clean Content Studio

Congratulations, you have now installed the Sanity Content Studio, an open-source real-time content editing environment connected to the Sanity backend.

Now you can do the following things:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the Sanity community](https://www.sanity.io/community/join?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)

---

CI lint verification is enabled on `vercel_deploy` and runs `npm run lint:ci` before build.
\nCI trigger: 2025-12-10T08:49:19.6075273+13:00
\nCI trigger: 2025-12-10T09:09:53

---

## Deployment (Vercel)

- Domains:
	- Project: `ajay-sidals-projects-132aa3d1/my-smart-wallets-app`
	- Custom: `marz.opsvantagedigital.online` (attached; nameservers `ns1.vercel-dns.com`, `ns2.vercel-dns.com`)

- Environment Variables (Production):
	- `NEXT_PUBLIC_ALCHEMY_API_KEY`
	- `NEXT_PUBLIC_ALCHEMY_RPC_URL`
	- `NEXT_PUBLIC_EMBEDDED_WALLET_ENABLED`
	- `NEXT_PUBLIC_APP_URL` = `https://marz.opsvantagedigital.online`
	- NEXT_PUBLIC_ALCHEMY_API_KEY
	- NEXT_PUBLIC_ALCHEMY_POLICY_ID
	- NEXT_PUBLIC_CHAIN_ID (11155111 for Sepolia)
	- NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
	- NEXT_PUBLIC_EMBEDDED_WALLET_ENABLED
	- JWT_SECRET
	- NEXTAUTH_URL (if using NextAuth/OAuth)
	- DATABASE_URL (if persisting users)
	- CORS_ORIGIN (set to production domain for APIs)

- Local Env Sync:
	- Pull to local dev: `vercel env pull .env.development.local`
	- Keep `.env.local` untracked; use Vercel dashboard for prod vars.

### Quick Start (Local)

Create `.env.local` with:

```
NEXT_PUBLIC_ALCHEMY_API_KEY=c4YUdaSKyJjyNxSM8EOoO
NEXT_PUBLIC_ALCHEMY_POLICY_ID=e42cf63e-a5ed-45b9-aa02-45334e47ba52
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=30e7ffaff99063e68cc9870c105d905b
NEXT_PUBLIC_EMBEDDED_WALLET_ENABLED=true
JWT_SECRET=replace_with_strong_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000
```

Install and run:

```pwsh
npm install
npm run dev
```

### Production Tips

- Use a strong `JWT_SECRET`. In production, cookies are set with `secure: true` and `sameSite: "strict"`.
- Keep Vercel envs in sync with `.env.local`.
- Verify WalletConnect projectId in WalletConnect Cloud.
- Add OAuth client IDs/secrets if enabling social login.
- Next.js Config:
	- Redirect `/` → `/landing` in `next.config.mjs`.
	- Fonts: Inter (body), Orbitron (headings) via `app/layout.tsx`.

- Workflows:
	- `.github/workflows/ci.yml`: checkout → setup-node (20) → `npm ci` → `npm run build`.
	- `.github/workflows/ci-push.yml`: push to `vercel_deploy` → build (deploy via Vercel CLI done manually).
	- `.github/workflows/master_sanctuary-portal.yml`: archived → noop.

- Scripts:
	- `npm run dev` — local development.
	- `npm run lint` — ESLint.
	- `npm run typecheck` — TypeScript noEmit.
	- `npm run build` — Next build.
	- `npm run deploy` — `vercel --prod`.

- Deploy Steps:
	```pwsh
	npm install
	npm run lint
	npm run typecheck
	npm run build
	vercel link
	vercel --prod
	```
