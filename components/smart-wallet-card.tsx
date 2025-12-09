"use client";

import { useState } from "react";

export function SmartWalletCard() {
  const [status, setStatus] = useState<string>(
    process.env.NEXT_PUBLIC_EMBEDDED_WALLET_ENABLED === "true" ? "ready" : "disabled"
  );

  async function connectWallet() {
    try {
      const enabled = process.env.NEXT_PUBLIC_EMBEDDED_WALLET_ENABLED === "true";
      if (!enabled) {
        setStatus("disabled");
        return;
      }
      // Minimal placeholder for Account Kit integration:
      // Here you would initialize Alchemy Smart Wallet SDK with env vars
      // and start onboarding/connect flow. For now, navigate to /wallet.
      setStatus("connecting");
      window.location.href = "/wallet";
    } catch (e) {
      setStatus("error");
    }
  }

  return (
    <div className="p-6 rounded-xl border border-white/10 bg-white/5 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-orbitron text-xl font-semibold">Smart Wallet</h3>
          <p className="text-gray-300 text-sm">Connect and start with Account Kit onboarding.</p>
        </div>
        <button
          onClick={connectWallet}
          className="px-4 py-2 rounded-md bg-gradient-to-r from-[#0030ff] to-blue-600 hover:scale-105 transition"
        >
          {status === "connecting" ? "Connecting..." : "Connect Wallet"}
        </button>
      </div>
      {status === "disabled" && (
        <p className="mt-3 text-yellow-200 text-xs">
          Embedded wallet is disabled. Set NEXT_PUBLIC_EMBEDDED_WALLET_ENABLED=true in Vercel.
        </p>
      )}
      {process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL && process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ? (
        <p className="mt-3 text-xs text-gray-400">RPC and API Key detected.</p>
      ) : (
        <p className="mt-3 text-xs text-red-300">Missing RPC/API Key env vars.</p>
      )}
    </div>
  );
}
