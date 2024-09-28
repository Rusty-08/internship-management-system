import prisma from '@/lib/prisma'
import { UserRole } from '@prisma/client'
import { z } from 'zod'

export const RegistrationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  email: z.string().email({
    message: 'Email is not valid',
  }),
  role: z.enum(['INTERN', 'MENTOR', 'ADMIN']).optional().nullish(),
  batchId: z.string().optional(),
  isArchived: z.boolean().optional(),
  mentorId: z.string().optional(),
  expertise: z.string().optional(),
  course: z.enum(['BSIT', 'BSCS', 'BSIS']).optional(),
  totalHours: z.number().optional(),
  batch: z.string().optional(),
  assignedIntern: z.string().optional(),
})


export const InternRegistrationSchema = RegistrationSchema.extend({
  mentorId: z.string().optional(),
  course: z.string().optional(),
  totalHours: z.number().optional(),
  batch: z.string().optional(),
})

export const MentorRegistrationSchema = RegistrationSchema.extend({
  expertise: z.string().optional(),
})