import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { taskId, fileName, fileUrl } = await req.json()

  try {
    const taskSubmission = await prisma.submission.create({
      data: {
        name: fileName,
        url: fileUrl,
        taskId,
      },
    })

    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        status: 'COMPLETED',
      },
    })

    if (taskSubmission) {
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
