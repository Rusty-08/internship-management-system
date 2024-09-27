import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {

  try {
    const user = await prisma.user.findUnique({
      where: { id, isArchived: false },
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
