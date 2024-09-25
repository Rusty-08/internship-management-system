import bcrypt from 'bcryptjs'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import generator from 'generate-password'
import sgMail from '@/components/email/send-grid'
import { NEWUSER_TEMPLATE } from '@/components/email/new-user-temp'
import { redirect } from 'next/navigation'

export async function POST(req: Request) {
  const {
    name,
    email,
    role,
    expertise,
    mentor,
    course,
    batch,
    totalHours
  } = await req.json()

  try {
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
          batchId: batch,
          course,
          totalHours,
          isArchived: false,
          mentorId: mentor || null
        },
      })
    } else {
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
          batchId: batch,
          expertise,
          isArchived: false,
        },
      })
    }

    // const msg = {
    //   to: email,
    //   from: `${process.env.SENDER_EMAIL}`,
    //   subject: 'IMS Account Registration',
    //   html: NEWUSER_TEMPLATE(password),
    // }

    // sgMail.send(msg).then(() => {
    //   console.log('Email sent')
    // }).catch((error) => {
    //   console.error(error)
    // })

    return NextResponse.json(
      { message: 'Successfully created the account' },
      { status: 201 },
    )
  } catch {
    return NextResponse.json(
      { message: 'Could not create user' },
      { status: 404 },
    )
  } finally {
    await prisma.$disconnect()
    revalidatePath(`/admin/${role.toLowerCase()}-management`)
  }
}
