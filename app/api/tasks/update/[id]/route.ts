import { connectDB } from '@/lib/connect-db'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function PUT(
  request: Request,
  { params: { id } }: { params: { id: string } },
) {
  const { title, description, date, fileUrl, fileName } = await request.json()

  const taskDate = {
    startDate: new Date(date.startDate as string),
    endDate: new Date(date.endDate as string),
  }

  await connectDB()

  try {
    const taskUpdate = await prisma.task.findUnique({
      where: { id },
      include: {
        files: true,
      },
    })

    if (!taskUpdate) {
      throw new Error('Task not found')
    }

    const updated = await prisma.task.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        startDate: taskDate.startDate,
        endDate: taskDate.endDate,
        files: {
          update: {
            where: { id: taskUpdate?.files[0].id },
            data: {
              name: fileName,
              url: fileUrl,
            },
          },
        },
      },
      include: {
        files: true,
      },
    })

    console.log(title, description, taskDate, fileUrl, fileName, id)

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
