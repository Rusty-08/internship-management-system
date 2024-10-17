import { connectDB } from '@/lib/connect-db'
import prisma from '@/lib/prisma'
import { TaskStatus } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { isBefore, isWithinInterval, parseISO } from 'date-fns'

export async function PUT(
  request: Request,
  { params: { id } }: { params: { id: string } },
) {
  const {
    title,
    description,
    date: { startDate, endDate },
    fileUrl,
    fileName,
  } = await request.json()

  let status = 'PENDING' as TaskStatus
  const now = new Date()

  if (isBefore(now, startDate)) {
    status = 'PENDING'
  } else if (isWithinInterval(now, { start: startDate, end: endDate })) {
    status = 'IN_PROGRESS'
  }

  try {
    const taskUpdate = await prisma.task.findUnique({
      where: { id },
      include: { files: true },
    })

    const updated = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        status,
        startDate,
        endDate,
        files: {
          update: {
            where: { id: taskUpdate?.files[0].id },
            data: {
              name: fileName ?? taskUpdate?.files[0].name,
              url: fileUrl ?? taskUpdate?.files[0].url,
            },
          },
        },
      },
      include: {
        files: true,
      },
    })

    if (updated) {
      return NextResponse.json(
        { message: 'The task has been successfully added' },
        { status: 201 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Could not save the task' },
      { status: 404 },
    )
  } finally {
    prisma.$disconnect()
    revalidatePath('/mentor/tasks-management')
  }
}
