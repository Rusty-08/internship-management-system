'use client'

import {
  AttendanceProps,
  attendanceColumns,
} from '@/app/intern/my-attendance/_components/attendance-columns'
import AttendanceTable from '@/app/intern/my-attendance/_components/attendance-table'
import { DayPicker } from '@/components/@core/ui/day-picker'
import { dateInManilaTz } from '@/utils/format-date'
import { ColumnDef } from '@tanstack/react-table'
import React, { useState } from 'react'

type AdminAttendanceProps = {
  currentAttendance: AttendanceProps[]
  isInDashboard?: boolean
}

const Attendance = ({
  currentAttendance,
  isInDashboard = false,
}: AdminAttendanceProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const filteredAttendance = date
    ? currentAttendance.filter(
      attendance => dateInManilaTz(attendance.date) == dateInManilaTz(date)
    ) : []

  const dashboardAttendance = (attendance: ColumnDef<AttendanceProps>[]) => {
    const _attendance = [...attendance]
    _attendance.splice(1, 1)
    return _attendance
  }

  const attendanceCols = dashboardAttendance(attendanceColumns)

  const columns = isInDashboard
    ? attendanceCols.slice(0, attendanceCols.length - 1)
    : attendanceCols

  return (
    <div className="flex flex-col gap-4">
      {!isInDashboard && (
        <DayPicker date={date || undefined} setDate={setDate} disabled={[{ dayOfWeek: [0, 6] }]} />
      )}
      <AttendanceTable
        data={filteredAttendance}
        showTimeInBtn={false}
        isInDashboard={true}
        attendanceColumns={columns}
      />
    </div>
  )
}

export default Attendance
