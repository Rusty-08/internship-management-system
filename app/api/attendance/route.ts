import prisma from '@/lib/prisma'
import { getTotalHours } from '@/utils/attendance'
import { isToday } from 'date-fns'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { internId } = await req.json()

  try {
    const currentDate = new Date()
    const isAfternoon = currentDate.getHours() >= 13

    // Find today's attendance record for the intern
    const attendanceRecords = await prisma.attendance.findMany({
      where: { internId },
    })

    const attendance = attendanceRecords.find(att => isToday(att.date || ''))

    if (!attendance) {
      // If the attendance record doesn't exist, create a new one
      await prisma.attendance.create({
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

      await prisma.attendance.update({
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
