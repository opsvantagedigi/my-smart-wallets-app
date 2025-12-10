import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUser, setUser } from "../../../../lib/db";
import { sign } from "../../../../lib/jwt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const exists = getUser(email);
    if (exists) return NextResponse.json({ error: "User already exists" }, { status: 409 });

    const passwordHash = await bcrypt.hash(password, 10);
    setUser({ email, passwordHash, walletAddress: null });

    const token = sign({ email }, process.env.JWT_SECRET as string);
    const res = NextResponse.json({ email });
    const isProd = process.env.NODE_ENV === "production";
    res.cookies.set("token", token, {
      httpOnly: true,
      sameSite: isProd ? "strict" : "lax",
      secure: isProd,
      path: "/",
      maxAge: 60 * 60,
    });
    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Signup failed" }, { status: 400 });
  }
}
