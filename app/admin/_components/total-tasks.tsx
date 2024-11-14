import { StatCard } from '@/components/@core/ui/dashboard/stat-card'
import { Badge } from '@/components/ui/badge'
import totalTaskImage from '@/public/dashboard/task-dashboard.svg'
import { getAllInternsTasks } from '@/utils/tasks'
import { StatCardLink } from '../../../components/@core/ui/dashboard/stat-card-link'
import { Batch } from '@prisma/client'

type TotalTasksProps = {
  recentBatch: Batch | undefined
}

export const TotalTasks = async ({ recentBatch }: TotalTasksProps) => {
  const allUsers = await getAllInternsTasks()
  const tasks = allUsers
    ? allUsers
        .flatMap(user => user.tasks)
        .filter(task => task.batchId === recentBatch?.id)
    : []

  const haveOngoingBatch = recentBatch?.status === 'ONGOING'

  const completedTasks = tasks
    ? tasks.filter(task => task.status === 'COMPLETED')
    : []
  const pendingTasks = tasks
    ? tasks.filter(task => task.status === 'PENDING')
    : []
  const ongoingTasks = tasks
    ? tasks.filter(task => task.status === 'IN_PROGRESS')
    : []

  return (
    <StatCard header="Total Tasks" image={totalTaskImage}>
      <div className="flex flex-col w-full gap-4">
        <div className="flex gap-2 items-end">
          <h1 className="text-4xl font-semibold">
            {haveOngoingBatch ? tasks.length : 0}
          </h1>
          <span className="text-text mb-0.5 font-medium">
            {tasks.length > 1 && haveOngoingBatch ? 'tasks' : 'task'}
          </span>
        </div>
        <div className="flex items-center flex-col lg:flex-row justify-between">
          {recentBatch && recentBatch.status !== 'COMPLETED' ? (
            <Badge
              variant={tasks ? 'PRIMARY' : 'OVERDUE'}
              className="py-2 px-4"
            >
              {tasks
                ? `${completedTasks.length} completed and ${
                    ongoingTasks.length > 0
                      ? `${ongoingTasks.length} ongoing ${
                          completedTasks.length + ongoingTasks.length > 1
                            ? 'tasks'
                            : 'task'
                        }`
                      : `${pendingTasks.length} pending ${
                          completedTasks.length + pendingTasks.length > 1
                            ? 'tasks'
                            : 'task'
                        }`
                  }`
                : "Interns don't have task yet"}
            </Badge>
          ) : (
            <Badge variant="secondary" className="py-2 px-4">
              No active interns yet
            </Badge>
          )}

          <StatCardLink path="/admin/interns-tasks">View tasks</StatCardLink>
        </div>
      </div>
    </StatCard>
  )
}
