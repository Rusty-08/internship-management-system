import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/utils/users'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { isBefore, isWithinInterval, parseISO } from 'date-fns'
import { TaskStatus } from '@prisma/client'
import { getAllBatchInServer } from '@/utils/batch'

export async function POST(req: Request) {
  const user = await getCurrentUser()
  const allBatches = await getAllBatchInServer()

  const { title, description, date, filesData, fileUrl, fileName } =
    await req.json()

  const taskDate = {
    startDate: parseISO(date.startDate as string),
    endDate: parseISO(date.endDate as string),
  }

  let status = 'PENDING' as TaskStatus
  const now = new Date()

  if (isBefore(now, taskDate.startDate)) {
    status = 'PENDING'
  } else if (
    isWithinInterval(now, { start: taskDate.startDate, end: taskDate.endDate })
  ) {
    status = 'IN_PROGRESS'
  }

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        startDate: taskDate.startDate,
        endDate: taskDate.endDate,
        mentorId: user?.id || '',
        batchId: allBatches ? allBatches[allBatches.length - 1].id : '',
      },
    })

    for (let file of filesData) {
      await prisma.file.create({
        data: {
          name: file.fileName,
          url: file.fileUrl,
          userId: user?.id || '',
          taskId: newTask.id,
        },
      })
    }

    if (newTask) {
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
