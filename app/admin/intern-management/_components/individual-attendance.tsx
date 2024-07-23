'use client'

import {
  AttendanceProps,
  attendanceColumns,
} from '@/app/intern/my-attendance/_components/attendance-columns'
import AttendanceTable from '@/app/intern/my-attendance/_components/attendance-table'
import React from 'react'

type IndividualAttendanceProps = {
  attendance: AttendanceProps[]
  isInInternDashboard?: boolean
}

export const IndividualAttendance = ({
  attendance,
  isInInternDashboard = false,
}: IndividualAttendanceProps) => {
  const colums = isInInternDashboard
    ? attendanceColumns.slice(1, attendanceColumns.length - 1)
    : attendanceColumns.slice(1, attendanceColumns.length)

  return (
    <AttendanceTable
      data={isInInternDashboard ? attendance.slice(-5) : attendance}
      showTimeInBtn={false}
      isInDashboard={isInInternDashboard}
      attendanceColumns={colums}
    />
  )
}
