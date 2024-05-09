import { User, UserRole } from '@prisma/client'
import type { NextAuthConfig } from 'next-auth'

const publicRoutes = ['/', '/auth/login']

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
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const userRole = auth?.user?.role

      if (isLoggedIn) {
        switch (userRole) {
          case 'ADMIN':
            if (nextUrl.pathname.startsWith('/admin')) return true
            return Response.redirect(new URL('/admin', nextUrl))
          case 'MENTOR':
            if (nextUrl.pathname.startsWith('/mentor')) return true
            return Response.redirect(new URL('/mentor', nextUrl))
          case 'INTERN':
            if (nextUrl.pathname.startsWith('/intern')) return true
            return Response.redirect(new URL('/intern', nextUrl))
          default:
            return false
        }
      }
      if (publicRoutes.includes(nextUrl.pathname)) return true
      return Response.redirect(new URL('/', nextUrl))
    },
    async jwt({ token, user }) {
      if (user) {
        const { role, passwordChangeRequired } = user as User
        const { name, email } = token
        return { name, email, role, passwordChangeRequired }
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
