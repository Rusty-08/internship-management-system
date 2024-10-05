import prisma from '@/lib/prisma'
import { User } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import generator from 'generate-password'
import { z } from 'zod'
import { BatchWithUsers } from '@/app/admin/internship-management/_components/batch-schema'
import { calculateBatchStatus } from '@/app/admin/internship-management/_actions/actions'

export async function POST(req: Request) {
  const { batchName, startDate, endDate, interns } = await req.json() as z.infer<typeof BatchWithUsers>

  const status = await calculateBatchStatus(startDate, endDate)

  try {
    const batch = await prisma.batch.create({
      data: {
        name: batchName,
        startDate,
        endDate,
        status
      },
    })

    if (interns) {
      const password = generator.generate({
        length: 10,
        numbers: true
      })

      const hashedPassword = await bcrypt.hash(password, 10)

      const newUsers = interns.map(user => {
        return {
          ...user,
          batchId: batch.id,
          password: hashedPassword,
          role: 'INTERN',
        } as User
      })

      await prisma.user.createMany({
        data: newUsers,
      })
    }

    if (batch) {
      return NextResponse.json(
        { message: 'New Batch has been successfully added' },
        { status: 201 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Could not save the batch' },
      { status: 404 },
    )
  } finally {
    prisma.$disconnect()
    revalidatePath('/admin/internship-management')
  }
}
