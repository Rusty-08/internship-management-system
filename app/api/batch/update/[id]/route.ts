import { BatchWithUsers } from '@/app/admin/internship-management/_components/batch-schema'
import prisma from '@/lib/prisma'
import { User } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function PUT(
  request: Request,
  { params: { id } }: { params: { id: string } },
) {
  const { batchName, startDate, endDate, interns } = await request.json() as z.infer<typeof BatchWithUsers>

  try {
    const batchUpdate = await prisma.batch.findUnique({
      where: { id },
    })

    if (!batchUpdate) {
      throw new Error('Task not found')
    }

    const updated = await prisma.batch.update({
      where: { id },
      data: {
        name: batchName,
        startDate,
        endDate,
      }
    })

    if (interns && interns.length > 0) {
      await Promise.all(interns.map(async ({ id, ...intern }) => {
        await prisma.user.update({
          where: { id },
          data: intern,
        })
      }))
    }

    if (updated) {
      return NextResponse.json(
        { message: 'The batch has been successfully added' },
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
