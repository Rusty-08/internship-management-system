'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react'
import { ComingSoon } from '../intern/chat/page'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { storage } from '@/lib/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { uploadFile } from './_actions/upload-file'

const Admin = () => {
  // return <ComingSoon pageName="Mentor Dashboard" />
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   if (!file) {
  //     alert('No file selected')
  //     return
  //   }

  //   const metadata = { contentType: file.type }
  //   const storageRef = ref(storage, `pdf/${file.name.replace(/\s/g, '_')}`)

  //   const uploadTask = uploadBytesResumable(storageRef, file, metadata)

  //   uploadTask.on(
  //     'state_changed',
  //     snapshot => {
  //       // You can handle progress here if you want
  //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       console.log(`Upload is ${progress}% done`)
  //     },
  //     error => {
  //       // Handle unsuccessful uploads
  //       console.error(error)
  //     },
  //     () => {
  //       // Handle successful uploads on complete
  //       getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
  //         console.log('File available at', downloadURL)
  //       })
  //     },
  //   )
  // }

  return (
    <form action={uploadFile}>
      <div className="space-y-1">
        <Label htmlFor="file">Attach File</Label>
        <Input
          type="file"
          id="file"
          name="upload"
          required
          onChange={handleFileChange}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  )
}

export default Admin
