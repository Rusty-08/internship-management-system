// @ts-nocheck
import NextAuth from 'next-auth/next'
import CredentialsProviders from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { connectDB } from '@/lib/connect-db'
import prisma from '@/lib/prisma'

const authOptions = {
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
        })

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
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session({ session, token, user }) {
      return session
    },
  },
  pages: {
    signIn: '/auth/login',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
