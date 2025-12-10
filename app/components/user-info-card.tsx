"use client";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

type Profile = { authenticated: boolean; email?: string; walletAddress?: string | null };

export default function UserInfo() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (!res.ok) {
          setProfile({ authenticated: false });
        } else {
          const data = await res.json();
          setProfile(data as Profile);
        }
      } catch {
        setProfile({ authenticated: false });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <div className="p-4 border rounded bg-white/20 backdrop-blur-md">Loading user info…</div>;
  }

  if (!profile?.authenticated) {
    return (
      <div className="p-4 border rounded bg-white/20 backdrop-blur-md">
        <div className="mb-2 font-semibold">Not logged in</div>
        <p className="text-sm mb-3">Sign in to view your profile and wallet.</p>
        <div className="flex gap-2">
          <a href="/login"><Button className="bg-black text-white">Login</Button></a>
          <a href="/signup"><Button variant="outline">Sign Up</Button></a>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded bg-white/20 backdrop-blur-md">
      <div className="mb-2 font-semibold">Your Account</div>
      <div className="text-sm">Email: <Badge variant="outline">{profile.email}</Badge></div>
      <div className="text-sm mt-2">Wallet: <Badge variant="outline">{profile.walletAddress || "Not linked"}</Badge></div>
      <div className="mt-3">
        <a href="/wallet"><Button>Go to Wallet</Button></a>
      </div>
    </div>
  );
}
