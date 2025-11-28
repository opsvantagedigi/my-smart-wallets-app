# Smart Wallets Quickstart (Next.js)

Use this template to get started with **embedded smart wallets** using [Alchemy Account Kit](https://www.alchemy.com/docs/wallets).

## ✨ Features

- Email, passkey & social login using pre‑built UI components
- Flexible, secure, and cheap smart accounts
- Gasless transactions powered by ERC-4337 Account Abstraction
- One‑click NFT mint (no ETH required)
- Server‑side rendering ready – session persisted with cookies
- TailwindCSS + shadcn/ui components, React Query, TypeScript

![Smart Wallet Quickstart](https://github.com/user-attachments/assets/2903fb78-e632-4aaa-befd-5775c60e1ca2)

## 📍 Network & Demo Contract

This quickstart is configured to run on **Arbitrum Sepolia** testnet, by default. A free demo NFT contract has been deployed specifically for this quickstart, allowing you to mint NFTs without any setup or deployment steps. The contract is pre-configured and ready to use out of the box.

## 🚀 Quick start

### Scaffold a new app

```bash
npm create next-app smart-wallets-quickstart -- --example https://github.com/alchemyplatform/smart-wallets-quickstart
cd smart-wallets-quickstart
```

### 🔧 Configure

Get your pre-configured API key and policy ID from the [Smart Wallets dashboard](https://dashboard.alchemy.com/services/smart-wallets/configuration) by viewing one of your configurations. You will get a default app, configuration, and sponsorship policy created for you to quickly start testing.

Once you have your keys, add them to your `.env.local ` file.

```bash
cp .env.example .env.local      # create if missing
# add NEXT_PUBLIC_ALCHEMY_API_KEY=...
# add NEXT_PUBLIC_ALCHEMY_POLICY_ID=...
```

| Variable                        | Purpose                                                                                                     |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_ALCHEMY_API_KEY`   | API key for your Alchemy [app](https://dashboard.alchemy.com/services/smart-wallets/configuration)          |
| `NEXT_PUBLIC_ALCHEMY_POLICY_ID` | Gas Manager policy ID for [sponsorship](https://dashboard.alchemy.com/services/smart-wallets/configuration) |

If instead you want to set up your own configurations from scratch you should:

1. Create a new Alchemy [app](https://dashboard.alchemy.com/apps)
2. Set up a new Smart Wallet [configruation](https://dashboard.alchemy.com/services/smart-wallets/configuration) for your app to specify login methods
3. Create a gas sponsorship [policy](https://dashboard.alchemy.com/services/gas-manager/configuration) for your app

Note: for production, you should [protect](https://www.alchemy.com/docs/wallets/resources/faqs#how-should-i-protect-my-api-key-and-policy-id-in-the-frontend) your API key and policy ID behind a server rather than exposing client side.

### Run your app!

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), first **Login**, then try minting a new NFT.

Congrats! You've created a new smart wallet and sent your first sponsored transaction!

See what else you can do with [smart wallets](https://www.alchemy.com/docs/wallets/react/overview).

## 🗂 Project layout

```
app/           # Next.js pages & components
components/ui/ # shadcn/ui primitives
lib/           # constants & helpers
config.ts      # Account Kit + Gas Sponsorship setup
tailwind.config.ts
```

## 🏗️ How it works

1. `config.ts` initializes Account Kit with your API key, chain, and Gas Sponsorship policy.
2. `Providers` wraps the app with `AlchemyAccountProvider` & React Query.
3. `LoginCard` opens the authentication modal (`useAuthModal`).
4. After login, `useSmartAccountClient` exposes the smart wallet.
5. `NftMintCard` uses `useSendUserOperation` to call `mintTo()` on the demo ERC‑721, with gas paid by the Paymaster.

## 📚 Docs & resources

- React Quickstart → [https://www.alchemy.com/docs/wallets/react/quickstart](https://www.alchemy.com/docs/wallets/react/quickstart)
- Gas Manager quickstart → [https://www.alchemy.com/docs/wallets/infra/quickstart](https://www.alchemy.com/docs/wallets/infra/quickstart)

## 🖥 Scripts

```bash
npm run dev     # start development server
npm run build   # production build
npm run start   # run production build
npm run lint    # lint code
```

## Safe push helpers

Use the provided helper scripts to stage, review, and push changes safely. Both scripts protect against accidentally committing a local `.env.local` file and provide a dry-run mode to preview changes.

- **Bash:**

```bash
# Dry-run: shows staged diff and status without committing or pushing
./scripts/push-changes.sh --dry-run

# Commit & push (interactive confirmation)
./scripts/push-changes.sh

# Specify a branch (positional or with --branch)
./scripts/push-changes.sh chore/remediate/sanity-secrets
./scripts/push-changes.sh --branch release/my-change
```

- **PowerShell (Windows):**

```powershell
# Dry-run: shows staged diff and status without committing or pushing
.\scripts\push-changes.ps1 -DryRun

# Commit & push (interactive confirmation)
.\scripts\push-changes.ps1

# Specify a branch
.\scripts\push-changes.ps1 -Branch 'release/my-change'
```

Notes:
- Both scripts will attempt to `git reset -- .env.local` so local secret files are not included in commits.
- If you have the GitHub CLI (`gh`) installed, the scripts will list recent workflow runs for the branch after a push.

## Re-run CI (helper)

If a workflow run fails and you need to re-run it from your machine, use the helper script which uses the GitHub CLI (`gh`). The script will attempt to find the last failed or cancelled run for the `chore/remediate/sanity-secrets` branch and request a rerun. It falls back to interactively asking you to choose a run id if automatic detection fails.

```bash
./scripts/rerun-ci.sh                  # rerun last failed run for chore/remediate/sanity-secrets
./scripts/rerun-ci.sh release/my-branch  # rerun last failed run for a different branch
```

Requirements:
- `gh` (GitHub CLI) must be installed and authenticated (`gh auth login`).
- `jq` is optional; if installed the script can automatically detect the failing run.

## Security reminders

- Never commit local secret files such as ` .env.local` into source control. The helper scripts explicitly `git reset` that file if present.
- Store runtime secrets only in GitHub: **Settings → Secrets and variables → Actions**. Add the following secrets at minimum for CI smoke checks:
	- `SANITY_API_TOKEN` (read-only token for smoke checks)
	- `SANITY_PROJECT_ID`
	- `SANITY_DATASET`
	- Optionally `NPM_TOKEN` and `NPM_REGISTRY_URL` if you use a private npm registry
- Use least-privilege tokens and rotate secrets regularly.



## 🛂 License

MIT

## Secrets & CI — Sanity token

This project requires a server-side Sanity token for certain CI smoke checks and server operations. Follow these steps to add and use the token securely.

- Add `SANITY_API_TOKEN` as a GitHub repository secret (Settings → Secrets and variables → Actions → New repository secret).
- Optionally add `SANITY_PROJECT_ID` and `SANITY_DATASET` as secrets or set them in your environment.
- If you use a private npm registry, add `NPM_TOKEN` (and `NPM_REGISTRY_URL`) as repository secrets.

CI consumes these secrets as environment variables (in workflows they are referenced as `${{ secrets.SANITY_API_TOKEN }}`) and are never written to logs. See `.github/workflows/ci.yml` for details.

Security notes:
- Do NOT commit tokens to source code.
- Use least-privilege tokens (read-only for smoke checks).
- Rotate tokens regularly.
