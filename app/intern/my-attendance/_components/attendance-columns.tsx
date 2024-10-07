'use client'

import { siteConfig } from '@/configs/site'
import { formatHours } from '@/utils/attendance'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'

export type AttendanceProps = {
  name?: String | null
  date: Date | null
  timeInAM: Date | null
  timeOutAM: Date | null
  timeInPM: Date | null
  timeOutPM: Date | null
  totalHours: number | null
}

export const attendanceColumns: ColumnDef<AttendanceProps>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <p className="text-foreground font-medium text-nowrap">
        {row.getValue('name')}
      </p>
    ),
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => (
      <p className="text-foreground text-nowrap">
        {format(row.getValue('date'), 'EEE, MMM dd')}
      </p>
    ),
  },
  {
    accessorKey: 'timeInAM',
    header: 'Time In',
    cell: ({ row }) => {
      const timeInAM = row.getValue('timeInAM') as Date
      return (
        <span className="text-nowrap">
          {timeInAM ? formatInTimeZone(timeInAM, siteConfig.timeZone, 'hh:mm aa') : ''}
        </span>
      )
    },
  },
  {
    accessorKey: 'timeOutAM',
    header: 'Time Out',
    cell: ({ row }) => {
      const timeOutAM = row.getValue('timeOutAM') as Date
      return (
        <span className="text-nowrap">
          {timeOutAM ? formatInTimeZone(timeOutAM, siteConfig.timeZone, 'hh:mm aa') : ''}
        </span>
      )
    },
  },
  {
    accessorKey: 'timeInPM',
    header: 'Time In',
    cell: ({ row }) => {
      const timeInPM = row.getValue('timeInPM') as Date
      return (
        <span className="text-nowrap">
          {timeInPM ? formatInTimeZone(timeInPM, siteConfig.timeZone, 'hh:mm aa') : ''}
        </span>
      )
    },
  },
  {
    accessorKey: 'timeOutPM',
    header: 'Time Out',
    cell: ({ row }) => {
      const timeOutPM = row.getValue('timeOutPM') as Date
      return (
        <span className="text-nowrap">
          {timeOutPM ? formatInTimeZone(timeOutPM, siteConfig.timeZone, 'hh:mm aa') : ''}
        </span>
      )
    },
  },
  {
    accessorKey: 'totalHours',
    header: 'Total Hours',
    cell: ({ row }) => {
      const ThirtySecs = 0.008
      const total = row.getValue('totalHours') as number

      return (
        <span className="text-foreground text-nowrap">
          {formatHours(total)}
        </span>
      )
    },
  },
]
