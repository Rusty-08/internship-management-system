'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { isBefore, isWithinInterval, parseISO } from 'date-fns'
import { TaskFormSchema } from './../../../../components/@core/tasks/task-schema'
import { z } from 'zod'
import { TaskStatus } from '@prisma/client'
// import { handleFileUpload } from '@/utils/upload-file'
// import { auth } from '@/auth'

interface UpdateTaskType extends z.infer<typeof TaskFormSchema> {
  fileName?: string | null
  fileUrl?: string | null
}

interface AddTaskType extends z.infer<typeof TaskFormSchema> {
  fileName: string | null
  fileUrl: string | null
}

export const updateTask = async (data: UpdateTaskType, id: string) => {
  const {
    title,
    description,
    date: { startDate, endDate },
    fileName,
    fileUrl,
  } = data

  console.log(data)

  let status: TaskStatus = 'PENDING'
  const now = new Date()

  if (isBefore(now, startDate)) {
    status = 'PENDING'
  } else if (isWithinInterval(now, { start: startDate, end: endDate })) {
    status = 'IN_PROGRESS'
  } else {
    status = 'COMPLETED'
  }

  try {
    const updated = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        status,
        startDate,
        endDate,
      },
      include: {
        files: true,
      },
    })

    if (fileUrl) {
      // const file = upload as File
      // const fileUrl = await handleFileUpload(file, 'tasks')

      await prisma.file.update({
        where: { id: updated.files[0].id },
        data: {
          name: fileName ?? '',
          url: fileUrl ?? '',
        },
      })
    }

    if (updated) return updated
  } catch (error) {
    console.log('Unable to update the task')
  } finally {
    revalidatePath('/mentor/tasks-management')
  }
}

export const addTask = async (data: AddTaskType) => {
  console.log(data)

  // const session = await auth()
  const userId = '668d454b35b9bd89a7355d0f'

  const {
    title,
    description,
    date,
    fileName,
    fileUrl,
    // upload,
  } = data

  console.log(data)

  let status = 'PENDING' as TaskStatus
  const now = new Date()

  if (isBefore(now, date.startDate)) {
    status = 'PENDING'
  } else if (
    isWithinInterval(now, { start: date.startDate, end: date.endDate })
  ) {
    status = 'IN_PROGRESS'
  }

  try {
    console.log('user detected')

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        startDate: date.startDate,
        endDate: date.endDate,
        mentorId: userId,
      },
    })

    // const file = upload as File
    // const fileUrl = await handleFileUpload(file, 'tasks')

    await prisma.file.create({
      data: {
        name: fileName ?? '',
        url: fileUrl ?? '',
        userId: userId,
        taskId: newTask.id,
      },
    })
  } catch (error) {
    console.log(error)
  } finally {
    revalidatePath('/mentor/tasks-management')
  }
}
