import bcrypt from 'bcryptjs'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import generator from 'generate-password'
import sgMail from '@/components/email/send-grid'
import { NEWUSER_TEMPLATE } from '@/components/email/new-user-temp'

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

    const password = generator.generate({
      length: 10,
      numbers: true
    })

    const hashedPassword = await bcrypt.hash(password, 10)

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

    const msg = {
      to: email,
      from: `${process.env.SENDER_EMAIL}`,
      subject: 'IMS Account Registration',
      html: NEWUSER_TEMPLATE(password),
    }

    sgMail.send(msg).then(() => {
      console.log('Email sent')
    }).catch((error) => {
      console.error(error)
    })

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
