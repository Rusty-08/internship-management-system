import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/utils/users'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const user = await getCurrentUser()
  const { title, description, date, fileUrl, fileName } = await req.json()

  const taskDate = {
    startDate: new Date(date.startDate as string),
    endDate: new Date(date.endDate as string),
  }

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status: 'PENDING',
        startDate: taskDate.startDate,
        endDate: taskDate.endDate,
        mentorId: user?.id || '',
      },
    })

    const task = await prisma.file.create({
      data: {
        name: fileName,
        url: fileUrl,
        userId: user?.id || '',
        taskId: newTask.id,
      },
    })

    if (task) {
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
