import { StatCard } from '@/components/@core/ui/dashboard/stat-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import totalHoursImage from '@/public/dashboard/hours-dashboard.svg'
import { getInternUsers } from '@/utils/users'
import Link from 'next/link'
import { LuChevronRight } from 'react-icons/lu'
import { StatCardLink } from '../../../components/@core/ui/dashboard/stat-card-link'

export const TotalInterns = async () => {
  const interns = await getInternUsers()
  const allBatches = await prisma.batch.findMany()

  const recentBatch = allBatches.find(batch =>
    batch.status === 'PENDING' || batch.status === 'ONGOING'
  )

  const haveOngoingBatch = recentBatch?.status === 'ONGOING'

  const activeInterns = interns?.filter(intern => intern.batchId === recentBatch?.id)

  const recentBatchStatus = `
    ${recentBatch?.status.charAt(0)}${recentBatch?.status.slice(1, recentBatch?.status.length).toLowerCase()}
  `

  return (
    <StatCard header="Total Interns" image={totalHoursImage}>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-2 items-end">
          <h1 className="text-4xl font-semibold">{activeInterns?.length}</h1>
          <span className="text-text mb-0.5 font-medium">
            {activeInterns && activeInterns.length > 1 ? 'students' : 'student'}
          </span>
        </div>
        <div className="flex w-full items-center flex-col lg:flex-row justify-between">
          <Badge
            variant={
              recentBatch
                ? haveOngoingBatch ? 'PRIMARY' : 'PENDING'
                : 'secondary'
            }
            className='py-2 px-4'
          >
            {recentBatch ? `${recentBatchStatus} batch — ${recentBatch.name}` : 'No ongoing batch'}
          </Badge>
          <StatCardLink path='/admin/intern-management'>View interns</StatCardLink>
        </div>
      </div>
    </StatCard>
  )
}
