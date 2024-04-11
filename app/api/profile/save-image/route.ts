import { connectDB } from '@/lib/connect-db'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, picture } = await req.json()

  try {
    await connectDB()
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return NextResponse.json({ message: 'No User Exists' }, { status: 401 })
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        image: picture,
      },
    })

    return NextResponse.json(updatedUser, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Could not verify user' },
      { status: 404 },
    )
  } finally {
    await prisma.$disconnect()
  }
}
