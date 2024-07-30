import { DetailsCard } from '@/components/@core/ui/dashboard/details-card'
import { StatCard } from '@/components/@core/ui/dashboard/stat-card'
import totalDaysImage from '@/public/dashboard/days-dashboard.svg'
import totalHoursImage from '@/public/dashboard/hours-dashboard.svg'
import totalTaskImage from '@/public/dashboard/task-dashboard.svg'
import { getAllInternAttendance } from '@/utils/attendance'
import { format } from 'date-fns'
import { Metadata } from 'next'
import Image from 'next/image'
import Attendance from './interns-attendance/_components/attendance'
import { formatInTimeZone } from 'date-fns-tz'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
}

const AdminDashboard = async () => {
  const allAttendance = await getAllInternAttendance()
  const currentAttendance = allAttendance.flatMap(attendance => attendance)

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StatCard header="Total Hours">
          <div className="flex items-end space-x-2"></div>
          <Image
            src={totalHoursImage}
            alt="total hours"
            width={150}
            height={150}
            className="absolute dark:invert -top-3 right-0"
          />
        </StatCard>
        <StatCard header="Total Days">
          <div className="flex items-end space-x-2"></div>
          <Image
            src={totalDaysImage}
            alt="total days"
            width={150}
            height={150}
            className="absolute dark:invert -top-3 right-0"
          />
        </StatCard>
        <StatCard header="Total Tasks">
          <div className="flex items-end space-x-3"></div>
          <Image
            src={totalTaskImage}
            alt="total days"
            width={150}
            height={150}
            className="absolute dark:invert -top-3 right-0"
          />
        </StatCard>
      </div>
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DetailsCard
          header="Attendance"
          description={formatInTimeZone(new Date(), 'Asia/Manila', 'MMMM dd y - EEEE')}
          noRecordMessage="No attendance records found."
          className="col-span-2"
          noRecords={!currentAttendance}
          navigate="/admin/interns-attendance"
        >
          <Attendance currentAttendance={currentAttendance} isInDashboard />
        </DetailsCard>
        <DetailsCard
          noRecords={true}
          header="Tasks"
          description="Your recent task records."
          navigate="/intern/task-management"
        >
          <div className="flex flex-col w-full gap-4"></div>
        </DetailsCard>
      </div>
    </div>
  )
}

export default AdminDashboard
