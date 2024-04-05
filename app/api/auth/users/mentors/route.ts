import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/connect-db'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    await connectDB()
    const users = await prisma.user.findMany({ where: { role: 'MENTOR' } })

    if (!users) {
      return NextResponse.json({ message: 'No Users Exists' }, { status: 401 })
    }

    return NextResponse.json(users, { status: 201 })
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
