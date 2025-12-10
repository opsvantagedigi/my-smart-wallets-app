import { NextResponse } from "next/server";
import { verify } from "../../../../lib/jwt";
import { linkWallet } from "../../../../lib/db";

function getUserEmailFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const tokenMatch = cookieHeader.match(/(?:^|;\s*)token=([^;]+)/);
  const token = tokenMatch?.[1];
  if (!token) return null;
  try {
    const decoded = verify(token, process.env.JWT_SECRET || "dev_secret");
    return (decoded as any).email || null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const email = getUserEmailFromCookie(request.headers.get("cookie"));
    if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { address } = body || {};
    if (!address) return NextResponse.json({ error: "Missing wallet address" }, { status: 400 });

    const user = linkWallet(email, address);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ email: user.email, walletAddress: user.walletAddress });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Wallet connect failed" }, { status: 400 });
  }
}
