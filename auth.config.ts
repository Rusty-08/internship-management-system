import { UserRole } from '@prisma/client'
import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  session: {
    strategy: 'jwt',
    maxAge: 86400,
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const path = nextUrl.pathname
      const isLoggedIn = !!auth?.user
      const userRole = auth?.user?.role
      const isFirstLogin = auth?.user?.passwordChangeRequired
      const isArchived = auth?.user?.isArchived

      if (isArchived) {
        if (path === '/sign-in') return true
        return Response.redirect(new URL('/sign-in', nextUrl))
      }

      if (isFirstLogin) {
        if (path === '/change-password') return true
        return Response.redirect(new URL('/change-password', nextUrl))
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
        const redirect = path === '/' ? '/sign-in' : `/sign-in?redirect=${path}`

        if (path.startsWith('/sign-in')) return true
        return Response.redirect(new URL(redirect, nextUrl))
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
