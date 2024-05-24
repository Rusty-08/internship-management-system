'use server'

import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/utils/users'
import { handleFileSave, handleFileUpload } from '@/utils/fileService'
import { z } from 'zod'

const max_Upload_Size = 1024 * 1024 * 5 // 5MB
const accepted_File_Types = ['application/pdf', 'application/msword']

const taskSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  startDate: z.date(),
  endDate: z.date(),
  upload: z
    .instanceof(File)
    .optional()
    .refine(file => {
      return !file || file.size <= max_Upload_Size
    }, 'File size must be less than 5MB')
    .refine(file => {
      return !file || accepted_File_Types.includes(file.type)
    }, 'File must be a PDF or Word document'),
})

export const createTask = async (formData: FormData) => {
  const user = await getCurrentUser()

  const taskData = taskSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    startDate: new Date(formData.get('startDate') as string),
    endDate: new Date(formData.get('endDate') as string),
    upload: formData.get('upload'),
  })

  if (!taskData.success) {
    const errorMessages = taskData.error.flatten().fieldErrors
    const serverErrors = Object.keys(errorMessages).reduce((errors, key) => {
      const errorMessage = errorMessages[key as keyof typeof errorMessages]
      return errorMessage ? { ...errors, [key]: errorMessage[0] } : errors
    }, {})
    throw new Error(JSON.stringify(serverErrors))
  }

  const { title, description, startDate, endDate, upload } = taskData.data

  const file = upload as File
  const taskTitle = title
  const taskDescription = description
  const taskStartDate = startDate
  const taskEndDate = endDate

  const metadata = { contentType: file.type }

  const newTask = await prisma.task.create({
    data: {
      title: taskTitle,
      description: taskDescription,
      status: 'PENDING',
      startDate: taskStartDate,
      endDate: taskEndDate,
      mentorId: user?.id || '',
    },
  })

  console.log('New task created with ID', newTask.id)

  const downloadURL = await handleFileUpload(file, metadata)
  await handleFileSave(file, downloadURL, user?.id || '', newTask.id)
}
