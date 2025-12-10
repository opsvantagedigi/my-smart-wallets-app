import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  const isProd = process.env.NODE_ENV === "production";
  res.cookies.set("token", "", {
    httpOnly: true,
    sameSite: isProd ? "strict" : "lax",
    secure: isProd,
    maxAge: 0,
    path: "/",
  });
  return res;
}
