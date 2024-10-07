import { DetailsCard } from '@/components/@core/ui/dashboard/details-card'
import { StatCard } from '@/components/@core/ui/dashboard/stat-card'
import { getAllInternAttendance } from '@/utils/attendance'
import { Metadata } from 'next'
import Image from 'next/image'
import Attendance from './interns-attendance/_components/attendance'
import { formatInTimeZone } from 'date-fns-tz'
import { siteConfig } from '@/configs/site'
import { getInternUsers } from '@/utils/users'
import { getAllInternsTasks } from '@/utils/tasks'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { TaskProps } from '@/components/@core/tasks/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import AvatarPlaceholder from '@/public/general/images/male-avatar.svg'
import { Fragment, Suspense } from 'react'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { dateInManilaTz } from '@/utils/format-date'
import { TotalInterns } from './_components/total-interns'
import { TotalTasks } from './_components/total-tasks'
import { TotalDays } from './_components/total-days'
import totalHoursImage from '@/public/dashboard/hours-dashboard.svg'
import totalDaysImage from '@/public/dashboard/days-dashboard.svg'
import totalTaskImage from '@/public/dashboard/task-dashboard.svg'
import { StatCardSkeleton } from '@/components/@core/ui/dashboard/stat-card-skeleton'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
}

const AdminDashboard = async () => {
  const allInternsAttendance = await getAllInternAttendance()
  const allUsers = await getAllInternsTasks()

  const allInterns = allUsers.filter(user => user.intern)
  const currentAttendance = allInternsAttendance.filter(attendance => dateInManilaTz(attendance.date) == dateInManilaTz(new Date()))

  const haveOngoingTask = (tasks: TaskProps[]) => tasks.filter(task => task.status === 'IN_PROGRESS')

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Suspense fallback={<StatCardSkeleton image={totalHoursImage} />}>
          <TotalInterns />
        </Suspense>
        <Suspense fallback={<StatCardSkeleton image={totalDaysImage} />}>
          <TotalDays />
        </Suspense>
        <Suspense fallback={<StatCardSkeleton image={totalTaskImage} />}>
          <TotalTasks />
        </Suspense>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <DetailsCard
          header="Attendance"
          description={formatInTimeZone(new Date(), siteConfig.timeZone, 'MMMM dd y - EEEE')}
          noRecordMessage="No attendance records found."
          className="col-span-2"
          noRecords={!currentAttendance}
          navigate="/admin/interns-attendance"
        >
          <Attendance currentAttendance={allInternsAttendance || []} isInDashboard />
        </DetailsCard>
        <DetailsCard
          noRecords={!allUsers}
          header="Tasks"
          description="All of the intern's task records"
          navigate="/intern/task-management"
        >
          <div className="flex flex-col w-full border shadow-sm rounded-md overflow-hidden">
            {allInterns.map((user, idx) => (
              <Fragment key={user.id}>
                <Link href={`/admin/intern-management/profile/${user.internId}`}>
                  <div className={cn(
                    "flex group items-center px-4 hover:bg-muted/50 transition-all justify-between gap-4",
                    idx % 2 === 0 && 'bg-muted/50',
                    currentAttendance && currentAttendance.length > 0 ? 'py-1.5' : 'py-2.5'
                  )}>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-7 h-7">
                        <AvatarImage src={user.internImage || undefined} alt={`${user.intern}`} />
                        <AvatarFallback>
                          <Image
                            src={AvatarPlaceholder}
                            width={28}
                            height={28}
                            alt={`${user.intern}`}
                          />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className='text-sm group-hover:text-primary font-medium transition-colors'>{user.intern}</p>
                        <p className='text-xs text-text'>
                          {user.tasks.length} {user.tasks.length > 1 ? 'tasks' : 'task'}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={haveOngoingTask(user.tasks).length > 0 ? 'IN_PROGRESS' : 'secondary'}
                      className="hidden lg:inline-flex flex-shrink-0"
                    >
                      {haveOngoingTask(user.tasks).length}{' ongoing '}
                      {haveOngoingTask(user.tasks).length > 1 ? 'tasks' : 'task'}
                    </Badge>
                  </div>
                </Link>
                {idx !== allInterns.length - 1 && <Separator />}
              </Fragment>
            ))}
          </div>
        </DetailsCard>
      </div>
    </div>
  )
}

export default AdminDashboard
