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
  date: z.object({
    startDate: z.date(),
    endDate: z.date(),
  }),
  upload: z
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

export const TaskFormEditSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  date: z.object({
    startDate: z.date(),
    endDate: z.date(),
  }),
  upload: z.union([z.undefined(), z.instanceof(File), z.string()]).refine(
    data => {
      if (typeof data === 'string') {
        // If data is a string, it should be a URL, so we don't need to validate it further
        return true
      }
      // If data is a File, we validate it as before
      return (
        data === undefined ||
        (data.size > 0 &&
          data.size <= max_Upload_Size &&
          accepted_File_Types.includes(data.type))
      )
    },
    {
      // Custom error messages for each validation
      message: 'Invalid file',
      path: ['upload'], // Path of the field in the data
    },
  ),
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
