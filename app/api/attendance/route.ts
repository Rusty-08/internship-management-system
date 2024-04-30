import prisma from '@/lib/prisma'
import { getTotalHours } from '@/utils/attendance'
import { format } from 'date-fns'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { internId } = await req.json()

  try {
    const currentDate = new Date()
    const time = format(currentDate, 'h:mm aa')
    // direct the attendance in PM if it is already 1 PM
    const isAfternoon = currentDate.getHours() >= 13

    // Find today's attendance record for the intern
    const attendance = await prisma.attendance.findFirst({
      where: {
        internId,
        date: format(new Date(), 'EEE, MMM dd'),
      },
    })

    // If it's morning and there's no attendance record, create one
    if (!isAfternoon) {
      if (!attendance || !attendance.timeInAM) {
        // If the attendance record doesn't exist, create a new one
        await prisma.attendance.create({
          data: {
            internId,
            date: format(new Date(), 'EEE, MMM dd'),
            timeInAM: time,
            totalHours: '0',
          },
        })
      } else if (!attendance.timeOutAM) {
        await prisma.attendance.update({
          where: { id: attendance.id },
          data: {
            timeOutAM: time,
            totalHours: getTotalHours(time, attendance.timeInAM, '', ''),
          },
        })
      }
    }

    if (attendance && isAfternoon) {
      // if no time-in AM and already afternoon, time-in in the afternoon
      if (!attendance.timeInPM) {
        await prisma.attendance.update({
          where: { id: attendance.id },
          data: { timeInPM: time },
        })
      } else if (!attendance.timeOutPM) {
        await prisma.attendance.update({
          where: { id: attendance.id },
          data: {
            timeOutPM: time,
            totalHours: getTotalHours(
              attendance.timeOutAM || '',
              attendance.timeInAM || '',
              time,
              attendance.timeInPM || '',
            ),
          },
        })
      }
    }

    // If it's afternoon and there's no attendance record, create one
    if (isAfternoon && !attendance) {
      await prisma.attendance.create({
        data: {
          internId,
          date: format(new Date(), 'EEE, MMM dd'),
          timeInPM: time,
          totalHours: '0',
        },
      })
    }

    if (attendance && attendance.timeOutPM) {
      return NextResponse.json(
        { message: 'Exceed the limit of attempt' },
        { status: 401 },
      )
    }
  } catch {
    return NextResponse.json(
      { message: 'Could not save attendance' },
      { status: 404 },
    )
  }
}
