'use client'

import { DataTable } from '@/components/@core/ui/table/data-table'
import { DataTablePagination } from '@/components/@core/ui/table/pagination'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import {
  addAttendance,
  exportAttendance,
  getAttendanceMode,
} from '@/utils/attendance'
import { User } from '@prisma/client'
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  compareAsc,
  endOfDay,
  isToday,
  isWithinInterval,
  parseISO,
  startOfMonth,
} from 'date-fns'
import { useRouter } from 'next/navigation'
import { FormEvent, useCallback, useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { GrDocumentDownload } from 'react-icons/gr'
import { AttendanceProps } from './attendance-columns'
import { AttendanceConfirmation } from './attendance-confirmation'
import { DateRangeFilter } from './data-picker'
import { dateInManilaTz } from '@/utils/format-date'
import { TooltipWrapper } from '@/components/ui/tooltip'

type AttendanceTableProps = {
  data: AttendanceProps[]
  user?: User | null
  attendanceColumns: ColumnDef<AttendanceProps>[]
  showTimeInBtn?: boolean
  isInDashboard?: boolean
}

export default function AttendanceTable({
  data,
  user,
  showTimeInBtn = true,
  attendanceColumns,
  isInDashboard = false,
}: AttendanceTableProps) {
  const router = useRouter()
  const [attendanceData, setAttendanceData] = useState<AttendanceProps[]>(data)
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [date, setDate] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: new Date(),
  })

  const filteredData = useMemo(() => {
    if (!date || !date.from || !date.to) {
      return attendanceData
    }

    return attendanceData.filter(attendance => {
      return isWithinInterval(attendance.date || new Date(), {
        start: date.from || new Date(),
        end: endOfDay(date.to || new Date()),
      })
    })
  }, [attendanceData, date])

  const table = useReactTable({
    data: isInDashboard ? data : filteredData,
    columns: attendanceColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const currentAttendance = attendanceData[attendanceData.length - 1]
  const mode = getAttendanceMode(currentAttendance)

  const addCurrentAttendance = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)

    try {
      const res = await addAttendance(user?.id || '')

      if (res.success) {
        setAttendanceData([
          ...attendanceData.slice(0, attendanceData.length - 1),
          res.data,
        ])

        toast({
          title: 'Success',
          description: 'The attendance has been successfully added',
        })
      } else {
        toast({
          title: 'Error',
          description: res.error || 'Unable to save the attendance',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
      setIsOpen(false)
      router.refresh()
    }
  }

  const downloadAttendance = () => {
    // const downloadedAttendance = filteredData.sort((a, b) =>
    //   compareAsc(new Date(a.date || ''), new Date(b.date || '')),
    // )

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

  if (isInDashboard) {
    return (
      <DataTable
        columns={attendanceColumns}
        table={table}
        noRecordMessage="No attendance records yet"
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 justify-between max-w-full">
        <DateRangeFilter date={date} setDate={setDate} />
        <div className="flex gap-3 flex-shrink-0">
          <TooltipWrapper tooltip="The attendance data will depend on the selected range of date.">
            <Button
              variant="outline"
              onClick={downloadAttendance}
              className="px-4"
            >
              <GrDocumentDownload size="1rem" className="mr-2 hidden md:flex" />
              <span>Export</span>
            </Button>
          </TooltipWrapper>
          {showTimeInBtn && mode && user && (
            <div className="fixed right-0 w-full px-4 py-6 bg-background lg:p-0 lg:w-auto z-50 bottom-0 lg:right-0 lg:bottom-0 lg:relative">
              <AttendanceConfirmation
                mode={mode}
                currentAttendance={currentAttendance}
                addCurrentAttendance={addCurrentAttendance}
                user={user}
                loading={loading}
                isOpen={isOpen}
                setIsOpenHandler={setIsOpen}
              />
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="overflow-hidden">
          <DataTable
            columns={attendanceColumns}
            table={table}
            noRecordMessage="No attendance records yet"
          />
        </div>
        <div className="flex items-center justify-between py-3">
          <DataTablePagination table={table} />
        </div>
      </div>
    </div>
  )
}
