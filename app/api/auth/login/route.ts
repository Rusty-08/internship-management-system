import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import { connectDB } from '@/lib/connect-db'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  try {
    await connectDB()
    const { email, password } = await req.json()
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 },
      )
    }

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Could not verify user' },
      { status: 404 },
    )
  } finally {
    await prisma.$disconnect()
  }
}
