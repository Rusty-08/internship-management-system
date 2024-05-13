import { getAttendanceMode, getInternAttendance } from '@/utils/attendance'
import AttendanceTable from './_components/attendance-table'
import { getCurrentUser } from '@/utils/users'
import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'

const MyAttendance = async () => {
  const attendance = await getInternAttendance()
  const user = await getCurrentUser()

  const mode = getAttendanceMode(attendance)

  return (
    <div className="py-2 space-y-6">
      <BreadcrumbWrapper links={[]} current="My Attendance" />
      <AttendanceTable data={attendance} user={user} mode={mode} />
    </div>
  )
}

export default MyAttendance
