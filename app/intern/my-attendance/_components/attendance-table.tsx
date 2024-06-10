'use client'

import { DataTable } from '@/components/@core/ui/table/data-table'

import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { AttendanceProps, attendanceColumns } from './attendance-columns'
import { DataTablePagination } from '@/components/@core/ui/table/pagination'
import { Button } from '@/components/ui/button'
import { FormEvent, useMemo, useState } from 'react'
import { addAttendance, exportAttendance } from '@/utils/attendance'
import { useRouter } from 'next/navigation'
import { AttendanceConfirmation } from './attendance-confirmation'
import { User } from '@prisma/client'
import {
  endOfDay,
  format,
  isWithinInterval,
  parse,
  startOfMonth,
} from 'date-fns'
import { GrDocumentDownload } from 'react-icons/gr'

import { DateRangeFilter } from './data-picker'
import { useToast } from '@/components/ui/use-toast'
import { DateRange } from 'react-day-picker'

type AttendanceTableProps = {
  data: AttendanceProps[]
  user: User | null
  mode: string
  showTimeInBtn?: boolean
}

export default function AttendanceTable({
  data,
  user,
  mode,
  showTimeInBtn = true,
}: AttendanceTableProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [date, setDate] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: new Date(),
  })

  const filteredData = useMemo(() => {
    if (!date || !date.from || !date.to) {
      return data
    }

    return data.filter(attendance => {
      return isWithinInterval(attendance.date || new Date(), {
        start: date.from || new Date(),
        end: endOfDay(date.to || new Date()),
      })
    })
  }, [data, date])

  const table = useReactTable({
    data: filteredData,
    columns: attendanceColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const addCurrentAttendance = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    const res = await addAttendance(user?.id || '')
    setLoading(false)
    setIsOpen(false)
    router.refresh()

    // if (res == 201) {
    //   toast({
    //     title: `${mode} attendance successfully`,
    //     description: 'Your attendance has been successfully recorded',
    //   })
    // } else {
    //   toast({
    //     title: 'Could not save attendance',
    //     description: 'Unable to save the attendance due to unknown error',
    //     variant: 'destructive',
    //   })
    // }
  }

  const downloadAttendance = () => {
    if (!filteredData.length) {
      toast({
        title: 'Unable to export attendance',
        description: 'The attendance list is empty.',
        variant: 'destructive',
      })
    } else {
      exportAttendance(filteredData)
    }
  }

  const setIsOpenHandler = () => setIsOpen(!isOpen)

  const currentAttendance = useMemo(
    () =>
      data.find(
        attendance => attendance.date?.getDate() === new Date().getDate(),
      ),
    [data],
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <DateRangeFilter date={date} setDate={setDate} />
        <div className="flex gap-2">
          <Button variant="outline" onClick={downloadAttendance}>
            <GrDocumentDownload size="1rem" className="mr-2" />
            Export
          </Button>
          {showTimeInBtn && (
            <AttendanceConfirmation
              mode={mode}
              currentAttendance={currentAttendance}
              addCurrentAttendance={addCurrentAttendance}
              user={user}
              loading={loading}
              isOpen={isOpen}
              setIsOpenHandler={setIsOpenHandler}
            />
          )}
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
