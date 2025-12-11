import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_PATHS = new Set<string>([
  '/',
  '/about',
  '/contact',
  '/api/health',
])

export function middleware(req: NextRequest) {
  const { pathname } = new URL(req.url)
  if (PUBLIC_PATHS.has(pathname)) {
    return NextResponse.next()
  }

  // Example auth gate: require JWT cookie for protected paths
  const jwt = req.cookies.get('auth_token')?.value
  if (!jwt) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|assets|images).*)'],
}