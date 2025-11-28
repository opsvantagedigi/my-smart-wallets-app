# OpsVantage Web (Next.js)

This is a scaffolded Next.js TypeScript app for OpsVantage Digital.

Quick start:

```bash
cd opsvantage-web
cp .env.local.example .env.local
npm install
npm run dev
```

Env:
- `NEXT_PUBLIC_API_URL` — Strapi API URL (default http://localhost:1337)
- `STRAPI_API_TOKEN` — optional token

Husky & hooks:
- Ensure you run `npm install` and `npx husky install` to enable pre-commit/pre-push hooks that block `.env.local`.

Design system:
- Components live in `ui/` and use Orbitron for headings and Inter for body text.

Deployment & CI:
- Add required GitHub secrets (see root README) and enable GitHub Actions to build and deploy.

### Launch Checklist

- Install dependencies and run Next.js:

```bash
cd opsvantage-web
npm install
npm run dev
```

- Install and run Strapi for the CMS:

```bash
cd ../opsvantage-cms
cp .env.example .env
npm install
npx strapi develop
```

- Husky hooks: after `npm install` run:

```bash
npx husky install
```

- Ensure GitHub Actions secrets are configured for CI (see root README).
