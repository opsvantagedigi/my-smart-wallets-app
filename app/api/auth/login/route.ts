import { NextRequest, NextResponse } from 'next/server'
import { signToken, cookieOptions } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })
    const user = { id: crypto.randomUUID(), email }
    const token = signToken(user)
    const res = NextResponse.json({ user }, { status: 200 })
    res.cookies.set('auth_token', token, cookieOptions())
    return res
  } catch {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'