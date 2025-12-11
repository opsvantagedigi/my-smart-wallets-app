import type { NextRequest } from 'next/server'

const PUBLIC_PATHS = new Set<string>([
  '/',
  '/about',
  '/contact',
  '/api/health',
  // Auth endpoints should be accessible without a prior JWT
  '/api/auth/login',
  '/api/auth/signup',
  '/api/auth/logout',
  '/api/auth/me',
  '/api/auth/user',
])

export default function proxy(req: NextRequest) {
  const { pathname } = new URL(req.url)
  // Allow public paths straight through
  if (PUBLIC_PATHS.has(pathname)) {
    return
  }

  // Require JWT cookie for protected paths; return 401 if missing
  const jwt = req.cookies.get('auth_token')?.value
  if (!jwt) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    })
  }

  // Continue to route handler
  return
}

export const config = {
  // Apply to API routes only; exclude static assets
  matcher: ['/api/:path*'],
}