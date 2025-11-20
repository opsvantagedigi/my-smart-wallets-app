// This component previously used @account-kit/react and useSmartWallet, which are not compatible with Next.js Turbopack in client code.
// TODO: Refactor to fetch smart wallet data from an API route or server component.
export function SmartWalletCard() {
  return (
    <div className="p-4 border rounded bg-yellow-50 text-yellow-900">
      <strong>Smart Wallet:</strong> This feature is temporarily unavailable due to build constraints. Please refactor to use server-side logic or API routes.
    </div>
  );
}
