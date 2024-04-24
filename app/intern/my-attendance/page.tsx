import { getInternAttendance } from '@/utils/attendance'
import AttendanceTable from './_components/attendance-table'
import { format } from 'date-fns'
import { getCurrentUser } from '@/utils/users'

// const dummyData = [
//   {
//     date: format(new Date(), 'EEE, MMM dd'),
//     timeInAM: '8:00',
//     timeOutAM: '12:00',
//     timeInPM: '1:00',
//     timeOutPM: '5:00',
//     total: '8:00',
//   },
// ]

const MyAttendance = async () => {
  const attendance = await getInternAttendance()
  const user = await getCurrentUser()

  return <AttendanceTable data={attendance} email={user?.email || ''} />
}

export default MyAttendance
