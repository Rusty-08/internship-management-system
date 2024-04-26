import prisma from '@/lib/prisma'
import { getCurrentUser, getUserByEmail } from './users'
import { AttendanceProps } from '@/app/intern/my-attendance/_components/attendance-columns'
import { differenceInHours, differenceInMinutes, format, parse } from 'date-fns'
import { Attendance } from '@prisma/client'

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

  if (!timeOutPM || !timeInPM) {
    const hoursAM = Math.floor(totalMinutesAM / 60)
    const minutesAM = totalMinutesAM % 60
    return `${hoursAM}:${minutesAM.toString().padStart(2, '0')}`
  }

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

  await fetch('/api/attendance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      internId: user?.id,
    }),
  })
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
