import { TaskStatus } from '@prisma/client'

export type FileProps = {
  id: string
  name: string | null
  url: string | null
}

export type TaskProps = {
  id: string
  title: string
  description: string
  status: TaskStatus
  startDate: Date
  endDate: Date
  files?: FileProps[]
}

export type TaskWrapperProps = {
  tasks: TaskProps[]
  isInternUser?: boolean
}
