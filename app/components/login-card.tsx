"use client";
import Link from "next/link";
import { Button } from "../../components/ui/button";

export default function LoginCard() {
  return (
    <div className="p-4 border rounded bg-white/20 backdrop-blur-md shadow">
      <div className="mb-2 font-semibold">Login</div>
      <p className="text-sm mb-3">Access your account to connect your wallet and manage settings.</p>
      <div className="flex gap-2">
        <Link href="/login"><Button className="bg-black text-white">Login</Button></Link>
        <Link href="/signup"><Button variant="outline">Sign Up</Button></Link>
      </div>
    </div>
  );
}
