import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { isServerDemoMode } from '@/common/utils/demoMode'
import i18nConfig from './i18nConfig'

const LOCALE_COOKIE = 'NEXT_LOCALE'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

const getPathLocale = (pathname: string) =>
  i18nConfig.locales.find((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))

const getPreferredLocale = (request: NextRequest) => {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value

  if (cookieLocale && i18nConfig.locales.includes(cookieLocale)) {
    return cookieLocale
  }

  const acceptLanguage = request.headers.get('accept-language')?.toLowerCase() || ''

  if (acceptLanguage.includes('en')) {
    return 'en'
  }

  return i18nConfig.defaultLocale
}

const setLocaleCookie = (response: NextResponse, locale: string) => {
  response.cookies.set(LOCALE_COOKIE, locale, {
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })
}

const getLocalizedPath = (pathname: string, locale: string) => {
  if (pathname === '/') {
    return `/${locale}`
  }

  return `/${locale}${pathname}`
}

const getInternalOrigin = (request: NextRequest) => {
  const host = request.headers.get('host') || request.nextUrl.host
  return `http://${host}`
}

const getPublicOrigin = (request: NextRequest) => {
  const forwardedHost = request.headers.get('x-forwarded-host')
  const forwardedProto = request.headers.get('x-forwarded-proto')

  if (forwardedHost && forwardedProto) {
    return `${forwardedProto}://${forwardedHost}`
  }

  return request.nextUrl.origin
}

// applies this middleware only to files in the app directory
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - monitoring (sentry/monitoring)
     */
    '/((?!api|static|.*\\..*|_next|favicon.ico|sitemap.xml|robots.txt|monitoring).*)',
  ],
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const pathLocale = getPathLocale(pathname)
  const normalizedPath = pathLocale ? pathname.slice(`/${pathLocale}`.length) || '/' : pathname
  const isDemoWelcomePath = normalizedPath === '/app/welcome'

  const cookie = request.cookies.get('userToken')

  // Everything under /app is protected and requires the user the logged in
  if (normalizedPath.startsWith('/app') && !(isServerDemoMode && isDemoWelcomePath)) {
    if (!cookie) {
      const loginPath = pathLocale && pathLocale !== i18nConfig.defaultLocale ? `/${pathLocale}/login` : '/login'
      return NextResponse.redirect(new URL(`${loginPath}?ref=${pathname}${search}`, request.nextUrl.origin))
    }
  }

  if (!pathLocale) {
    const locale = getPreferredLocale(request)
    const localizedPath = getLocalizedPath(pathname, locale)
    const response =
      locale === i18nConfig.defaultLocale
        ? NextResponse.rewrite(new URL(`${localizedPath}${search}`, getInternalOrigin(request)))
        : NextResponse.redirect(new URL(`${localizedPath}${search}`, getPublicOrigin(request)))

    setLocaleCookie(response, locale)
    return response
  }

  if ((pathname === `/${i18nConfig.defaultLocale}` || pathname === '/en') && process.env.NODE_ENV !== 'development' && cookie) {
    const appPath = pathLocale === i18nConfig.defaultLocale ? '/app/movepage' : `/${pathLocale}/app/movepage`
    return NextResponse.redirect(new URL(appPath, request.nextUrl.origin))
  }

  const response = NextResponse.next()
  setLocaleCookie(response, pathLocale)

  return response
}
