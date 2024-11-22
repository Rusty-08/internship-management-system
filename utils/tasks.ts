import prisma from '@/lib/prisma'
import { getCurrentUser, getInternUsers } from './users'
import { getAllBatchInServer } from './batch'

export const getTasks = async (id: string, isMentor: boolean) => {
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

  const allBatches = await getAllBatchInServer()

  let tasks

  if (isMentor) {
    tasks = data?.tasks
  } else {
    tasks = data
      ? data?.tasks.filter(task => task.batchId === data.batchId)
      : []
  }

  return tasks
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

  if (intern?.mentorId && intern.batchId) {
    const mentor = await prisma.user.findUnique({
      where: { id: intern?.mentorId },
      include: {
        tasks: {
          where: {
            batchId: intern.batchId,
          },
          orderBy: {
            startDate: 'desc',
          },
        },
      },
    })

    // const allBatches = await getAllBatchInServer()

    // const tasks =
    //   allBatches && mentor
    //     ? mentor.tasks.filter(
    //         task => task.batchId === allBatches[allBatches?.length - 1].id,
    //       )
    //     : []

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
      intern: allInterns?.findLast(intern => intern.mentorId === mentor.id)
        ?.name,
      internBatchId: allInterns?.findLast(
        intern => intern.mentorId === mentor.id,
      )?.batchId,
      internImage: allInterns?.findLast(intern => intern.mentorId === mentor.id)
        ?.image,
      internId: allInterns?.findLast(intern => intern.mentorId === mentor.id)
        ?.id,
    }
  })

  return flattedTasks
}
