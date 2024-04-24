import prisma from '@/lib/prisma'
import { getCurrentUser, getUserByEmail } from './users'
import { AttendanceProps } from '@/app/intern/my-attendance/_components/attendance-columns'
import { differenceInHours, format, parse } from 'date-fns'

export async function getInternAttendance(): Promise<AttendanceProps[]> {
  const user = await getCurrentUser()
  const result = await prisma.user.findUnique({
    where: { email: user?.email },
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
  const totalHoursAM = differenceInHours(
    parse(timeOutAM, 'h:mm a', new Date()),
    parse(timeInAM, 'h:mm a', new Date()),
  )
  const totalHoursPM = differenceInHours(
    parse(timeOutPM, 'h:mm a', new Date()),
    parse(timeInPM, 'h:mm a', new Date()),
  )
  return totalHoursAM + totalHoursPM
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
