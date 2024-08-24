import prisma from '@/lib/prisma'
import { getTotalHours } from '@/utils/attendance'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
// export const preferredRegion = ['hnd1', 'sin1']; // Tokyo, Japan and Singapore

export async function POST(req: Request) {
  const { internId } = await req.json()

  try {
    const currentDate = new Date()
    // Adjust for your local time zone (e.g., UTC+8 for the Philippines)
    const currentHour = currentDate.getUTCHours() + 8
    const isAfternoon = currentHour >= 12

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
      timeInAM: (!timeInAM && !isAfternoon) ? currentDate : timeInAM || null,
      timeOutAM: (!timeOutAM && !isAfternoon && timeInAM) ? currentDate : timeOutAM || null,
      timeInPM: (!timeInPM && isAfternoon) ? currentDate : timeInPM || null,
      timeOutPM: (!timeOutPM && isAfternoon && timeInPM) ? currentDate : timeOutPM || null,
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
