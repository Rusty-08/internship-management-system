'use client'

import { ColumnDef } from '@tanstack/react-table'

export type AttendanceProps = {
  date: String
  timeInAM: string | null
  timeOutAM: string | null
  timeInPM: string | null
  timeOutPM: string | null
  totalHours: string | null
}

export const attendanceColumns: ColumnDef<AttendanceProps>[] = [
  {
    accessorKey: 'date',
    header: 'DATE',
  },
  {
    accessorKey: 'timeInAM',
    header: 'TIME-IN (AM)',
  },
  {
    accessorKey: 'timeOutAM',
    header: 'TIME-OUT (AM)',
  },
  {
    accessorKey: 'timeInPM',
    header: 'TIME-IN (PM)',
  },
  {
    accessorKey: 'timeOutPM',
    header: 'TIME-OUT (PM)',
  },
  {
    accessorKey: 'totalHours',
    header: 'TOTAL',
  },
]
