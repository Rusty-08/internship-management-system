import { BatchStatus } from '@prisma/client'
import { isBefore, isWithinInterval } from 'date-fns'

export const calculateBatchStatus = async (
  startDate: Date,
  endDate: Date | undefined,
) => {
  let status: BatchStatus = BatchStatus.PENDING
  const now = new Date()

  if (isBefore(now, startDate)) {
    status = BatchStatus.PENDING
  } else if (
    !endDate ||
    isWithinInterval(now, { start: startDate, end: endDate })
  ) {
    status = BatchStatus.ONGOING
  } else {
    status = BatchStatus.COMPLETED
  }

  return status
}
