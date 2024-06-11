import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '@/lib/firebase'

export const handleFileUpload = async (file: File, folder: string) => {
  if (!file) return
  const metadata = { contentType: file.type }
  const storageRef = ref(storage, `${folder}/${file.name.replace(/\s/g, '_')}`)
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
