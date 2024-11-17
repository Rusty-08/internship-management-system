import React, { Suspense } from 'react'
import { InternsDayAttendance } from './_components/interns-attendance'
import { Metadata } from 'next'
import { AttendanceTableSkeleton } from './_components/table-skeleton'

export const revalidate = 3600 // revalidate at most every hour

export const metadata: Metadata = {
  title: 'Interns Attendance',
}

const InternsAttendance = async () => {
  return (
    <Suspense fallback={<AttendanceTableSkeleton />}>
      <InternsDayAttendance />
    </Suspense>
  )
}

export default InternsAttendance
