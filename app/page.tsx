"use client";

import { useSignerStatus } from "@account-kit/react";
import UserInfoCard from "./components/user-info-card";
import NftMintCard from "./components/nft-mint-card";
import LoginCard from "./components/login-card";
import Header from "./components/header";
import LearnMore from "./components/learn-more";
import { SmartWalletCard } from "./components/smart-wallet-card";

export default function Home() {
  const signerStatus = useSignerStatus();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Header />
      <div className="pt-20">
        <main className="container mx-auto px-4 py-8 min-h-screen">
          {signerStatus.isConnected ? (
            <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
              <div className="flex flex-col gap-8">
                <UserInfoCard />
                <SmartWalletCard />
                <LearnMore />
              </div>
              <NftMintCard />
            </div>
          ) : (
            <div className="flex justify-center items-center min-h-[80vh]">
              <LoginCard />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
