import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { name, startDate, endDate } = await req.json()

  try {
    const batch = await prisma.batch.create({
      data: {
        name,
        startDate,
        endDate
      },
    })

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
