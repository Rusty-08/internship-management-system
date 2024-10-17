import { handleFileUpload } from '@/utils/upload-file'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  const { upload } = await req.json()

  try {
    const file = upload as File
    const fileUrl = await handleFileUpload(file, 'tasks')

    return NextResponse.json({ fileName: file.name, fileUrl }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Could not upload the file' },
      { status: 404 },
    )
  }
}
