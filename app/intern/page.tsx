import { DetailsCard } from '@/components/@core/ui/dashboard/details-card'
import { Badge } from '@/components/ui/badge'
import totalDaysImage from '@/public/dashboard/days-dashboard.svg'
import totalHoursImage from '@/public/dashboard/hours-dashboard.svg'
import totalTaskImage from '@/public/dashboard/task-dashboard.svg'
import { getInternAttendance } from '@/utils/attendance'
import { getCurrentUserTasks } from '@/utils/tasks'
import { TaskStatus } from '@prisma/client'
import { formatInTimeZone } from 'date-fns-tz'
import { Metadata } from 'next'
import { IndividualAttendance } from '../admin/intern-management/_components/individual-attendance'
import { getCurrentUser } from '@/utils/users'
import { TotalDays } from './_components/total-days'
import { TotalHours } from './_components/total-hours'
import { TotalTasks } from './_components/total-tasks'
import { Suspense } from 'react'
import { StatCardSkeleton } from '@/components/@core/ui/dashboard/stat-card-skeleton'

export const metadata: Metadata = {
  title: 'Intern Dashboard',
}

const InternDashboard = async () => {
  const currentUser = await getCurrentUser()
  const tasks = await getCurrentUserTasks()
  const attendance = await getInternAttendance()

  // const sortedTaskByDate = tasks
  //   ? tasks
  //       .slice(-3)
  //       .sort(
  //         (a, b) =>
  //           new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  //       )
  //   : []

  const statusName = (status: TaskStatus) =>
    status.charAt(0) + status.slice(1).toLowerCase()

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Suspense fallback={<StatCardSkeleton image={totalHoursImage} />}>
          <TotalHours batchId={currentUser?.batchId || ''} />
        </Suspense>
        <Suspense fallback={<StatCardSkeleton image={totalDaysImage} />}>
          <TotalDays
            attendance={attendance}
            batchId={currentUser?.batchId || ''}
          />
        </Suspense>
        <Suspense fallback={<StatCardSkeleton image={totalTaskImage} />}>
          <TotalTasks />
        </Suspense>
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
          noRecords={tasks?.length === 0}
          header="Tasks"
          noRecordMessage="You don't have task yet."
          description="Your recent task records."
          navigate="/intern/task-management"
        >
          <div className="flex flex-col w-full gap-2">
            {tasks?.map(task => (
              <div
                key={task.id}
                className="flex bg-background max-w-full border items-center relative justify-between w-full gap-2 py-3 px-4 lg:px-5 rounded-md"
              >
                <div className="flex items-center truncate flex-grow gap-4">
                  <div className="flex flex-col relative truncate gap-0.5 w-full">
                    <p className="text-[0.9rem] font-medium">{task.title}</p>
                    <p className="text-text text-xs">
                      {formatInTimeZone(
                        task.startDate,
                        'Asia/Manila',
                        'LLL dd',
                      )}{' '}
                      -{' '}
                      {formatInTimeZone(task.endDate, 'Asia/Manila', 'LLL dd')}
                    </p>
                    <div className="absolute right-0 top-0 w-6 h-full bg-gradient-to-l from-background to-transparent" />
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
