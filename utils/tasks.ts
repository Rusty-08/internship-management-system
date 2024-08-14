import prisma from '@/lib/prisma'
import { getCurrentUserMentorId, getInternUsers, getServerUserById } from './users'

const task = {
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
}

export const getTasks = async (id: string) => {
  if (!id) return null
  const data = await prisma.user.findUnique({
    where: { id },
    include: {
      tasks: {
        select: task,
      },
    }
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
  const mentorId = await getCurrentUserMentorId()
  const user = await prisma.user.findUnique({
    where: { id: mentorId },
    include: {
      tasks: true,
    },
  })

  return user?.tasks
}

export const getAllInternsTasks = async () => {
  const mentors = await prisma.user.findMany({
    where: { role: 'MENTOR' },
    include: {
      tasks: {
        select: task,
      },
      internProfile: true
    },
  })

  const allInterns = await getInternUsers()

  const flattedTasks = mentors.map(mentor => {
    return {
      ...mentor,
      intern: allInterns?.find(intern => intern.mentorId === mentor.id)?.name
    }
  })

  return flattedTasks
}
