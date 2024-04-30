import prisma from '@/lib/prisma'
import { getCurrentUser, getUserByEmail } from './users'
import { AttendanceProps } from '@/app/intern/my-attendance/_components/attendance-columns'
import { differenceInMinutes, parse } from 'date-fns'
<<<<<<< Updated upstream
import * as XLSX from 'xlsx'
=======
>>>>>>> Stashed changes

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
  timeOutAM: string,
  timeInAM: string,
  timeOutPM: string,
  timeInPM: string,
) => {
  const totalMinutesAM = differenceInMinutes(
    parse(timeOutAM, 'h:mm a', new Date()),
    parse(timeInAM, 'h:mm a', new Date()),
  )

  // If there is no time in the afternoon, return the total hours in the morning
  if (!timeOutPM || !timeInPM) {
    const hoursAM = Math.floor(totalMinutesAM / 60)
    const minutesAM = totalMinutesAM % 60
    return `${hoursAM}:${minutesAM.toString().padStart(2, '0')}`
  }

  // If there is no time in the morning, return the total hours in the afternoon
  if (!timeOutAM || !timeInAM) {
    const totalMinutesPM = differenceInMinutes(
      parse(timeOutPM, 'h:mm a', new Date()),
      parse(timeInPM, 'h:mm a', new Date()),
    )
    const hoursPM = Math.floor(totalMinutesPM / 60)
    const minutesPM = totalMinutesPM % 60
    return `${hoursPM}:${minutesPM.toString().padStart(2, '0')}`
  }

  // If there is time in both the morning and afternoon, return the total hours for both
  const totalMinutesPM = differenceInMinutes(
    parse(timeOutPM, 'h:mm a', new Date()),
    parse(timeInPM, 'h:mm a', new Date()),
  )
  const totalMinutes = totalMinutesAM + totalMinutesPM
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return `${hours}:${minutes.toString().padStart(2, '0')}`
}

export const addAttendance = async (email: string) => {
  const user = await getUserByEmail(email)

  const res = await fetch('/api/attendance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      internId: user?.id,
    }),
  })

  return res.status
}

export const getAttendanceMode = (attendance: AttendanceProps[]) => {
  const currentTime = new Date()
  const currentHour = currentTime.getHours()

  let mode = 'Time In'

  if (attendance.length) {
    if (currentHour < 12) {
      if (!attendance[attendance.length - 1].timeOutAM) {
        mode = 'Time out'
      }
    } else if (currentHour >= 12 && currentHour < 24) {
      if (
        attendance[attendance.length - 1].timeInPM &&
        !attendance[attendance.length - 1].timeOutPM
      ) {
        mode = 'Time out'
      }
    }
  }

  return mode
}

// export attendance in excel format
export const exportAttendance = (data: AttendanceProps[]) => {
  // Create a new worksheet from the attendance data
  const worksheet = XLSX.utils.json_to_sheet(data)

  // Create a new workbook and add the worksheet to it
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

  // Add headers to the worksheet
  XLSX.utils.sheet_add_aoa(
    worksheet,
    [['Date', 'Time In', 'Time Out', 'Time In', 'Time Out', 'Total Hours']],
    { origin: 'A1' },
  )

  /* flatten objects */
  const rows = data.map(row => ({
    date: row.date,
    timeInAM: row.timeInAM,
    timeOutAM: row.timeOutAM,
    timeInPM: row.timeInPM,
    timeOutPM: row.timeOutPM,
    totalHours: row.totalHours,
  }))

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
