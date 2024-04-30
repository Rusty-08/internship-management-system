'use client'

import { ColumnDef } from '@tanstack/react-table'

export type AttendanceProps = {
  date: string
  timeInAM: string | null
  timeOutAM: string | null
  timeInPM: string | null
  timeOutPM: string | null
  totalHours: string | null
}

export const attendanceColumns: ColumnDef<AttendanceProps>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => (
      <p className="text-foreground">{row.getValue('date')}</p>
    ),
  },
  {
    accessorKey: 'timeInAM',
    header: 'Time In',
  },
  {
    accessorKey: 'timeOutAM',
    header: 'Time Out',
  },
  {
    accessorKey: 'timeInPM',
    header: 'Time In',
  },
  {
    accessorKey: 'timeOutPM',
    header: 'Tim Out',
  },
  {
    accessorKey: 'totalHours',
    header: 'Total Hours',
    cell: ({ row }) => (
      <p className="text-foreground">{row.getValue('totalHours')}</p>
    ),
  },
]
