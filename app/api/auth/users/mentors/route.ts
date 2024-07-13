import prisma from '@/lib/prisma'
import { revalidatePath, unstable_noStore } from 'next/cache'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: { role: 'MENTOR', isArchived: false },
    })

    if (!users) {
      return NextResponse.json({ message: 'No Users Exists' }, { status: 401 })
    }

    const response = NextResponse.json(users, { status: 200 })
    response.headers.set('Cache-Control', 'public, max-age=1200, s-maxage=600') // cache for 20 minutes and 10 minutes on the server
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
    revalidatePath('/admin/intern-management')
  }
}
