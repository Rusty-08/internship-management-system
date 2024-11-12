import { StatCard } from '@/components/@core/ui/dashboard/stat-card'
import { Badge } from '@/components/ui/badge'
import prisma from '@/lib/prisma'
import totalHoursImage from '@/public/dashboard/hours-dashboard.svg'
import { StatCardLink } from '@/components/@core/ui/dashboard/stat-card-link'
import {
  getAttendanceTotalHours,
  getInternAttendance,
} from '@/utils/attendance'

type TotalDaysProps = {
  batchId: string
}

export const TotalHours = async ({ batchId }: TotalDaysProps) => {
  const attendance = await getInternAttendance()
  const myBatch = await prisma.batch.findUnique({
    where: { id: batchId },
  })

  const attendaceTotalHours = getAttendanceTotalHours(attendance)

  const hours = Math.floor(attendaceTotalHours)
  const minutes = Math.round((attendaceTotalHours - hours) * 60)

  const myBatchStatus = `
    ${myBatch?.status.charAt(0)}${myBatch?.status
    .slice(1, myBatch?.status.length)
    .toLowerCase()}
  `

  return (
    <StatCard header="Total Hours" image={totalHoursImage}>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-2 items-end">
          {hours >= 1 && (
            <>
              <h1 className="text-4xl font-semibold">{hours}</h1>
              <span className="text-text font-medium">hrs</span>
            </>
          )}
          <h1 className="text-4xl font-semibold">{minutes}</h1>
          <span className="text-text font-medium">mins</span>
        </div>
        <div className="flex items-center flex-col gap-5 md:gap-4 md:flex-row justify-between">
          <Badge
            variant={
              myBatch
                ? myBatch.status === 'ONGOING'
                  ? 'PRIMARY'
                  : 'PENDING'
                : 'secondary'
            }
            className="py-2 px-4 w-full justify-center md:w-auto"
          >
            {myBatch ? `Your batch — ${myBatch.name}` : 'No ongoing batch'}
          </Badge>
          <StatCardLink path="/intern/my-attendance">
            View Attendance
          </StatCardLink>
        </div>
      </div>
    </StatCard>
  )
}
