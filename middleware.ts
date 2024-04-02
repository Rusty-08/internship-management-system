import { NextRequest } from 'next/server'
import { getSession } from 'next-auth/react'

export { default } from 'next-auth/middleware'

export async function middleware(request: NextRequest) {
  const session = await getSession({
    req: {
      headers: Object.fromEntries(request.headers.entries()),
      url: request.url,
    },
  })
  const currentUser = session?.user
  const role = currentUser?.role
  const isFirstLogin = currentUser?.passwordChangeRequired

  if (
    isFirstLogin == undefined &&
    request.nextUrl.pathname === '/auth/change-password'
  ) {
    return Response.redirect(new URL('/auth/login', request.url))
  }

  if (isFirstLogin && request.nextUrl.pathname !== '/auth/change-password') {
    return Response.redirect(new URL('/auth/change-password', request.url))
  }

  if (
    !currentUser &&
    (request.nextUrl.pathname.startsWith('/admin') ||
      request.nextUrl.pathname.startsWith('/intern'))
  ) {
    return Response.redirect(new URL('/', request.url))
  }

  if (
    (role !== 'ADMIN' && request.nextUrl.pathname.startsWith('/admin')) ||
    (role !== 'INTERN' && request.nextUrl.pathname.startsWith('/intern'))
  ) {
    return Response.redirect(new URL('/unauthorized', request.url))
  }

  if (
    !isFirstLogin &&
    (request.nextUrl.pathname.startsWith('/auth') ||
      request.nextUrl.pathname === '/')
  ) {
    if (role === 'ADMIN' && request.nextUrl.pathname !== '/admin') {
      return Response.redirect(new URL('/admin', request.url))
    }
    if (role === 'INTERN' && request.nextUrl.pathname !== '/intern') {
      return Response.redirect(new URL('/intern', request.url))
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
