import prisma from '@/lib/prisma'
import { getTotalHours } from '@/utils/attendance'
import { dateInManilaTz } from '@/utils/format-date'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { internId } = await req.json()

  try {
    const currentDate = new Date()
    const isAfternoon = currentDate.getHours() >= 12

    // Find today's attendance record for the intern
    const attendanceRecords = await prisma.attendance.findMany({
      where: { internId },
    })

    // last attendance of intern
    const {
      id,
      timeInAM,
      timeOutAM,
      timeInPM,
      timeOutPM
    } = attendanceRecords[attendanceRecords.length - 1]

    let updateData

    if (isAfternoon) {
      updateData = {
        timeInAM,
        timeOutAM,
        timeInPM: !timeInPM ? currentDate : timeInPM,
        timeOutPM: !timeOutPM && timeInPM ? currentDate : timeOutPM,
      }
    } else {
      updateData = {
        timeInAM: !timeInAM ? currentDate : timeInAM,
        timeOutAM: !timeOutAM && timeInAM ? currentDate : timeOutAM,
        timeInPM,
        timeOutPM
      }
    }

    // Update the existing attendance record
    const currentAttendance = await prisma.attendance.update({
      where: { id },
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

    return NextResponse.json(currentAttendance, { status: 201 })
  } catch {
    return NextResponse.json(
      { message: 'Could not save attendance' },
      { status: 404 },
    )
  } finally {
    prisma.$disconnect()
  }
}
