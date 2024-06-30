import { File, Submission, Task, TaskStatus } from '@prisma/client'

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
  tasks?: Task[]
  search?: string
  status?: string
  isMentoshipRole?: boolean
  mentorId?: string
}

export type TaskMode = 'view-details' | 'view-submission' | 'submit-output'
