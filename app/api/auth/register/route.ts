import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import { connectDB } from '@/lib/connect-db'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Invalid input' }, { status: 400 })
    }

    await connectDB()

    const taken = await prisma.user.findUnique({ where: { email } })

    if (taken) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 },
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        name: name ?? 'Anonymous',
        email: email,
        password: hashedPassword,
        role: role ?? 'USER',
      },
    })

    console.log('User created:', user)

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
