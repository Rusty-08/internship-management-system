'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/utils/users'
import { handleFileSave, handleFileUpload } from '@/utils/fileService'
import { TaskFormSchema } from '../_components/task-schema'
import { z } from 'zod'

const CreateTask = TaskFormSchema.omit({ id: true })

export const createNewTask = async (
  prevState: any,
  values: z.infer<typeof TaskFormSchema>,
) => {
  const user = await getCurrentUser()
  const { title, description, date, upload } = values

  // const validateFields = CreateTask.safeParse({
  //   title: formData.get('title'),
  //   description: formData.get('description'),
  //   startDate: new Date(formData.get('startDate') as string),
  //   endDate: new Date(formData.get('endDate') as string),
  //   upload: formData.get('upload'),
  // })

  // if (!validateFields.success) {
  //   const errorMessages = validateFields.error.flatten().fieldErrors
  //   const serverErrors = Object.keys(errorMessages).reduce((errors, key) => {
  //     const errorMessage = errorMessages[key as keyof typeof errorMessages]
  //     return errorMessage ? { ...errors, [key]: errorMessage[0] } : errors
  //   }, {})
  //   throw new Error(JSON.stringify(serverErrors))
  // }

  // const { title, description, startDate, endDate, upload } = validateFields.data

  const file = upload as File

  const metadata = { contentType: file.type }

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status: 'PENDING',
        startDate: date.startDate,
        endDate: date.endDate,
        mentorId: user?.id || '',
      },
    })
    const downloadURL = await handleFileUpload(file, metadata)
    await handleFileSave(file, downloadURL, user?.id || '', newTask.id)
    console.log(`New task created with ID ${newTask.id}`)
  } catch (error) {
    throw new Error('Database Error: Failed to Create Task.')
  } finally {
    revalidatePath('/mentor/tasks-management')
    redirect('/mentor/tasks-management')
  }
}
