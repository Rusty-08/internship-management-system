import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const batch = await prisma.batch.findUnique({
      where: { id },
      include: {
        interns: true
      }
    })

    if (!batch) {
      return NextResponse.json({ message: 'Cannot find the batch' }, { status: 401 })
    }

    batch.interns = batch.interns.filter(intern => !intern.isArchived)

    return NextResponse.json(batch, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Could not get the batch' },
      { status: 404 },
    )
  }
}
