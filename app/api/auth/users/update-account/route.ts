import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function PUT(req: Request) {
  const { id, name, email, role, course, totalHours, expertise, mentor, batch, isArchived } =
    await req.json()

  try {
    if (!id || !name || !email) {
      return NextResponse.json({ message: 'Invalid input' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    let data;

    if (role === 'INTERN') {
      data = {
        name,
        email,
        course,
        isArchived: isArchived || false,
        mentorId: mentor || null,
        batchId: batch ?? user.batchId,
        totalHours
      }
    } else {
      data = {
        name,
        email,
        isArchived: isArchived || false,
        expertise,
      }
    }

    await prisma.user.update({
      where: { id }, data,
    })

    if (role === 'INTERN') {
      revalidatePath('/admin/intern-management')
    } else {
      revalidatePath('/admin/mentor-management')
    }

    return NextResponse.json(
      { message: 'Successfully updated the account' },
      { status: 201 },
    )
  } catch {
    return NextResponse.json(
      { message: 'Could not update user' },
      { status: 404 },
    )
  }
}
