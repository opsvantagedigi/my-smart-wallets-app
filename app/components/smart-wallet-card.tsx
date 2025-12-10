"use client";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";

export default function SmartWalletCard() {
  const router = useRouter();
  const ALCHEMY_ENABLED =
    process.env.NEXT_PUBLIC_EMBEDDED_WALLET_ENABLED === "true";

  const connect = async () => {
    if (!ALCHEMY_ENABLED) {
      router.push("/wallet");
      return;
    }
    try {
      const anyWindow = window as any;
      if (!anyWindow.ethereum) {
        alert("No wallet detected. Install MetaMask or use a supported wallet.");
        return;
      }
      const accounts = await anyWindow.ethereum.request({ method: "eth_requestAccounts" });
      const addr = accounts?.[0];
      if (!addr) return;
      await fetch("/api/wallet/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ address: addr }),
      });
      router.push("/wallet");
    } catch (e) {
      console.error(e);
      alert("Wallet connection failed.");
    }
  };

  return (
    <div className="p-4 border rounded bg-yellow-50 text-yellow-900">
      <Button onClick={connect} className="bg-black text-white">
        {ALCHEMY_ENABLED ? "Connect Wallet" : "Enable Wallets to Continue"}
      </Button>
      <div className="mt-3">
        <strong>Smart Wallet:</strong> This feature is temporarily unavailable due to build constraints. Please refactor to use server-side logic or API routes.
      </div>
    </div>
  );
}
