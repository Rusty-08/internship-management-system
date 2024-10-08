
import { StatCard } from '@/components/@core/ui/dashboard/stat-card'
import { Badge } from '@/components/ui/badge'
import prisma from '@/lib/prisma'
import totalDaysImage from '@/public/dashboard/days-dashboard.svg'
import { differenceInDays, format } from 'date-fns'
import { StatCardLink } from '../../../components/@core/ui/dashboard/stat-card-link'
import { siteConfig } from '@/configs/site'
import { formatInTimeZone } from 'date-fns-tz'
import { getOrdinalSuffix } from '@/utils/format-number'

export const TotalDays = async () => {
  const allBatches = await prisma.batch.findMany()

  const recentBatch = allBatches.find(batch =>
    batch.status === 'PENDING' || batch.status === 'ONGOING'
  )

  const haveOngoingBatch = recentBatch?.status === 'ONGOING'

  const totalDays = haveOngoingBatch ? differenceInDays(new Date(), recentBatch.startDate) + 1 : 0

  return (
    <StatCard header="Total Days" image={totalDaysImage}>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-2 items-end">
          <h1 className="text-4xl font-semibold">
            {totalDays}
            {/* {totalDays > 0 && <span className='ms-0.5 text-base'>{getOrdinalSuffix(totalDays, false)}</span>} */}
          </h1>
          <span className="text-text mb-0.5 font-medium">{totalDays > 1 ? 'days' : 'day'}</span>
        </div>
        <div className="flex items-center flex-col lg:flex-row justify-between">
          <Badge
            variant={
              recentBatch
                ? haveOngoingBatch ? 'PRIMARY' : 'PENDING'
                : 'secondary'
            }
            className='py-2 px-4'
          >
            {
              recentBatch
                ? haveOngoingBatch
                  ? `Started in ${formatInTimeZone(recentBatch.startDate, siteConfig.timeZone, 'EEE, MMM dd, yyyy')}`
                  : `Start in ${formatInTimeZone(recentBatch.startDate, siteConfig.timeZone, 'EEE, MMM dd, yyyy')}`
                : 'No ongoing or pending batch'
            }
          </Badge>
          <StatCardLink path='/admin/internship-management'>View batch</StatCardLink>
        </div>
      </div>
    </StatCard>
  )
}
