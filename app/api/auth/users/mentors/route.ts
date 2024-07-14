import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: { role: 'MENTOR', isArchived: false },
    })

    if (!users) {
      return NextResponse.json({ message: 'No Users Exists' }, { status: 401 })
    }

    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    console.log('Error:', error)
    return NextResponse.json(
      { message: 'Could not verify user' },
      { status: 404 },
    )
  } finally {
    await prisma.$disconnect()
    revalidatePath('/admin/intern-management')
  }
}
