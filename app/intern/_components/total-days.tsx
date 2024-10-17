import { StatCard } from '@/components/@core/ui/dashboard/stat-card'
import { Badge } from '@/components/ui/badge'
import prisma from '@/lib/prisma'
import totalDaysImage from '@/public/dashboard/days-dashboard.svg'
import { differenceInDays, format } from 'date-fns'
import { siteConfig } from '@/configs/site'
import { formatInTimeZone } from 'date-fns-tz'
import { getOrdinalSuffix } from '@/utils/format-number'
import { StatCardLink } from '@/components/@core/ui/dashboard/stat-card-link'
import { AttendanceProps } from '../my-attendance/_components/attendance-columns'

type TotalDaysProps = {
  attendance: AttendanceProps[]
  batchId: string
}

export const TotalDays = async ({ attendance, batchId }: TotalDaysProps) => {
  const recentBatch = await prisma.batch.findUnique({
    where: { id: batchId },
  })

  const haveOngoingBatch = recentBatch?.status === 'ONGOING'

  const totalDays = attendance.length

  return (
    <StatCard header="Total Days" image={totalDaysImage}>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-2 items-end">
          <h1 className="text-4xl font-semibold">
            {totalDays}
            {/* {totalDays > 0 && <span className='ms-1 text-base text-muted-foreground'>{getOrdinalSuffix(totalDays, false)}</span>} */}
          </h1>
          <span className="mb-0.5 text-muted-foreground font-medium">
            {totalDays > 1 ? 'days' : 'day'}
          </span>
        </div>
        <div className="flex items-center flex-col gap-5 md:gap-4 md:flex-row justify-between">
          <Badge
            variant={
              recentBatch
                ? haveOngoingBatch
                  ? 'PRIMARY'
                  : 'PENDING'
                : 'secondary'
            }
            className="py-2 px-4 w-full justify-center md:w-auto"
          >
            {recentBatch
              ? haveOngoingBatch
                ? `Started in ${formatInTimeZone(
                    recentBatch.startDate,
                    siteConfig.timeZone,
                    'EEE, MMM dd, yyyy',
                  )}`
                : `Start in ${formatInTimeZone(
                    recentBatch.startDate,
                    siteConfig.timeZone,
                    'EEE, MMM dd, yyyy',
                  )}`
              : "You don't ongoing or pending batch"}
          </Badge>
          <StatCardLink path="/intern/my-attendance">
            View Attendance
          </StatCardLink>
        </div>
      </div>
    </StatCard>
  )
}
