import { getAllInternAttendance } from '@/utils/attendance'
import React from 'react'
import Attendance from './attendance'
import { getAllBatchInServer } from '@/utils/batch'

export const InternsDayAttendance = async () => {
  const allAttendance = await getAllInternAttendance()
  const allBatches = await getAllBatchInServer()

  return (
    <Attendance
      currentAttendance={allAttendance}
      recentBatch={allBatches ? allBatches[allBatches.length - 1] : undefined}
    />
  )
}
