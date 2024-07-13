import prisma from '@/lib/prisma'
import { unstable_noStore } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

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

    const response = NextResponse.json(user, { status: 201 })
    response.headers.set('Cache-Control', 'public, max-age=1200') // cache for 20 minutes
    return response
  } catch (error) {
    console.log('Error:', error)
    unstable_noStore()
    return NextResponse.json(
      { message: 'Could not verify user' },
      { status: 404 },
    )
  } finally {
    await prisma.$disconnect()
  }
}
