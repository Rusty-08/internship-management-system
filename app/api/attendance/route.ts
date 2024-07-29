import prisma from '@/lib/prisma'
import { getTotalHours } from '@/utils/attendance'
import { isToday } from 'date-fns'
import { NextResponse } from 'next/server'
import { fromZonedTime } from 'date-fns-tz'

export async function POST(req: Request) {
  const { internId } = await req.json()

  try {

    const currentDate = fromZonedTime(new Date(), 'Asia/Manila')
    const isAfternoon = currentDate.getHours() >= 12

    // Find today's attendance record for the intern
    const attendanceRecords = await prisma.attendance.findMany({
      where: { internId },
    })

    let currentAttendance;

    const attendance = attendanceRecords.find(att => isToday(att.date || ''))

    if (!attendance) {
      // If the attendance record doesn't exist, create a new one
      currentAttendance = await prisma.attendance.create({
        data: {
          internId,
          date: currentDate,
          timeInAM: isAfternoon ? null : currentDate,
          timeInPM: isAfternoon ? currentDate : null,
          totalHours: 0,
        },
      })
    } else {
      // Update the existing attendance record
      const updateData = {
        timeInAM: attendance.timeInAM || (!isAfternoon ? currentDate : null),
        timeOutAM: attendance.timeOutAM || (!isAfternoon ? currentDate : null),
        timeInPM: attendance.timeInPM || (isAfternoon ? currentDate : null),
        timeOutPM:
          attendance.timeOutPM ||
          (attendance.timeInPM && isAfternoon ? currentDate : null),
      }

      currentAttendance = await prisma.attendance.update({
        where: { id: attendance.id },
        data: {
          ...updateData,
          totalHours: getTotalHours(
            updateData.timeOutAM,
            updateData.timeInAM,
            updateData.timeOutPM,
            updateData.timeInPM,
          ),
        },
      })
    }

    return NextResponse.json(currentAttendance,
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
