import { getAllInternAttendance } from '@/utils/attendance'
import React from 'react'
import Attendance from './_components/attendance'

export const revalidate = 3600 // revalidate at most every hour

const InternsAttendance = async () => {
  const allAttendance = await getAllInternAttendance()
  const currentAttendance = allAttendance.flatMap(attendance => attendance)
  
  return <Attendance currentAttendance={currentAttendance} />
}

export default InternsAttendance
