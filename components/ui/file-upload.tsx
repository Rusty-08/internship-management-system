import { cn } from '@/lib/utils'
import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { PiUploadSimple } from 'react-icons/pi'
import { Accept, ErrorCode, FileRejection, useDropzone } from 'react-dropzone'
import { Badge } from './badge'
import Image from 'next/image'
import { Button } from './button'
import { IoCloseOutline, IoCloseSharp } from 'react-icons/io5'
import { FaRegFilePdf, FaRegFileWord } from 'react-icons/fa'
import { FiUploadCloud } from 'react-icons/fi'

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
}

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
}

const ACCEPTED_FILE_TYPES = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpeg', '.jpg'],
  'image/gif': ['.gif'],
  'image/x-icon': ['.ico'],
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    '.docx',
  ],
}

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024 // 5MB
const MAX_FILES = 5

type FileWithPreview = File & {
  preview?: string
}

type FileUploadProps = {
  acceptedFileTypes?: Accept
  maxUploadSize?: number
  maxFiles?: number
  disabled?: boolean
  onChange?: (files: FileWithPreview[]) => void
}

export const FileUpload = ({
  acceptedFileTypes = ACCEPTED_FILE_TYPES,
  maxUploadSize = MAX_UPLOAD_SIZE,
  maxFiles = MAX_FILES,
  disabled,
  onChange,
}: FileUploadProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (newFiles: FileWithPreview[]) => {
    if (disabled) return

    if ([...files, ...newFiles].length > maxFiles) {
      setErrorMessage('This form only accepts maximum of 5 files')
      setTimeout(() => setErrorMessage(''), 5000)
      return
    }

    const validFiles = newFiles.filter(file => {
      const isValidSize = file.size <= maxUploadSize
      const isNotVideo = !file.type.startsWith('video/')
      const isDuplicate = files.some(
        existingFile =>
          existingFile.name === file.name && existingFile.size === file.size,
      )

      return isValidSize && isNotVideo && !isDuplicate
    })

    const filesWithPreviews = validFiles.map(file =>
      Object.assign(file, { preview: URL.createObjectURL(file) }),
    )

    setFiles(prevFiles => {
      const updatedFiles = [...prevFiles, ...filesWithPreviews]
      onChange && onChange(updatedFiles)
      return updatedFiles
    })
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleDropRejected = (errors: FileRejection[]) => {
    for (let messages of errors) {
      const code = messages.errors[0].code as ErrorCode

      switch (code) {
        case 'file-invalid-type':
          setErrorMessage('The only accepted file type is image, word or pdf')
          break
        case 'file-too-large':
          setErrorMessage('The maximum file size is only 5MB')
          break
        case 'too-many-files':
          setErrorMessage('This form only accepts maximum of 5 files')
          break
        default:
          break
      }
    }

    setTimeout(() => setErrorMessage(''), 5000)
  }

  const handleRemoveItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    e.stopPropagation()
    setFiles(prevFiles => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index)
      onChange && onChange(updatedFiles)
      return updatedFiles
    })
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    noClick: false,
    maxFiles: maxFiles,
    maxSize: maxUploadSize,
    accept: acceptedFileTypes,
    onDrop: handleFileChange,
    onDropRejected: handleDropRejected,
  })

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(`${file.preview}`))
  }, [files])

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-10 group/file bg-card border-2 border-dotted border-primary/30 hover:border-primary block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          {...getInputProps}
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={e => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
          disabled={disabled}
        />
        {/* <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div> */}
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 tracking-wider font-sans font-bold text-base">
            Drag or drop your files here or click to upload
          </p>
          <p className="relative z-20 font-sans font-normal text-muted-foreground text-sm mt-2">
            It only accepts images, word or pdf files.
          </p>
          <div className="relative w-full mt-8 max-w-xl mx-auto">
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={'file' + idx}
                  layoutId={idx === 0 ? 'file-upload' : 'file-upload-' + idx}
                  className={cn(
                    'relative overflow-hidden z-40 bg-card border flex gap-4 items-center md:h-24 p-4 px-5 mt-4 w-full mx-auto rounded-md',
                    'shadow-sm',
                  )}
                >
                  {file.type.startsWith('image/') ? (
                    <div className="w-[4.25rem] border overflow-hidden rounded-sm h-full">
                      <Image
                        src={`${file.preview}`}
                        alt={file.name}
                        height={40}
                        width={40}
                        className="object-cover h-full mx-auto w-auto"
                        onLoad={() => {
                          URL.revokeObjectURL(`${file.preview}`)
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      className={cn(
                        'flex items-center border justify-center w-[4.25rem] h-full rounded-sm',
                        file.type === 'application/pdf'
                          ? 'bg-destructive/10 border-destructive/30'
                          : 'bg-primary/10 border-primary/30',
                      )}
                    >
                      {file.type === 'application/pdf' ? (
                        <FaRegFilePdf size={30} className="text-destructive" />
                      ) : (
                        <FaRegFileWord size={30} className="text-primary" />
                      )}
                    </div>
                  )}
                  <div className="flex flex-col items-start justify-end flex-grow">
                    <div className="flex justify-between w-full items-start gap-4">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="relative truncate w-[20rem]"
                      >
                        <p className="text-base font-medium max-w-xs">
                          {file.name}
                        </p>
                        <div className="absolute right-0 top-0 h-8 w-4 bg-gradient-to-l from-card to-transparent" />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="flex items-center gap-2"
                      >
                        <Badge
                          variant="outline-primary"
                          className="font-medium"
                        >
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </Badge>
                        <Button
                          variant="outline-destructive"
                          className="h-6 w-6 p-0"
                          size="circle"
                          type="button"
                          onClick={e => handleRemoveItem(e, idx)}
                          disabled={disabled}
                        >
                          <IoCloseSharp size="1.1rem" />
                        </Button>
                      </motion.div>
                    </div>

                    <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="text-sm text-muted-foreground truncate max-w-[15rem]"
                      >
                        {file.type}
                      </motion.div>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="text-sm text-muted-foreground"
                      >
                        modified{' '}
                        {new Date(file.lastModified).toLocaleDateString()}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              ))}
            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  'relative group-hover/file:shadow-2xl z-40 bg-muted/50 group-hover/file:bg-muted backdrop-blur-sm flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md',
                  'shadow-[0px_10px_50px_rgba(0,0,0,0.1)]',
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col gap-1 items-center"
                  >
                    Drop it
                    <FiUploadCloud
                      size="2rem"
                      className="group-hover/file:text-primary"
                    />
                  </motion.p>
                ) : (
                  <FiUploadCloud
                    size="2rem"
                    className="group-hover/file:text-primary"
                  />
                )}
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute opacity-0 border-2 border-dotted border-primary inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
              ></motion.div>
            )}
          </div>

          {errorMessage && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              layout
              className="text-destructive mt-4 text-sm"
            >
              {errorMessage}
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  )
}

// export function GridPattern() {
//   const columns = 41
//   const rows = 15
//   return (
//     <div className="flex bg-card flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
//       {Array.from({ length: rows }).map((_, row) =>
//         Array.from({ length: columns }).map((_, col) => {
//           const index = row * columns + col
//           return (
//             <div
//               key={`${col}-${row}`}
//               className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${
//                 index % 2 === 0
//                   ? 'bg-gray-50 dark:bg-slate-950'
//                   : 'bg-gray-50 dark:bg-slate-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]'
//               }`}
//             />
//           )
//         }),
//       )}
//     </div>
//   )
// }
