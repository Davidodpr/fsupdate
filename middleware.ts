import { i18nRouter } from 'next-i18n-router'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import i18nConfig from './i18nConfig'

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
  const response = i18nRouter(request, i18nConfig)

  const cookie = request.cookies.get('userToken')

  // Everything under /app is protected and requires the user the logged in
  if (request.nextUrl.pathname.startsWith('/app') || request.nextUrl.pathname.startsWith('/en/app')) {
    if (!cookie) {
      return NextResponse.redirect(new URL(`${request.nextUrl.origin}/login?ref=${request.nextUrl.pathname}${request.nextUrl.search}`))
    }
  }
  if (request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/en') {
    if (cookie) {
      return NextResponse.redirect(new URL(`${request.nextUrl.origin}${request.nextUrl.pathname}/app/movepage`))
    }
  }
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-url', request.url)
  return response
}
