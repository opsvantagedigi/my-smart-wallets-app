Environment Setup

Required environment variables
- `NEXT_PUBLIC_ALCHEMY_API_KEY`: your Alchemy API key.
- `NEXT_PUBLIC_ALCHEMY_POLICY_ID`: your Alchemy Sponsorship Policy ID.
- `NEXT_PUBLIC_CHAIN_ID`: `11155111` (Sepolia) or your target chain ID.
- `NEXT_PUBLIC_ALCHEMY_RPC_URL`: `https://eth-sepolia.g.alchemy.com/v2/<your-key>`.
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: your WalletConnect project ID.
- `NEXT_PUBLIC_EMBEDDED_WALLET_ENABLED`: `true`.
- `JWT_SECRET`: strong secret for JWT signing.

Local development
- Add values to `.env.local` (already scaffolded):
  - `NEXT_PUBLIC_ALCHEMY_API_KEY=`
  - `NEXT_PUBLIC_ALCHEMY_POLICY_ID=`
  - `NEXT_PUBLIC_CHAIN_ID=11155111`
  - `NEXT_PUBLIC_ALCHEMY_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/<your-key>`
  - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=`
  - `NEXT_PUBLIC_EMBEDDED_WALLET_ENABLED=true`
  - `JWT_SECRET=`

Vercel environment (production)
1. Login and link project if needed:
   ```pwsh
   vercel login
   vercel link
   ```
2. Run the helper script (prompts for values):
   ```pwsh
   pwsh -NoProfile -File ./scripts/setup-vercel-env.ps1 -Scope production
   ```
3. Verify:
   ```pwsh
   vercel env ls
   ```

Optional: set preview environment by using `-Scope preview`.