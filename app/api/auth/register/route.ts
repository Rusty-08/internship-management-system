import bcrypt from 'bcryptjs'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

export async function POST(req: Request) {
  try {
    const { name, email, role, expertise, mentor, course, totalHours } =
      await req.json()

    if (!name || !email) {
      return NextResponse.json({ message: 'Invalid input' }, { status: 400 })
    }

    const taken = await prisma.user.findUnique({ where: { email } })

    if (taken) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 },
      )
    }

    const hashedPassword = await bcrypt.hash('@default123', 10)

    let user

    if (role === 'INTERN') {
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
          course,
          totalHours,
          isArchived: false,
          internProfile: mentor
            ? {
                create: {
                  mentorId: mentor,
                },
              }
            : undefined,
        },
      })
    } else {
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
          expertise,
          isArchived: false,
        },
      })
    }

    if (role === 'INTERN') {
      revalidatePath('/admin/intern-management')
    } else {
      revalidatePath('/admin/mentor-management')
    }
    return NextResponse.json({ user }, { status: 201 })
  } catch {
    return NextResponse.json(
      { message: 'Could not create user' },
      { status: 404 },
    )
  } finally {
    await prisma.$disconnect()
  }
}
