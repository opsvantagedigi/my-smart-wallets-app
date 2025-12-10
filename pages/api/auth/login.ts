import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "Missing email or password" });

  // Lookup user in DB (placeholder demo logic)
  // const user = await db.user.findUnique({ where: { email } });
  // if (!user) return res.status(401).json({ error: "Invalid credentials" });

  // Demo: compare provided password to itself (replace with user.password in real app)
  const valid = await bcrypt.compare(password, /* user.password */ password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ email }, process.env.JWT_SECRET || "dev_secret", { expiresIn: "1h" });
  res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/`);
  return res.status(200).json({ success: true });
}