import { NextRequest } from 'next/server'
export { default } from 'next-auth/middleware'

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('next-auth.session-token')?.value

  if (currentUser && request.nextUrl.pathname.startsWith('/auth')) {
    return Response.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
