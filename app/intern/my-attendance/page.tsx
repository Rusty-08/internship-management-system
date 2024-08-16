import { getAttendanceMode, getInternAttendance } from '@/utils/attendance'
import { getCurrentUser } from '@/utils/users'
import { Metadata } from 'next'
import { InternAttendance } from './_components/intern-attendance'
import { compareDesc } from 'date-fns'

export const metadata: Metadata = {
  title: 'My Attendance',
}

const MyAttendance = async () => {
  const attendance = await getInternAttendance()
  const user = await getCurrentUser()

  const descAttendance = attendance.sort((a, b) => compareDesc(
    new Date(a.date || ''), new Date(b.date || ''))
  )

  return <InternAttendance attendance={descAttendance} user={user} />
}

export default MyAttendance
