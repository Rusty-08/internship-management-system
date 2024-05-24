'use server'

import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/utils/users'
import { handleFileSave, handleFileUpload } from '@/utils/fileService'

export const createTask = async (formData: FormData) => {
  const user = await getCurrentUser()
  const file = formData.get('upload') as File
  const taskTitle = formData.get('title') as string
  const taskDescription = formData.get('description') as string
  const startDate = new Date(formData.get('startDate') as string)
  const endDate = new Date(formData.get('endDate') as string)

  const metadata = { contentType: file.type }

  const newTask = await prisma.task.create({
    data: {
      title: taskTitle,
      description: taskDescription,
      status: 'PENDING',
      startDate: startDate,
      endDate: endDate,
      mentorId: user?.id || '',
    },
  })

  console.log('New task created with ID', newTask.id)

  const downloadURL = await handleFileUpload(file, metadata)
  await handleFileSave(file, downloadURL, user?.id || '', newTask.id)
}
