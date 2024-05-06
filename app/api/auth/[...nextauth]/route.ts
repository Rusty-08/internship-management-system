// @ts-nocheck
import NextAuth from 'next-auth/next'
import CredentialsProviders from 'next-auth/providers/credentials'
import { connectDB } from '@/lib/connect-db'
import prisma from '@/lib/prisma'
import type { NextAuthOptions } from 'next-auth'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProviders({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async credentials => {
        if (!credentials) {
          return Promise.resolve(null)
        }

        await connectDB()

        const { email, password } = credentials
        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            password: true,
            passwordChangeRequired: true,
            isArchived: true,
          },
        })

        if (user.isArchived) {
          return Promise.resolve(null)
        }

        if (user && (await bcrypt.compare(password, user.password))) {
          return Promise.resolve(user)
        } else {
          return Promise.resolve(null)
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 86400, // automcatilly sign out after 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user.role = token.role
      session.user.passwordChangeRequired = token.passwordChangeRequired
      return session
    },
  },
  pages: {
    signIn: '/auth/login',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
