import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await auth()

  try {
    const user = await prisma.user.findUnique({
      where: { id: session?.user.id }
    })

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    console.log('Error:', error)
    return NextResponse.json(
      { message: 'Could not verify user' },
      { status: 404 },
    )
  } finally {
    await prisma.$disconnect()
  }
}
