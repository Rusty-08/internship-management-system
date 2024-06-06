import { z } from 'zod'

const max_Upload_Size = 1024 * 1024 * 5 // 5MB
const accepted_File_Types = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

export const TaskFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  startDate: z.date(),
  endDate: z.date(),
  upload: z
    .instanceof(File)
    .optional()
    .refine(file => {
      return !file || file.size <= max_Upload_Size
    }, 'File size must be less than 5MB')
    .refine(file => {
      return !file || accepted_File_Types.includes(file.type)
    }, 'File must be a PDF or Word document'),
})

export const SubmissionSchema = z.object({
  file: z
    .union([z.undefined(), z.instanceof(File)])
    .refine(file => {
      return file !== undefined
    }, 'File is required')
    .refine(file => {
      return file === undefined || file.size > 0
    }, 'File must not be empty')
    .refine(file => {
      return file === undefined || file.size <= max_Upload_Size
    }, 'File size must be less than 5MB')
    .refine(file => {
      return file === undefined || accepted_File_Types.includes(file.type)
    }, 'File must be a PDF or Word document'),
})
