import React, { Suspense } from 'react'
import { InternsDayAttendance } from './_components/interns-attendance'
import TableSkeleton from '@/components/@core/skeletons/table-skeleton'

export const revalidate = 3600 // revalidate at most every hour

const InternsAttendance = async () => {
  return (
    <Suspense fallback={<TableSkeleton cols={6} rows={8} haveSearch />}>
      <InternsDayAttendance />
    </Suspense>
  )
}

export default InternsAttendance
