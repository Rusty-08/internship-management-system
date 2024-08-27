import { getAllInternAttendance } from '@/utils/attendance'
import React from 'react'
import Attendance from './attendance'

export const InternsDayAttendance = async () => {
  const allAttendance = await getAllInternAttendance()

  return <Attendance currentAttendance={allAttendance} />
}
