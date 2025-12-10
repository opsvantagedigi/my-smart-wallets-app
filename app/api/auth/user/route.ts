import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

function decodeToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET as string) as JwtPayload;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  if (!JWT_SECRET) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  // Prefer cookie (HttpOnly) but allow Authorization: Bearer as fallback
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get("token")?.value ?? null;
  const authHeader = req.headers.get("authorization");
  const headerToken =
    authHeader && authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  const token = cookieToken || headerToken;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const payload = decodeToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }

  // If you store additional data (e.g., walletAddress) in DB, fetch it here.
  // Example:
  // const user = await db.user.findUnique({ where: { email: payload.email } });

  return NextResponse.json({
    user: {
      email: (payload as any).email ?? null,
      walletAddress: (payload as any).walletAddress ?? null,
    },
  });
}
