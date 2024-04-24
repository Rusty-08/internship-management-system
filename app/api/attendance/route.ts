import prisma from '@/lib/prisma'
import { format } from 'date-fns'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { internId } = await req.json()

  try {
    const time = format(new Date(), 'h:mm aa')
    
    // Find today's attendance record for the intern
    const attendance = await prisma.attendance.findFirst({
      where: {
        internId,
        date: format(new Date(), 'EEE, MMM dd'),
      },
    })

    if (!attendance) {
      // If the attendance record doesn't exist, create a new one
      await prisma.attendance.create({
        data: {
          internId,
          date: format(new Date(), 'EEE, MMM dd'),
          timeInAM: time,
        },
      })
    } else {
      // If the attendance record exists, update the first null field with the current time
      if (!attendance.timeInAM) {
        await prisma.attendance.update({
          where: { id: attendance.id },
          data: { timeInAM: time },
        })
      } else if (!attendance.timeOutAM) {
        await prisma.attendance.update({
          where: { id: attendance.id },
          data: { timeOutAM: time },
        })
      } else if (!attendance.timeInPM) {
        await prisma.attendance.update({
          where: { id: attendance.id },
          data: { timeInPM: time },
        })
      } else if (!attendance.timeOutPM) {
        await prisma.attendance.update({
          where: { id: attendance.id },
          data: { timeOutPM: time },
        })
      }
    }
  } catch {
    return NextResponse.json(
      { message: 'Could not save attendance' },
      { status: 404 },
    )
  }
}
