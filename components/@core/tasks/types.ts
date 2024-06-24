import { File, TaskStatus, Submission } from '@prisma/client'

export type TaskProps = {
  id: string
  title: string
  description: string
  status: TaskStatus
  startDate: Date
  endDate: Date
  files?: File[]
  submissions?: Submission[]
}

export type TaskWrapperProps = {
  tasks: TaskProps[]
  search?: string
  isInternUser?: boolean
}

export type TaskMode = 'view-details' | 'view-submission' | 'submit-output'
