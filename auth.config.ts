import { User, UserRole } from '@prisma/client'
import type { NextAuthConfig } from 'next-auth'

const privateRoutes = ['/admin', '/mentor', '/intern']

export const authConfig = {
  session: {
    strategy: 'jwt',
    maxAge: 86400,
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const path = nextUrl.pathname
      const isLoggedIn = !!auth?.user
      const userRole = auth?.user?.role
      const isFirstLogin = auth?.user?.passwordChangeRequired

      if (isFirstLogin) {
        if (path.startsWith('/auth/change-password')) return true
        return Response.redirect(new URL('/auth/change-password', nextUrl))
      }

      if (isLoggedIn) {
        switch (userRole) {
          case 'ADMIN':
            if (path.startsWith('/admin')) return true
            return Response.redirect(new URL('/admin', nextUrl))
          case 'MENTOR':
            if (path.startsWith('/mentor')) return true
            return Response.redirect(new URL('/mentor', nextUrl))
          case 'INTERN':
            if (path.startsWith('/intern')) return true
            return Response.redirect(new URL('/intern', nextUrl))
          default:
            return false
        }
      } else {
        if (path.startsWith('/auth/change-password')) {
          return Response.redirect(new URL('/auth/login', nextUrl))
        }
        if (
          path.startsWith('/admin') ||
          path.startsWith('/mentor') ||
          path.startsWith('/intern')
        ) {
          return Response.redirect(new URL('/', nextUrl))
        }
        return true
      }
    },
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user }
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role as UserRole | null
      session.user.passwordChangeRequired =
        token.passwordChangeRequired as boolean
      return session
    },
  },
  providers: [],
} satisfies NextAuthConfig
