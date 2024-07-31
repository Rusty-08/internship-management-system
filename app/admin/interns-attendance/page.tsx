import { getAllInternAttendance } from '@/utils/attendance'
import React from 'react'
import Attendance from './_components/attendance'
import { toZonedTime } from 'date-fns-tz'
import { siteConfig } from '@/configs/site'

export const revalidate = 3600 // revalidate at most every hour

const InternsAttendance = async () => {
  const allAttendance = await getAllInternAttendance()
  const currentAttendance = allAttendance.flatMap(attendance => attendance)
  
  const date = new Date()
  const currentDate = toZonedTime(date, siteConfig.timeZone)

  return <Attendance currentAttendance={currentAttendance} currentDate={currentDate} />
}

export default InternsAttendance
