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
    filesData,
  } = await request.json()

  let status = 'PENDING' as TaskStatus
  const now = new Date()

  if (isBefore(now, startDate)) {
    status = 'PENDING'
  } else if (isWithinInterval(now, { start: startDate, end: endDate })) {
    status = 'IN_PROGRESS'
  }

  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        status,
        startDate,
        endDate,
      },
    })

    await prisma.file.deleteMany({
      where: { taskId: id },
    })

    for (let file of filesData) {
      await prisma.file.create({
        data: {
          name: file.fileName,
          url: file.fileUrl,
          userId: updatedTask.mentorId || '',
          taskId: updatedTask.id,
        },
      })
    }

    if (updatedTask) {
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
