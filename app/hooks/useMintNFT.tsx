// This hook previously used @account-kit/react, which is not compatible with Next.js Turbopack in client code.
// TODO: Refactor to mint NFT via an API route or server component.
export function useMint() {
  throw new Error('useMint is temporarily unavailable due to build constraints. Please refactor to use server-side logic or API routes.');
}
