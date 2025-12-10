import jwt from "jsonwebtoken";

export function sign(payload: object, secret: string, options: jwt.SignOptions = { expiresIn: "7d" }) {
  return jwt.sign(payload, secret, options);
}

export function verify(token: string, secret: string): any {
  return jwt.verify(token, secret);
}
