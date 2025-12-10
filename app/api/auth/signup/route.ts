import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
  if (!JWT_SECRET) return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });

  const { email, password } = await req.json();
  if (!email || !password)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);

  // TODO: persist user to DB
  // await db.user.create({ data: { email, password: hashed } });

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
  const res = NextResponse.json({ success: true });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60,
  });
  return res;
}
