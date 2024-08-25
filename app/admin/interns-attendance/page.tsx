import { getAllInternAttendance } from '@/utils/attendance'
import React from 'react'
import Attendance from './_components/attendance'

export const revalidate = 3600 // revalidate at most every hour

const InternsAttendance = async () => {
  const allAttendance = await getAllInternAttendance()

  return <Attendance currentAttendance={allAttendance} />
}

export default InternsAttendance
