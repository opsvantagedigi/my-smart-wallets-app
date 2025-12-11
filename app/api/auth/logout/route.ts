import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({ ok: true, message: 'Logout stub' }, { status: 200 })
}

export const dynamic = 'force-dynamic'