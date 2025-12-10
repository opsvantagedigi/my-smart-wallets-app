"use client";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";

export default function SmartWalletCard() {
  const router = useRouter();
  const EMBEDDED_WALLET_ENABLED =
    process.env.NEXT_PUBLIC_EMBEDDED_WALLET_ENABLED === "true";
  const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID || "11155111"; // default Sepolia

  const connect = async () => {
    // Require embedded wallet flag to proceed with onboarding
    if (!EMBEDDED_WALLET_ENABLED) {
      alert("Embedded wallet is disabled. Please enable it to continue.");
      return;
    }
    try {
      const anyWindow = window as any;
      if (!anyWindow.ethereum) {
        alert("No wallet provider detected. If using embedded wallet, refresh after enabling; otherwise install MetaMask or a supported wallet.");
        return;
      }
      // Ensure we are on the expected chain (Sepolia by default)
      try {
        const currentChain = await anyWindow.ethereum.request({ method: "eth_chainId" });
        const desiredHex = "0x" + parseInt(CHAIN_ID, 10).toString(16);
        if (currentChain && currentChain.toLowerCase() !== desiredHex.toLowerCase()) {
          await anyWindow.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: desiredHex }],
          }).catch(async (err: any) => {
            // If chain is not added, attempt to add Sepolia using public RPC env
            if (err?.code === 4902) {
              const rpcUrl = process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL;
              await anyWindow.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [{
                  chainId: desiredHex,
                  chainName: "Sepolia Test Network",
                  nativeCurrency: { name: "SepoliaETH", symbol: "SEP", decimals: 18 },
                  rpcUrls: rpcUrl ? [rpcUrl] : ["https://rpc.sepolia.org"],
                  blockExplorerUrls: ["https://sepolia.etherscan.io"],
                }],
              });
            } else {
              throw err;
            }
          });
        }
      } catch (chainErr) {
        console.warn("Chain check/switch skipped or failed:", chainErr);
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
    <div className="p-4 border rounded bg-white/20 backdrop-blur-md shadow-lg">
      <Button onClick={connect} className="bg-black text-white">
        {EMBEDDED_WALLET_ENABLED ? "Connect Wallet" : "Enable Embedded Wallets"}
      </Button>
      <div className="mt-3 text-sm">
        Ensure envs are set: NEXT_PUBLIC_EMBEDDED_WALLET_ENABLED=true, NEXT_PUBLIC_CHAIN_ID, RPC/API keys.
      </div>
    </div>
  );
}
