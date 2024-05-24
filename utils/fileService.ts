import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '@/lib/firebase'
import prisma from '@/lib/prisma'

export const handleFileUpload = async (
  file: File,
  metadata: { contentType: string },
) => {
  const storageRef = ref(storage, `pdf/${file.name.replace(/\s/g, '_')}`)
  const uploadTask = uploadBytesResumable(storageRef, file, metadata)

  return new Promise<string>((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(`Upload is ${progress}% done`)
      },
      error => {
        console.error(error)
        reject(error)
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        console.log('File available at', downloadURL)
        resolve(downloadURL)
      },
    )
  })
}

export const handleFileSave = async (
  file: File,
  downloadURL: string,
  userId: string,
  taskId: string,
) => {
  const newFile = await prisma.file.create({
    data: {
      name: file.name,
      url: downloadURL,
      userId,
      taskId,
    },
  })
  return newFile
}
