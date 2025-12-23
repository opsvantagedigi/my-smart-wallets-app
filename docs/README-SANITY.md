# Sanity Studio — Local setup, preview secret, and deployment

This file shows the exact commands and steps to run the Studio locally, configure the preview secret, wire preview variables in Vercel, and deploy the Studio.

## Prerequisites
- Node.js (v18+ recommended)
- npm
- Access to the Sanity project (projectId: `ayo78gin`) and your Vercel project

## Environment
Files updated in repo (local only):
- `.env.local` — project root (already contains `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`)
- `studio/.env` — local Studio env

Environment variables used:
- `NEXT_PUBLIC_SANITY_PROJECT_ID=ayo78gin`
- `NEXT_PUBLIC_SANITY_DATASET=Public`
- `NEXT_PUBLIC_SANITY_API_VERSION=2025-12-10`
- `NEXT_PUBLIC_SANITY_PREVIEW_SECRET=<your-preview-secret>`

I placed a generated placeholder `preview_secret_9f7a6c2d1b3e4f8a` in both `.env.local` and `studio/.env`. Replace this with a secure secret before sharing.

## 1) Run Studio locally
Open a terminal and run:

```bash
cd studio
npm install
npm run dev
```

Studio will start on http://localhost:3333 (or the port shown in the terminal).

## 2) Configure preview secret (required for Next preview integration)
Two options:

A) Use Sanity web app (recommended)
1. Open https://manage.sanity.io and sign in.
2. Select the project `ayo78gin`.
3. Go to Project settings → API (or "Settings → API").
4. Look for an option to configure a "Preview URL secret" or "Preview URL" settings (varies by Sanity UI version).
5. Add the secret value (use the same value as `NEXT_PUBLIC_SANITY_PREVIEW_SECRET` in `.env.local`).

B) Use the Sanity web/CLI docs if you prefer the CLI — otherwise use the web UI above.

> Important: The preview secret must be set in the Sanity project and match the `NEXT_PUBLIC_SANITY_PREVIEW_SECRET` value in both local env and in Vercel.

## 3) Add the secret to Vercel (so Preview builds work on deployments)
1. In the Vercel dashboard, open your project settings → Environment Variables.
2. Add a variable:
   - Name: `NEXT_PUBLIC_SANITY_PREVIEW_SECRET`
   - Value: `<your-preview-secret>`
   - Environment: `Preview` and `Development` (and `Production` only if you want production preview behavior)

3. Also add `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` to Vercel if not already set.

## 4) Test preview locally
- Edit a document in Studio and use the built-in preview action (or open the preview URL configured in document actions). The preview URL should point to your Next app preview route and include the `secret` query param matching the secret.

If your Next app exposes a preview API route (e.g. `/api/preview`) you can test:

```bash
# open in browser (replace host/port and secret)
http://localhost:3000/api/preview?secret=preview_secret_9f7a6c2d1b3e4f8a
```

## 5) Deploy Studio to Sanity cloud
If you want the hosted Studio in Sanity's CDN:

```bash
cd studio
npm run deploy
# or use sanity CLI if installed: npx sanity deploy
```

You may need to authenticate with `npx sanity login` first.

## 6) Notes & next steps I can help with
- I can run `npx sanity login` and `npm run deploy` from here if you want me to deploy the Studio now — you must confirm you are OK with interactive auth (browser sign-in) or provide credentials (not recommended).
- I can also add a Next preview API route or wire up the `SanityLive` helper to a specific route if you'd like.

---
If you want me to proceed with deploying the Studio now, confirm and I will attempt `npx sanity login` then `npm run deploy` (it may open an interactive browser auth step). Otherwise I can continue by wiring Next preview routes and testing live preview locally.