"use client";
import { useEffect, useState } from "react";
import LoginCard from "../../components/login-card";
import UserInfo from "../../components/user-info-card";
import { TestAuthButton } from "../../components/test-auth-button";
import AIAvatar from "../../components/AIAvatar";

type Me = { user?: { email?: string; walletAddress?: string | null } };

export default function WalletPage() {
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/auth/user", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setMe(data as Me);
        } else {
          setMe({});
        }
      } catch (err) {
        console.error("/api/auth/user fetch error:", err);
        setMe({});
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="container mx-auto px-6 py-24 space-y-8 text-white">
      <h1 className="font-orbitron text-3xl font-bold">Your Wallet</h1>
      {loading ? (
        <div className="p-4 border rounded bg-white/20 backdrop-blur-md">Loading…</div>
      ) : me?.user ? (
        <>
          <UserInfo />
          <TestAuthButton />
        </>
      ) : (
        <LoginCard />
      )}
      <div className="fixed bottom-6 right-6 z-50">
        <AIAvatar />
      </div>
    </main>
  );
}
