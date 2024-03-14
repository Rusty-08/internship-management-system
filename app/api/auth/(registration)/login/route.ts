import { NextResponse } from 'next/server'
import prisma from '../../../../../lib/prisma'
import { connectDB } from '@/lib/connect-db'

export async function POST(req: Request) {
  try {
    await connectDB()
    const { email } = await req.json()
    const user = await prisma.user.findUnique({ where: { email } })
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
