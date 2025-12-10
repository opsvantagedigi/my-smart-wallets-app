import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUser, setUser } from "../../../../lib/db";
import { sign } from "../../../../lib/jwt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body || {};
    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }
    const exists = getUser(email);
    if (exists) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    setUser({ email, passwordHash, walletAddress: null });
    const token = sign({ email }, process.env.JWT_SECRET || "dev_secret");
    const res = NextResponse.json({ email });
    const isProd = process.env.NODE_ENV === "production";
    res.cookies.set("token", token, {
      httpOnly: true,
      sameSite: isProd ? "strict" : "lax",
      secure: isProd,
      path: "/",
    });
    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Signup failed" }, { status: 400 });
  }
}
