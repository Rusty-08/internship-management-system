import prisma from '@/lib/prisma'
import { getTotalHours } from '@/utils/attendance'
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

    const updateData = {
      timeInAM: !timeInAM && !isAfternoon ? currentDate : timeInAM || null,
      timeOutAM: !timeOutAM && !isAfternoon && timeInAM ? currentDate : timeOutAM || null,
      timeInPM: !timeInPM && isAfternoon ? currentDate : timeInPM || null,
      timeOutPM: !timeOutPM && isAfternoon && timeInPM ? currentDate : timeOutPM || null,
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
