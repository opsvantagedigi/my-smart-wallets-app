import { NextResponse } from "next/server";
import { verify } from "../../../../lib/jwt";
import { getUser } from "../../../../lib/db";

function getEmailFromCookie(cookieHeader: string | null): string | null {
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

export async function GET(request: Request) {
  const email = getEmailFromCookie(request.headers.get("cookie"));
  if (!email) return NextResponse.json({ authenticated: false }, { status: 401 });
  const user = getUser(email);
  if (!user) return NextResponse.json({ authenticated: false }, { status: 404 });
  return NextResponse.json({ authenticated: true, email: user.email, walletAddress: user.walletAddress });
}
