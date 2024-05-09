// import { NextRequest } from 'next/server'
// import { getSession } from 'next-auth/react'

// export { default } from 'next-auth/middleware'

// export async function middleware(request: NextRequest) {
//   const session = await getSession({
//     req: {
//       headers: Object.fromEntries(request.headers.entries()),
//       url: request.url,
//     },
//   })
//   const currentUser = session?.user
//   const role = currentUser?.role
//   const isFirstLogin = currentUser?.passwordChangeRequired

//   const path = request.nextUrl.pathname

//   switch (true) {
//     case isFirstLogin == undefined && path === '/auth/change-password':
//       return Response.redirect(new URL('/auth/login', request.url))

//     case isFirstLogin && path !== '/auth/change-password':
//       return Response.redirect(new URL('/auth/change-password', request.url))

//     case !currentUser &&
//       (path.startsWith('/admin') ||
//         path.startsWith('/intern') ||
//         path.startsWith('/mentor')):
//       return Response.redirect(new URL('/', request.url))

//     case (role !== 'ADMIN' && path.startsWith('/admin')) ||
//       (role !== 'INTERN' && path.startsWith('/intern')) ||
//       (role !== 'MENTOR' && path.startsWith('/mentor')):
//       return Response.redirect(new URL('/unauthorized', request.url))

//     case !isFirstLogin && (path.startsWith('/auth') || path === '/'):
//       if (role === 'ADMIN' && path !== '/admin') {
//         return Response.redirect(new URL('/admin', request.url))
//       }
//       if (role === 'INTERN' && path !== '/intern') {
//         return Response.redirect(new URL('/intern', request.url))
//       }
//       if (role === 'MENTOR' && path !== '/mentor') {
//         return Response.redirect(new URL('/mentor', request.url))
//       }
//       break
//     case !currentUser && path.startsWith('/api'):
//       return Response.redirect(new URL('auth/login', request.url))
//   }
// }

import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'

export default NextAuth(authConfig).auth

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
