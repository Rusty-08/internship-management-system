import { AttendanceProps } from '@/app/intern/my-attendance/_components/attendance-columns'

export type UserSubset = {
  id: string | null
  image: string | null
  name: string | null
  email: string | null
  course?: string | null
  totalHours?: number | null
  attendance?: AttendanceProps[] | null
  role: string | null
  expertise?: string | null
  batch?: string | null
  mentor?: string | null
  mentorId?: string | null
  assignedIntern?: string | null
  isArchived?: boolean | null
  isActive?: boolean | null
  createdAt?: Date | null
}
