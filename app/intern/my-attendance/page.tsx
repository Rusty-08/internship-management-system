import { getAttendanceMode, getInternAttendance } from '@/utils/attendance'
import { getCurrentUser } from '@/utils/users'
import { Metadata } from 'next'
import { InternAttendance } from './_components/intern-attendance'

export const metadata: Metadata = {
  title: 'My Attendance',
}

const MyAttendance = async () => {
  const attendance = await getInternAttendance()
  const user = await getCurrentUser()

  return <InternAttendance attendance={attendance} user={user} />
}

export default MyAttendance
