"use client";

import LoginCard from "../../components/login-card";
import UserInfo from "../../components/user-info-card";
import { TestAuthButton } from "../../components/test-auth-button";
import AIAvatar from "../../components/AIAvatar";

export default function WalletPage() {
  return (
    <main className="container mx-auto px-6 py-24 space-y-8 text-white">
      <h1 className="font-orbitron text-3xl font-bold">Your Wallet</h1>
      <LoginCard />
      <UserInfo />
      <TestAuthButton />
      <div className="fixed bottom-6 right-6 z-50">
        <AIAvatar />
      </div>
    </main>
  );
}
