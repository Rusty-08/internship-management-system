import { TaskStatus } from '@prisma/client'
import { isBefore, isWithinInterval } from 'date-fns'

export const computeTaskStatus = (startDate: Date, endDate: Date) => {
  let status: TaskStatus = 'PENDING'
  const now = new Date()

  if (isBefore(now, startDate)) {
    status = 'PENDING'
  } else if (isWithinInterval(now, { start: startDate, end: endDate })) {
    status = 'IN_PROGRESS'
  } else {
    status = 'COMPLETED'
  }

  return status
}
