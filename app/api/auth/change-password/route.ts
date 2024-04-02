import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import { connectDB } from '@/lib/connect-db'
import { Session, getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const { email } = (session?.user as Session['user']) || {}

  const { password } = await req.json()

  const hashPassword = await bcrypt.hash(password, 10)

  try {
    await connectDB()
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return NextResponse.json({ message: 'No User Exists' }, { status: 401 })
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { password: hashPassword, passwordChangeRequired: false },
    })

    return NextResponse.json({ user: updatedUser }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Could not verify user' },
      { status: 404 },
    )
  } finally {
    await prisma.$disconnect()
  }
}