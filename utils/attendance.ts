import { AttendanceProps } from '@/app/intern/my-attendance/_components/attendance-columns'
import prisma from '@/lib/prisma'
import { differenceInMinutes, format, isToday } from 'date-fns'
import { fromZonedTime } from 'date-fns-tz'
import { unstable_noStore as noStore } from 'next/cache'
import * as XLSX from 'xlsx'
import { getCurrentUser } from './users'

// Get attendance by user email or current user
export async function getInternAttendance(
  email?: string,
): Promise<AttendanceProps[]> {
  const user = await getCurrentUser()

  const result = await prisma.user.findUnique({
    where: { email: email || user?.email },
    select: {
      attendance: {
        select: {
          date: true,
          timeInAM: true,
          timeOutAM: true,
          timeInPM: true,
          timeOutPM: true,
          totalHours: true,
        },
      },
    },
  })
  return result?.attendance || []
}

export const getTotalHours = (
  timeOutAM: Date | null,
  timeInAM: Date | null,
  timeOutPM: Date | null,
  timeInPM: Date | null,
) => {
  let totalMinutesAM = 0
  let totalMinutesPM = 0

  if (timeOutAM && timeInAM) {
    totalMinutesAM = differenceInMinutes(timeOutAM, timeInAM)
  }

  if (timeOutPM && timeInPM) {
    totalMinutesPM = differenceInMinutes(timeOutPM, timeInPM)
  }

  const totalMinutes = Math.ceil(totalMinutesAM + totalMinutesPM)
  const totalHours = totalMinutes / 60

  return totalHours
}

export const formatHours = (time: number) => {
  const totalMinutes = time * 60
  const hours = Math.floor(totalMinutes / 60)
  const minutes = Math.round(totalMinutes % 60)

  let timeString = ''

  if (hours > 0) {
    timeString += `${hours} ${hours > 1 ? 'hrs' : 'hr'} `
  }
    
  timeString += `${minutes} ${minutes > 1 ? 'mins' : 'min'}`

  return timeString.trim()
}

export const addAttendance = async (internId: string) => {
  const res = await fetch('/api/attendance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      internId,
    }),
    cache: 'no-store'
  })

  const addedAttendance: AttendanceProps = await res.json()

  if (addedAttendance) {
    return {
      data: addedAttendance,
      success: 'Success',
    }
  } else {
    return { error: 'Server Error' }
  }
}

export const getAttendanceMode = (attendance: AttendanceProps | undefined) => {
  const currentDate = fromZonedTime(new Date(), 'Asia/Manila')
  const currentHour = currentDate.getHours()

  // Default mode is 'Time In'
  let mode = 'Time In'

  // If there's no attendance or the last attendance is not from today, return 'Time In'
  if (!attendance || !isToday(attendance.date || '')) {
    return mode
  }

  // If it's morning and there's a time in for the morning, return 'Time out'
  if (currentHour < 12 && attendance.timeInAM && !attendance.timeOutAM) {
    mode = 'Time out'
  }

  // If it's afternoon and there's a time in for the afternoon, return 'Time out'
  if (currentHour >= 12 && attendance.timeInPM && !attendance.timeOutPM) {
    mode = 'Time out'
  }

  return mode
}

// export attendance in excel format
export const exportAttendance = (data: AttendanceProps[]) => {
  /* flatten objects */
  const rows = data.map(row => ({
    date: row.date ? format(row.date, 'EEE, MMM dd') : '',
    timeInAM: row.timeInAM ? format(row.timeInAM, 'hh:mm aa') : '',
    timeOutAM: row.timeOutAM ? format(row.timeOutAM, 'hh:mm aa') : '',
    timeInPM: row.timeInPM ? format(row.timeInPM, 'hh:mm aa') : '',
    timeOutPM: row.timeOutPM ? format(row.timeOutPM, 'hh:mm aa') : '',
    totalHours: formatHours(row.totalHours || 0),
  }))

  // Create a new worksheet from the rows array
  const worksheet = XLSX.utils.json_to_sheet(rows)

  // Create a new workbook and add the worksheet to it
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

  // Add headers to the worksheet
  XLSX.utils.sheet_add_aoa(
    worksheet,
    [['Date', 'Time In', 'Time Out', 'Time In', 'Time Out', 'Total Hours']],
    { origin: 'A1' },
  )

  const columns = Object.keys(rows[0])

  /* calculate column width */
  const max_widths = columns.map(column =>
    rows.reduce(
      (max, row) =>
        Math.max(max, String(row[column as keyof typeof row]).length),
      10,
    ),
  )

  // Set the column widths
  worksheet['!cols'] = max_widths.map(wch => ({ wch }))

  // Write the workbook to a file and trigger download
  XLSX.writeFileXLSX(workbook, 'attendance.xlsx')
}

export const getAttendanceTotalHours = (attendance: AttendanceProps[]) => {
  return attendance.reduce((acc, curr) => {
    return acc + (curr.totalHours || 0)
  }, 0)
}

export const getTargetHours = async (id?: string) => {
  const activeUser = await getCurrentUser()

  const user = await prisma.user.findUnique({
    where: { id: id ? id : activeUser?.id },
  })

  return user?.totalHours
}

export const getAllInternAttendance = async () => {
  noStore()
  const users = await prisma.user.findMany({
    select: {
      name: true,
      attendance: true,
    },
  })

  return users
    .map(user => {
      return user.attendance.map(att => {
        return {
          name: user.name,
          ...att,
        }
      })
    })
    .flatMap(attendance => attendance)
}
