import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function PUT(
  request: Request,
  { params: { id } }: { params: { id: string } },
) {
  const { name, startDate, endDate } = await request.json()

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
        name,
        startDate,
        endDate
      }
    })

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
