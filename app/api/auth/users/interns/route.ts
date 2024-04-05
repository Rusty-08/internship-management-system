import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/connect-db'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    await connectDB()
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

    return NextResponse.json(updatedUsers, { status: 201 })
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
