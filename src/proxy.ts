import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import Negotiator    from 'negotiator'
import { match }     from '@formatjs/intl-localematcher'
import { locales, defaultLocale, type Locale } from '@/i18n/config'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) throw new Error('JWT_SECRET environment variable is not set')
const SECRET = new TextEncoder().encode(JWT_SECRET)

const ADMIN_ROUTES = ['/admin']
const AUTH_ROUTES  = ['/auth/login', '/auth/register']
const LOCALE_COOKIE = 'NEXT_LOCALE'

// ── Détecter la locale préférée depuis Accept-Language ──────
function getPreferredLocale(request: NextRequest): Locale {
  // Priorité 1 : cookie explicite
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  if (cookieLocale && (locales as readonly string[]).includes(cookieLocale)) {
    return cookieLocale as Locale
  }

  // Priorité 2 : header Accept-Language
  const acceptLanguage = request.headers.get('accept-language') ?? ''
  const headers = { 'accept-language': acceptLanguage }
  const languages = new Negotiator({ headers }).languages()

  try {
    const matched = match(languages, [...locales], defaultLocale)
    return matched as Locale
  } catch {
    return defaultLocale
  }
}

async function verifyJWT(token: string) {
  const { payload } = await jwtVerify(token, SECRET)
  return payload as { userId: string; email: string; role: string }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value

  // ── Protéger les routes /admin ──────────────────────────
  if (ADMIN_ROUTES.some(r => pathname.startsWith(r))) {
    if (!token) {
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
    try {
      const payload = await verifyJWT(token)
      if (payload.role !== 'ADMIN' && payload.role !== 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/', request.url))
      }
      const res = NextResponse.next()
      res.headers.set('x-user-id',   payload.userId)
      res.headers.set('x-user-role', payload.role)
      res.headers.set('x-user-email', payload.email)
      return res
    } catch {
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // ── Rediriger utilisateur déjà connecté ────────────────
  if (AUTH_ROUTES.some(r => pathname.startsWith(r)) && token) {
    try {
      await verifyJWT(token)
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    } catch { /* token invalide → continuer */ }
  }

  // ── Injecter la locale dans les headers de réponse ─────
  // (Les Server Components peuvent lire x-locale via headers())
  const locale = getPreferredLocale(request)
  const response = NextResponse.next()
  response.headers.set('x-locale', locale)

  // Persister la locale en cookie si elle n'y est pas encore
  if (!request.cookies.get(LOCALE_COOKIE)) {
    response.cookies.set(LOCALE_COOKIE, locale, {
      path:     '/',
      maxAge:   365 * 24 * 60 * 60, // 1 an
      sameSite: 'lax',
      secure:   process.env.NODE_ENV === 'production',
    })
  }

  return response
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/auth/:path*',
  ],
}
