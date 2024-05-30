import prisma from '@/lib/prisma'
import { handleFileSave, handleFileUpload } from '@/utils/fileService'
import { getCurrentUser } from '@/utils/users'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function POST(req: Request) {
  const user = await getCurrentUser()
  const { title, description, date, upload } = await req.json()

  const file = upload as File

  const taskDate = {
    startDate: new Date(date.startDate as string),
    endDate: new Date(date.endDate as string),
  }

  console.log('upload', file)
  console.log('Task Date:', taskDate)

  const metadata = { contentType: file.type }

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status: 'PENDING',
        startDate: taskDate.startDate,
        endDate: taskDate.endDate,
        mentorId: user?.id || '',
      },
    })
    const downloadURL = await handleFileUpload(file, metadata)
    await handleFileSave(file, downloadURL, user?.id || '', newTask.id)
    console.log(`New task created with ID ${newTask.id}`)
  } catch (error) {
    throw new Error('Database Error: Failed to Create Task.')
  } finally {
    prisma.$disconnect()
    revalidatePath('/mentor/tasks-management')
    redirect('/mentor/tasks-management')
  }
}
