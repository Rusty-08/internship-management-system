'use server'

import { storage } from './firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import prisma from './prisma'
import { User } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export async function uploadImage(formData: FormData): Promise<User | null> {
  const image = formData.get('image') as File
  const email = formData.get('email') as string
  const storageRef = ref(storage, `profile-images/${image.name}`)
  const metadata = { contentType: image.type }
  const uploadTask = uploadBytesResumable(storageRef, image, metadata)
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    throw new Error('User not found')
  }

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(`Upload is ${progress}% done`)
      },
      reject,
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        console.log('File available at', downloadURL)
        const updatedUser = await prisma.user.update({
          where: { email },
          data: {
            image: downloadURL,
          },
        })
        resolve(updatedUser)
        revalidatePath('/admin/intern-management')
      },
    )
  })
}
