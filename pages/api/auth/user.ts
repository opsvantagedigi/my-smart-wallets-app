import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies?.token as string | undefined;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
    return res.status(200).json({ user: decoded });
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}