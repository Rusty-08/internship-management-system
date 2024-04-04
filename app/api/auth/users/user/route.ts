import { NextResponse } from 'next/server'
import prisma from '../../../../../lib/prisma'
import { connectDB } from '@/lib/connect-db'

export async function POST(req: Request) {
  const { email } = await req.json()

  try {
    await connectDB()
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return NextResponse.json({ message: 'No User Exists' }, { status: 401 })
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
