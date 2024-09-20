import React, { Suspense } from 'react'
import { InternsDayAttendance } from './_components/interns-attendance'
import TableSkeleton from '@/components/@core/skeletons/table-skeleton'
import { Metadata } from 'next'

export const revalidate = 3600 // revalidate at most every hour

export const metadata: Metadata = {
  title: 'Interns Attendance',
}

const InternsAttendance = async () => {
  return (
    <Suspense fallback={<TableSkeleton cols={6} rows={8} haveSearch />}>
      <InternsDayAttendance />
    </Suspense>
  )
}

export default InternsAttendance
