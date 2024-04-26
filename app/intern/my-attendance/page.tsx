import { getAttendanceMode, getInternAttendance } from '@/utils/attendance'
import AttendanceTable from './_components/attendance-table'
import { getCurrentUser } from '@/utils/users'

const MyAttendance = async () => {
  const attendance = await getInternAttendance()
  const user = await getCurrentUser()

  const mode = getAttendanceMode(attendance)

  return (
    <div className='py-5'>
      <AttendanceTable data={attendance} user={user} mode={mode} />
    </div>
  )
}

export default MyAttendance
