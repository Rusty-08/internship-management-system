'use client'

import { formatHours } from '@/utils/attendance'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

export type AttendanceProps = {
  date: Date | null
  timeInAM: Date | null
  timeOutAM: Date | null
  timeInPM: Date | null
  timeOutPM: Date | null
  totalHours: number | null
}

export const attendanceColumns: ColumnDef<AttendanceProps>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => (
      <p className="text-foreground">
        {format(row.getValue('date'), 'EEE, MMM dd')}
      </p>
    ),
  },
  {
    accessorKey: 'timeInAM',
    header: 'Time In',
    cell: ({ row }) => {
      const timeInAM = row.getValue('timeInAM') as Date
      return <span>{timeInAM ? format(timeInAM, 'hh:mm aa') : ''}</span>
    },
  },
  {
    accessorKey: 'timeOutAM',
    header: 'Time Out',
    cell: ({ row }) => {
      const timeInAM = row.getValue('timeOutAM') as Date
      return <span>{timeInAM ? format(timeInAM, 'hh:mm aa') : ''}</span>
    },
  },
  {
    accessorKey: 'timeInPM',
    header: 'Time In',
    cell: ({ row }) => {
      const timeInAM = row.getValue('timeInPM') as Date
      return <span>{timeInAM ? format(timeInAM, 'hh:mm aa') : ''}</span>
    },
  },
  {
    accessorKey: 'timeOutPM',
    header: 'Tim Out',
    cell: ({ row }) => {
      const timeInAM = row.getValue('timeOutPM') as Date
      return <span>{timeInAM ? format(timeInAM, 'hh:mm aa') : ''}</span>
    },
  },
  {
    accessorKey: 'totalHours',
    header: 'Total Hours',
    cell: ({ row }) => {
      const total = row.getValue('totalHours') as number
      return <span>{formatHours(total)}</span>
    },
  },
]
