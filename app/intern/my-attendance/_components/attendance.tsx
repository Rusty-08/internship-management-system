import { getInternAttendance } from '@/utils/attendance'
import { getCurrentUser } from '@/utils/users'
import { compareDesc } from 'date-fns'
import { InternAttendance } from './intern-attendance'

export const Attendance = async () => {
  const attendance = await getInternAttendance()
  const user = await getCurrentUser()

  const descAttendance = attendance.sort((a, b) => compareDesc(
    new Date(a.date || ''), new Date(b.date || ''))
  )

  return <InternAttendance attendance={descAttendance} user={user} />
}