import { cn } from '@/lib/utils'
import React, {
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { motion } from 'framer-motion'
import { PiUploadSimple } from 'react-icons/pi'
import { Accept, ErrorCode, FileRejection, useDropzone } from 'react-dropzone'
import { Badge } from './badge'
import Image from 'next/image'
import { Button } from './button'
import { IoCloseOutline, IoCloseSharp } from 'react-icons/io5'
import { FaRegFilePdf, FaRegFileWord } from 'react-icons/fa'
import { FiUploadCloud } from 'react-icons/fi'
import { formatFileSize } from '@/utils/format-file-size'
import useMediaQuery from '@/hooks/useMediaQuery'

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

const ERROR_MESSAGE = {
  acceptedFileType: 'The only accepted file type is image, word or pdf.',
  maxUploadSize: 'The maximum file size is only 5MB.',
  maxFiles: 'This form only accepts maximum of 5 files.',
}

const ACCEPTED_FILE_TYPES = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpeg', '.jpg'],
  'image/gif': ['.gif'],
  'image/x-icon': ['.ico'],
  'image/bmp': ['.bmp'],
  'image/tiff': ['.tiff', '.tif'],
  'image/webp': ['.webp'],
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

  const displayErrorMessage = useCallback((message: string) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(''), 5000)
  }, [])

  const handleFileChange = (newFiles: FileWithPreview[]) => {
    if (disabled) return

    if ([...files, ...newFiles].length > maxFiles) {
      displayErrorMessage(ERROR_MESSAGE.maxFiles)
      return
    }

    const validFiles = newFiles.filter(file => {
      const isValidSize = file.size <= maxUploadSize
      const isValidType =
        file.type.includes('wordprocessingml') ||
        file.type.includes('msword') ||
        file.type.includes('pdf') ||
        file.type.startsWith('image/')

      const isDuplicate = files.some(
        eFile => eFile.name === file.name && eFile.size === file.size,
      )

      if (!isValidType) displayErrorMessage(ERROR_MESSAGE.acceptedFileType)
      if (!isValidSize) displayErrorMessage(ERROR_MESSAGE.maxUploadSize)

      return isValidSize && isValidType && !isDuplicate
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

  const handleDropRejected = useCallback(
    (errors: FileRejection[]) => {
      errors.forEach(({ errors }) => {
        const code = errors[0].code

        switch (code) {
          case 'file-invalid-type':
            displayErrorMessage(ERROR_MESSAGE.acceptedFileType)
            break
          case 'file-too-large':
            displayErrorMessage(ERROR_MESSAGE.maxUploadSize)
            break
          case 'too-many-files':
            displayErrorMessage(ERROR_MESSAGE.maxFiles)
            break
          default:
            break
        }
      })
    },
    [displayErrorMessage],
  )

  const handleRemoveItem = useCallback(
    (e: MouseEvent<HTMLButtonElement>, index: number) => {
      e.stopPropagation()
      setFiles(prevFiles => {
        const updatedFiles = prevFiles.filter((_, i) => i !== index)
        onChange && onChange(updatedFiles)
        return updatedFiles
      })
    },
    [onChange],
  )

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
    // Revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(`${file.preview}`))
  }, [files])

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={() => fileInputRef.current?.click()}
        whileHover="animate"
        className="p-4 lg:p-10 group/file bg-muted/20 border-2 border-dotted border-primary/30 hover:border-primary block rounded-lg cursor-pointer w-full relative overflow-hidden"
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
        <div
          className={cn(
            'absolute opacity-0 group-hover/file:opacity-100 transition-opacity ease-in-out duration-300 inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]',
            files.length > 0 && 'opacity-100',
          )}
        >
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="relative text-center z-20 mb-4 group-hover/file:text-primary tracking-wider font-sans font-bold text-lg">
            Upload Files
          </p>
          <p className="relative z-20 text-center tracking-wide font-sans text-base">
            Drag or drop your files here or click to upload
          </p>
          <p className="relative z-20 text-center font-sans font-normal text-muted-foreground text-sm mt-2">
            It only accepts images, word or pdf files.
          </p>
          <div className="relative w-full mt-8 max-w-xl mx-auto">
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={'file' + idx}
                  layoutId={idx === 0 ? 'file-upload' : 'file-upload-' + idx}
                  className={cn(
                    'relative overflow-hidden z-40 bg-card border flex gap-4 items-center md:h-24 py-3 px-4 md:py-4 md:px-5 mt-4 w-full mx-auto rounded-md',
                    'shadow-sm',
                  )}
                >
                  {file.type.startsWith('image/') ? (
                    <div className="w-[4.25rem] hidden md:flex border overflow-hidden rounded-sm h-full">
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
                        'hidden md:flex items-center border-2 justify-center w-[4.25rem] h-full rounded-sm',
                        file.type === 'application/pdf'
                          ? 'bg-destructive/10 border-destructive/30'
                          : 'bg-primary/10 border-primary/30',
                      )}
                    >
                      {file.type === 'application/pdf' ? (
                        <FaRegFilePdf size={27} className="text-destructive" />
                      ) : (
                        <FaRegFileWord size={27} className="text-primary" />
                      )}
                    </div>
                  )}
                  <div className="flex flex-col items-start justify-end flex-grow">
                    <div className="flex justify-between w-full items-start gap-1 md:gap-4">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="relative truncate w-[8rem] md:w-[20rem]"
                      >
                        <p className="text-sm md:text-base font-medium md:max-w-xs">
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
                          {formatFileSize(file.size)}
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

                    <div className="flex items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="text-xs md:text-sm text-muted-foreground truncate max-w-[15rem]"
                      >
                        {file.type}
                      </motion.div>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="text-xs md:text-sm text-muted-foreground"
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
              className="text-destructive mt-6 text-sm"
            >
              {errorMessage}
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export function GridPattern() {
  const columns = 41
  const rows = 15
  return (
    <div className="flex bg-card flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? 'bg-gray-50 dark:bg-slate-950'
                  : 'bg-gray-50 dark:bg-slate-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]'
              }`}
            />
          )
        }),
      )}
    </div>
  )
}
