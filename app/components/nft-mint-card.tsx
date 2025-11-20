// This component previously used @account-kit/react and related hooks, which are not compatible with Next.js Turbopack in client code.
// TODO: Refactor to fetch NFT minting data from an API route or server component.
export default function NftMintCard() {
  return (
    <div className="p-4 border rounded bg-yellow-50 text-yellow-900">
      <strong>NFT Mint:</strong> This feature is temporarily unavailable due to build constraints. Please refactor to use server-side logic or API routes.
    </div>
  );
}
