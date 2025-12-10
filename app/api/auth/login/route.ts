import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUser } from "../../../../lib/db";
import { sign } from "../../../../lib/jwt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body || {};
    if (!email || !password) return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    const user = getUser(email);
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const token = sign({ email }, process.env.JWT_SECRET as string);
    const res = NextResponse.json({ email, walletAddress: user.walletAddress });
    const isProd = process.env.NODE_ENV === "production";
    res.cookies.set("token", token, {
      httpOnly: true,
      sameSite: isProd ? "strict" : "lax",
      secure: isProd,
      path: "/",
    });
    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Login failed" }, { status: 401 });
  }
}
