import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } },
) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: params.email },
    })

    if (!user) {
      return NextResponse.json({ message: 'No User Exists' }, { status: 401 })
    }

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Could not verify user' },
      { status: 404 },
    )
  } finally {
    await prisma.$disconnect()
  }
}
