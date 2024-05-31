import prisma from '@/lib/prisma'
import { getTotalHours } from '@/utils/attendance'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { internId } = await req.json()

  try {
    const currentDate = new Date()
    // direct the attendance in PM if it is already 1 PM
    const isAfternoon = currentDate.getHours() >= 13

    // Find today's attendance record for the intern
    const attendanceRecords = await prisma.attendance.findMany({
      where: {
        internId,
      },
    })

    const attendance = attendanceRecords.find(
      att => att.date?.getDate() === currentDate.getDate(),
    )

    // If it's morning and there's no attendance record, create one
    if (!isAfternoon) {
      if (!attendance || !attendance.timeInAM) {
        // If the attendance record doesn't exist, create a new one
        await prisma.attendance.create({
          data: {
            internId,
            date: currentDate,
            timeInAM: currentDate,
            totalHours: 0,
          },
        })
      } else if (!attendance.timeOutAM) {
        await prisma.attendance.update({
          where: { id: attendance.id },
          data: {
            timeOutAM: currentDate,
            totalHours: getTotalHours(
              currentDate,
              attendance.timeInAM,
              null,
              null,
            ),
          },
        })
      }
    }

    if (attendance && isAfternoon) {
      // if no time-in AM and already afternoon, time-in in the afternoon
      if (!attendance.timeInPM) {
        await prisma.attendance.update({
          where: { id: attendance.id },
          data: { timeInPM: currentDate },
        })
      } else if (!attendance.timeOutPM) {
        await prisma.attendance.update({
          where: { id: attendance.id },
          data: {
            timeOutPM: currentDate,
            totalHours: getTotalHours(
              attendance.timeOutAM,
              attendance.timeInAM,
              currentDate,
              attendance.timeInPM,
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
          date: currentDate,
          timeInPM: currentDate,
          totalHours: 0,
        },
      })
    }

    revalidatePath('/intern/my-attendance')

    return NextResponse.json(
      { message: 'Recorded Successfully' },
      { status: 201 },
    )
  } catch {
    return NextResponse.json(
      { message: 'Could not save attendance' },
      { status: 404 },
    )
  } finally {
    prisma.$disconnect()
  }
}
