'use client'

import {
  AttendanceProps,
  attendanceColumns,
} from '@/app/intern/my-attendance/_components/attendance-columns'
import AttendanceTable from '@/app/intern/my-attendance/_components/attendance-table'
import { User } from '@prisma/client'
import React from 'react'

type InternAttendanceProps = {
  attendance: AttendanceProps[]
  user?: User | null
  isInDashboard?: boolean
}

export const InternAttendance = ({
  attendance,
  user,
  isInDashboard,
}: InternAttendanceProps) => {
  return (
    <AttendanceTable
      data={attendance}
      user={user}
      isInDashboard={isInDashboard}
      attendanceColumns={attendanceColumns.slice(1, attendanceColumns.length)}
    />
  )
}
