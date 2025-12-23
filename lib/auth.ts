import jwt from 'jsonwebtoken'

type User = { id: string; email: string; name?: string }

const JWT_SECRET = process.env.JWT_SECRET || 'development-secret'

export function signToken(user: User) {
  return jwt.sign({ sub: user.id, email: user.email, name: user.name }, JWT_SECRET, {
    expiresIn: '7d',
  })
}

export function verifyToken(token: string): User | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as any
    return { id: payload.sub, email: payload.email, name: payload.name }
  } catch {
    return null
  }
}

export function cookieOptions() {
  return {
    httpOnly: true,
    secure: true,
    sameSite: 'strict' as const,
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  }
}