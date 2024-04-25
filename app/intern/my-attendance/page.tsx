import { getInternAttendance } from '@/utils/attendance'
import AttendanceTable from './_components/attendance-table'
import { getCurrentUser } from '@/utils/users'

const MyAttendance = async () => {
  const attendance = await getInternAttendance()
  const user = await getCurrentUser()

  const mode =
    !attendance[attendance.length - 1].timeOutAM ||
    !attendance[attendance.length - 1].timeOutPM
      ? 'Time out'
      : 'Time In'

  return (
    <AttendanceTable data={attendance} user={user} mode={mode} />
  )
}

export default MyAttendance
