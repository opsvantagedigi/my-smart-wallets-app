"use client";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      alert(res.ok ? `Signed up as ${data.email}` : data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Sign up</h1>
      <form onSubmit={submit} className="flex flex-col gap-3 max-w-md">
        <input
          className="border rounded p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border rounded p-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-black text-white rounded p-2"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>
    </main>
  );
}
