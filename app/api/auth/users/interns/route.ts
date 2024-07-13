import prisma from '@/lib/prisma'
import { unstable_noStore } from 'next/cache'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: 'INTERN',
      },
      select: {
        image: true,
        name: true,
        email: true,
        internProfile: {
          select: {
            mentor: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    const updatedUsers = users.map(user => ({
      image: user.image,
      name: user.name,
      email: user.email,
      mentor: user.internProfile?.mentor?.name || 'none',
    }))

    if (!updatedUsers) {
      return NextResponse.json({ message: 'No Users Exists' }, { status: 401 })
    }

    const response = NextResponse.json(updatedUsers, { status: 200 })
    response.headers.set('Cache-Control', 'public, max-age=1200, s-maxage=600') // cache for 20 minutes and 10 minutes on the server
    return response
  } catch (error) {
    console.log('Error:', error)
    unstable_noStore() // This prevents caching of the error response
    return NextResponse.json(
      { message: 'Could not verify user' },
      { status: 404 },
    )
  } finally {
    await prisma.$disconnect()
  }
}
