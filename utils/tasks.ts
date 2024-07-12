import prisma from '@/lib/prisma'
import { getCurrentUser, getCurrentUserMentorId } from './users'

export const getTasks = async (id: string, tasks?: string, status?: string) => {
  if (!id) return null
  const data = await prisma.user.findUnique({
    where: { id },
    include: {
      tasks: {
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          startDate: true,
          endDate: true,
          mentorId: true,
          files: {
            select: {
              id: true,
              name: true,
              url: true,
              userId: true,
              taskId: true,
            },
          },
          submissions: {
            select: {
              id: true,
              name: true,
              url: true,
              date: true,
              taskId: true,
            },
          },
        },
      },
    },
  })

  let filteredTasks = data?.tasks

  if (tasks) {
    filteredTasks = filteredTasks?.filter(task =>
      task.title.toLowerCase().includes(tasks.toLowerCase()),
    )
  }

  if (status) {
    filteredTasks = filteredTasks?.filter(task =>
      task.status.toLowerCase().includes(status.toLowerCase()),
    )
  }

  return { tasks: filteredTasks }
}

export const getTaskById = async (id: string) => {
  if (id === 'create-task') return null

  const taskData = await prisma.task.findUnique({
    where: { id },
    include: {
      files: true,
    },
  })
  return {
    id: taskData?.id,
    title: taskData?.title || '',
    description: taskData?.description || '',
    date: {
      startDate: taskData?.startDate || new Date(),
      endDate: taskData?.endDate || new Date(),
    },
    upload: undefined,
  }
}

export const getCurrentUserTasks = async () => {
  const mentorId = await getCurrentUserMentorId()
  const user = await prisma.user.findUnique({
    where: { id: mentorId },
    include: {
      tasks: true,
    },
  })

  return user?.tasks
}
