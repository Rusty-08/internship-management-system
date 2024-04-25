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
    cell: ({ row }) => (
      <p className="text-foreground">{row.getValue('date')}</p>
    ),
  },
  {
    accessorKey: 'timeInAM',
    header: 'TIME-IN',
  },
  {
    accessorKey: 'timeOutAM',
    header: 'TIME-OUT',
  },
  {
    accessorKey: 'timeInPM',
    header: 'TIME-IN',
  },
  {
    accessorKey: 'timeOutPM',
    header: 'TIME-OUT',
  },
  {
    accessorKey: 'totalHours',
    header: 'TOTAL',
    cell: ({ row }) => (
      <p className="text-foreground">{row.getValue('totalHours')}</p>
    ),
  },
]
