import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'

const AUTH_ROUTES   = ['/auth/login', '/auth/register']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value

  // Protéger les routes admin
  if (pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login?redirect=/admin', request.url))
    }
    try {
      const payload = verifyToken(token)
      if (payload.role !== 'ADMIN' && payload.role !== 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/', request.url))
      }
    } catch {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  // Rediriger les utilisateurs déjà connectés hors du login
  if (AUTH_ROUTES.some(r => pathname.startsWith(r)) && token) {
    try {
      verifyToken(token)
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    } catch { /* token invalide, continuer */ }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*'],
}