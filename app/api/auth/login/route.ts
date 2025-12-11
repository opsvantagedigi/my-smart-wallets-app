import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    // Minimal stub: accept any credentials and return success
    return NextResponse.json({ ok: true, message: 'Login stub' }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Unexpected error' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'