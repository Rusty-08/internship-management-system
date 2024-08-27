import { Metadata } from 'next'
import { Suspense } from 'react'
import { Attendance } from './_components/attendance'
import { AttendanceSkeleton } from './_components/attendance-skeleton'

export const metadata: Metadata = {
  title: 'My Attendance',
}

const MyAttendance = async () => {
  return (
    <Suspense fallback={<AttendanceSkeleton isIntern rows={10} cols={6} />}>
      <Attendance />
    </Suspense>
  )
}

export default MyAttendance
