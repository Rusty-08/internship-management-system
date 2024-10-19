import { z } from 'zod'

const max_Upload_Size = 5 * 1024 * 1024 // 5MB
const accepted_File_Types = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] // Add other acceptable MIME types as needed

export const TaskFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  date: z.object({
    startDate: z.date(),
    endDate: z.date(),
  }),
  files: z
    .array(z.instanceof(File))
    .nonempty({ message: 'At least one file is required' })
    .refine(
      files => files.every(file => file.size > 0),
      'Files must not be empty',
    )
    .refine(
      files => files.every(file => file.size <= max_Upload_Size),
      'Each file size must be less than 5MB',
    )
    .refine(
      files => files.every(file => !file.type.startsWith('video/')),
      'Video files are not allowed',
    ),
})

export const TaskFormEditSchema = TaskFormSchema.extend({
  files: z
    .union([z.undefined(), z.array(z.instanceof(File)), z.string()])
    .refine(
      data => {
        if (typeof data === 'string') {
          return true
        }
        return (
          data === undefined ||
          (Array.isArray(data) &&
            data.every(
              file =>
                file.size > 0 &&
                file.size <= max_Upload_Size &&
                accepted_File_Types.includes(file.type),
            ))
        )
      },
      {
        message: 'Invalid file(s)',
        path: ['upload'],
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
