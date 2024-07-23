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
  mode?: string
  isInDashboard?: boolean
}

export const InternAttendance = ({
  attendance,
  user,
  mode,
  isInDashboard,
}: InternAttendanceProps) => {
  return (
    <AttendanceTable
      data={attendance}
      user={user}
      mode={mode}
      isInDashboard={isInDashboard}
      attendanceColumns={attendanceColumns.slice(1, attendanceColumns.length)}
    />
  )
}
