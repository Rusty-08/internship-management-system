import { DetailsCard } from '@/components/@core/ui/dashboard/details-card'
import { StatCard } from '@/components/@core/ui/dashboard/stat-card'
import { Badge } from '@/components/ui/badge'
import totalDaysImage from '@/public/dashboard/days-dashboard.svg'
import totalHoursImage from '@/public/dashboard/hours-dashboard.svg'
import totalTaskImage from '@/public/dashboard/task-dashboard.svg'
import {
  getAttendanceTotalHours,
  getInternAttendance,
} from '@/utils/attendance'
import { getCurrentUserTasks } from '@/utils/tasks'
import { TaskStatus } from '@prisma/client'
// import { format } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import { Metadata } from 'next'
import Image from 'next/image'
import { IndividualAttendance } from '../admin/intern-management/_components/individual-attendance'
import Loading from '../loading'
import prisma from '@/lib/prisma'
import { differenceInDays } from 'date-fns'
import { getOrdinalSuffix } from '@/utils/format-number'
import { getCurrentUser } from '@/utils/users'
import { TotalDays } from './_components/total-days'
import { TotalHours } from './_components/total-hours'
import { TotalTasks } from './_components/total-tasks'

export const metadata: Metadata = {
  title: 'Intern Dashboard',
}

const InternDashboard = async () => {
  const currentUser = await getCurrentUser()
  const tasks = await getCurrentUserTasks()
  const attendance = await getInternAttendance()
  const attendaceTotalHours = getAttendanceTotalHours(attendance)

  const allBatches = await prisma.batch.findMany()

  const recentBatch = allBatches.find(batch =>
    batch.status === 'PENDING' || batch.status === 'ONGOING'
  )

  const haveOngoingBatch = recentBatch?.status === 'ONGOING'

  const totalDays = haveOngoingBatch ? differenceInDays(new Date(), recentBatch.startDate) + 1 : 0

  const hours = Math.floor(attendaceTotalHours)
  const minutes = Math.round((attendaceTotalHours - hours) * 60)

  const sortedTaskByDate = tasks
    ? tasks
      .slice(-3)
      .sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
      )
    : []

  const statusName = (status: TaskStatus) =>
    status.charAt(0) + status.slice(1).toLowerCase()

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <TotalHours batchId={currentUser?.batchId || ''} />
        <TotalDays batchId={currentUser?.batchId || ''} />
        <TotalTasks userId={currentUser?.id || ''} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <DetailsCard
          header="Attendance"
          description="Your recent attendance records."
          className="lg:col-span-2"
          noRecords={!attendance}
          navigate="/intern/my-attendance"
        >
          <IndividualAttendance attendance={attendance} isInInternDashboard />
        </DetailsCard>
        <DetailsCard
          noRecords={sortedTaskByDate.length === 0}
          header="Tasks"
          noRecordMessage="You don't have task yet."
          description="Your recent task records."
          navigate="/intern/task-management"
        >
          <div className="flex flex-col w-full gap-4">
            {sortedTaskByDate.map(task => (
              <div key={task.id} className="flex max-w-full border items-center relative justify-between w-full gap-2 py-3 px-4 lg:px-5 rounded-md">
                <div className="flex items-center truncate flex-grow gap-4">
                  <div className="flex flex-col gap-1 w-full">
                    <p className="text-[0.9rem] font-medium truncate">{task.title}</p>
                    <p className="text-text text-sm">
                      {formatInTimeZone(task.startDate, 'Asia/Manila', 'LLL dd')} -{' '}
                      {formatInTimeZone(task.endDate, 'Asia/Manila', 'LLL dd')}
                    </p>
                  </div>
                </div>
                <Badge variant={task.status} className="flex-shrink-0">
                  {statusName(task.status) === 'In_progress'
                    ? 'In Progress'
                    : statusName(task.status)}
                </Badge>
              </div>
            ))}
          </div>
        </DetailsCard>
      </div>
    </div>
  )
}

export default InternDashboard
