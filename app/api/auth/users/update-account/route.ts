import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function PUT(req: Request) {
  const { id, name, email, role, expertise, mentor, batch, isArchived } =
    await req.json()

  try {
    if (!id || !name || !email) {
      return NextResponse.json({ message: 'Invalid input' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: name ?? user.name,
        email: email ?? user.email,
        role: role ?? user.role,
        expertise: role === 'MENTOR' ? expertise : user.expertise,
        isArchived: isArchived || false,
        mentorId: role === 'INTERN' ? mentor : user.mentorId,
        batchId: batch,
      },
    })

    return NextResponse.json({ user: updatedUser }, { status: 200 })
  } catch {
    return NextResponse.json(
      { message: 'Could not update user' },
      { status: 404 },
    )
  } finally {
    await prisma.$disconnect()

    if (role === 'INTERN') {
      revalidatePath('/admin/intern-management')
    } else {
      revalidatePath('/admin/mentor-management')
    }
  }
}
