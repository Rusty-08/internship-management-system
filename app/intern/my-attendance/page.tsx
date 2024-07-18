import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'
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
  const mode = getAttendanceMode(attendance)

  return (
    <div className="py-2 space-y-6">
      <BreadcrumbWrapper current="My Attendance" />
      <InternAttendance attendance={attendance} user={user} mode={mode} />
    </div>
  )
}

export default MyAttendance
