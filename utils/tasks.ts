import prisma from '@/lib/prisma'
import { getCurrentUser, getInternUsers } from './users'

export const getTasks = async (id: string) => {
  if (!id) return null
  const data = await prisma.user.findUnique({
    where: { id },
    include: {
      tasks: {
        include: {
          files: true,
          submissions: true,
        },
      },
    },
  })

  return data?.tasks || []
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
  const intern = await getCurrentUser()

  if (intern?.mentorId) {
    const mentor = await prisma.user.findUnique({
      where: { id: intern?.mentorId },
      include: {
        tasks: {
          orderBy: {
            startDate: 'desc',
          },
        },
      },
    })

    return mentor?.tasks
  }
  return null
}

export const getAllInternsTasks = async () => {
  const mentors = await prisma.user.findMany({
    where: { role: 'MENTOR' },
    include: {
      tasks: {
        include: {
          files: true,
          submissions: true,
        },
      },
      internProfile: true,
    },
  })

  const allInterns = await getInternUsers()

  const flattedTasks = mentors.map(mentor => {
    return {
      ...mentor,
      intern: allInterns?.find(intern => intern.mentorId === mentor.id)?.name,
      internImage: allInterns?.find(intern => intern.mentorId === mentor.id)
        ?.image,
      internId: allInterns?.find(intern => intern.mentorId === mentor.id)?.id,
    }
  })

  return flattedTasks
}
