import { StatCard } from '@/components/@core/ui/dashboard/stat-card'
import {
  getAttendanceTotalHours,
  getInternAttendance,
  getTargetHours,
} from '@/utils/attendance'
import { getCurrentUserTasks } from '@/utils/tasks'
import { Metadata } from 'next'
import Image from 'next/image'
import totalHoursImage from '@/public/dashboard/hours-dashboard.svg'
import totalDaysImage from '@/public/dashboard/days-dashboard.svg'
import totalTaskImage from '@/public/dashboard/task-dashboard.svg'
import recentTasksImage from '@/public/general/images/no-records.svg'
import { format } from 'date-fns'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SampleChart } from '@/components/@core/ui/dashboard/sample-chart'
import { TotalHoursChart } from '@/components/@core/ui/dashboard/total-hours-chart'
import { DetailsCard } from '@/components/@core/ui/dashboard/details-card'
import AttendanceTable from './my-attendance/_components/attendance-table'
import { MdDownloading, MdOutlinePending, MdTaskAlt } from 'react-icons/md'
import { Separator } from '@/components/ui/separator'
import { TaskStatus } from '@prisma/client'

export const metadata: Metadata = {
  title: 'Intern Dashboard',
}

const InternDashboard = async () => {
  const tasks = await getCurrentUserTasks()
  const attendance = await getInternAttendance()
  // const targetHours = await getTargetHours()
  const attendaceTotalHours = getAttendanceTotalHours(attendance)

  const hours = Math.floor(attendaceTotalHours)
  const minutes = Math.round((attendaceTotalHours - hours) * 60)

  // const ongoingTask = tasks?.find(task => task.status === 'IN_PROGRESS')

  // const formattedStartDate =
  //   ongoingTask && format(ongoingTask?.startDate, 'LLL dd')
  // const formattedEndDate =
  //   ongoingTask && format(ongoingTask?.endDate, 'LLL dd, y')

  // const statusName =
  //   ongoingTask &&
  //   ongoingTask?.status.charAt(0) + ongoingTask?.status.slice(1).toLowerCase()

  const statusName = (status: TaskStatus) =>
    status.charAt(0) + status.slice(1).toLowerCase()

  return (
    <div className="flex h-full flex-col gap-6 pt-2">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StatCard header="Total Hours">
          <div className="flex items-end space-x-2">
            {hours >= 1 && (
              <>
                <h1 className="text-4xl font-semibold">{hours}</h1>
                <span className="text-text font-medium">hrs</span>
              </>
            )}
            <h1 className="text-4xl font-semibold">{minutes}</h1>
            <span className="text-text font-medium">mins</span>
          </div>
          <Image
            src={totalHoursImage}
            alt="total hours"
            width={150}
            height={150}
            className="absolute dark:invert -top-3 right-0"
          />
        </StatCard>
        <StatCard header="Total Days">
          <div className="flex items-end space-x-2">
            <h1 className="text-4xl font-semibold">
              {attendance ? attendance.length : 0}
            </h1>
            <span className="text-text font-medium">
              {attendance.length > 1 ? 'days' : 'day'}
            </span>
          </div>
          <Image
            src={totalDaysImage}
            alt="total days"
            width={150}
            height={150}
            className="absolute dark:invert -top-3 right-0"
          />
        </StatCard>
        <StatCard header="Total Tasks">
          <div className="flex items-end space-x-3">
            <h1 className="text-4xl font-semibold">
              {tasks ? tasks.length : 0}
            </h1>
            <span className="text-text font-medium">
              {tasks && tasks.length > 1 ? 'tasks' : 'task'}
            </span>
          </div>
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
          description="Your recent attendance records."
          className="col-span-2"
          noRecords={!attendance}
          navigate="/intern/my-attendance"
        >
          <AttendanceTable
            data={attendance.slice(-4)}
            showTimeInBtn={false}
            isInDashboard={true}
          />
        </DetailsCard>
        <DetailsCard
          noRecords={!tasks}
          header="Tasks"
          description="Your recent task records."
          navigate="/intern/task-management"
        >
          <div className="flex flex-col gap-4">
            {tasks &&
              tasks.slice(-3).map((task, idx) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between w-full gap-4 border-b pb-4 last:border-none last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-1">
                      <p className="text-[0.9rem] font-medium">{task.title}</p>
                      <p className="text-text text-sm">
                        {format(task.startDate, 'LLL dd')} -{' '}
                        {format(task.endDate, 'LLL dd')}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={task.status}
                    className="hidden lg:inline-flex"
                  >
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
