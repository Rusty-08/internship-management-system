'use client'

import { DataTable } from '@/components/@core/table/data-table'

import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { AttendanceProps, attendanceColumns } from './attendance-columns'
import { DataTablePagination } from '@/components/@core/table/pagination'
import { Button } from '@/components/ui/button'
import { CustomIcon } from '@/components/@core/iconify'
import DatePicker from 'react-datepicker'
import { useState } from 'react'
import { addAttendance } from '@/utils/attendance'
import { LoadingSpinner } from '@/components/@core/spinner/circular'
import { useRouter } from 'next/navigation'

export default function AttendanceTable({
  data,
  email,
}: {
  data: AttendanceProps[]
  email: string
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [startDate, setStartDate] = useState(new Date())

  const table = useReactTable({
    data,
    columns: attendanceColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const addCurrentAttendance = async () => {
    setLoading(true)
    await addAttendance(email)
    setLoading(false)
    router.refresh()
  }

  return (
    <div className="py-5">
      <div className="flex justify-between mb-4">
        <DatePicker
          showIcon
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          dateFormat="MMMM, yyyy"
          icon={
            <CustomIcon icon="solar:calendar-bold-duotone" className="ml-2" />
          }
          showMonthYearPicker
          className="border rounded-md focus:border-primary focus:outline-none bg-transparent w-[13.4rem]"
          showFullMonthYearPicker
          showTwoColumnMonthYearPicker
          popperPlacement="bottom-start"
        />
        <div className="flex gap-2">
          <Button variant="outline">
            <CustomIcon icon="clarity:export-line" className="mr-2" />
            Export
          </Button>
          <Button className="w-32" onClick={addCurrentAttendance}>
            {loading ? <LoadingSpinner /> : 'Time In'}
          </Button>
        </div>
      </div>
      <div>
        <div className="rounded-md border overflow-hidden">
          <DataTable columns={attendanceColumns} table={table} />
        </div>
        <div className="flex items-center justify-between py-3">
          <DataTablePagination table={table} />
        </div>
      </div>
    </div>
  )
}
