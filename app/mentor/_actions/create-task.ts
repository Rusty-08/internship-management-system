'use server'

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '@/lib/firebase'
import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/utils/users'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const createTask = async (formData: FormData) => {
  const user = await getCurrentUser()
  const file = formData.get('upload') as File
  const title = formData.get('title')
  const description = formData.get('description')
  const startDate = formData.get('startDate')
  const endDate = formData.get('endDate')

  const metadata = { contentType: file.type }
  const storageRef = ref(storage, `pdf/${file.name.replace(/\s/g, '_')}`)

  const uploadTask = uploadBytesResumable(storageRef, file, metadata)

  try {
    uploadTask.on(
      'state_changed',
      snapshot => {
        // You can handle progress here if you want
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(`Upload is ${progress}% done`)
      },
      error => {
        // Handle unsuccessful uploads
        console.error(error)
      },

      async () => {
        // Handle successful uploads on complete
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        console.log('File available at', downloadURL)

        // Create a new task
        const newTask = await prisma.task.create({
          data: {
            title: title as string,
            description: description as string,
            status: 'PENDING',
            startDate: startDate as string,
            endDate: endDate as string,
            mentorId: user?.id || '', // replace with the mentor's user ID
          },
        })

        // Create a new file record associated with the task
        const newFile = await prisma.file.create({
          data: {
            name: file.name,
            url: downloadURL,
            userId: user?.id || '', // replace with the mentor's user ID
            taskId: newTask.id,
          },
        })

        console.log('New task created with ID', newTask.id)
        console.log('New file created with ID', newFile.id)
      },
    )
  } catch (error) {
    console.error(error)
  }

  revalidatePath('/mentor/tasks-management')
  redirect('/mentor/tasks-management')
}
