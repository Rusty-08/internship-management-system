import { StatCard } from '@/components/@core/ui/dashboard/stat-card'
import { Badge } from '@/components/ui/badge'
import totalTaskImage from '@/public/dashboard/task-dashboard.svg'
import { getAllInternsTasks } from '@/utils/tasks'
import { getInternUsers } from '@/utils/users'
import { StatCardLink } from '../../../components/@core/ui/dashboard/stat-card-link'

type TotalTasksProps = {
  userId: string
}

export const TotalTasks = async ({ userId }: TotalTasksProps) => {
  const allUsers = await getAllInternsTasks()
  const tasks = allUsers.find(user => user.id === userId)?.tasks

  const completedTasks = tasks?.filter(task => task.status === 'COMPLETED') || []
  const pendingTasks = tasks?.filter(task => task.status === 'PENDING') || []
  const ongoingTasks = tasks?.filter(task => task.status === 'IN_PROGRESS') || []

  return (
    <StatCard header="Total Tasks" image={totalTaskImage}>
      <div className="flex flex-col w-full gap-4">
        <div className="flex gap-2 items-end">
          <h1 className="text-4xl font-semibold">{tasks?.length || 0}</h1>
          <span className="text-text mb-0.5 font-medium">
            {tasks && tasks.length > 1 ? 'tasks' : 'task'}
          </span>
        </div>
        <div className="flex items-center flex-col gap-5 md:gap-4 md:flex-row justify-between">
          <Badge
            variant={tasks ? 'PRIMARY' : 'OVERDUE'}
            className='py-2 px-4 w-full justify-center md:w-auto'
          >
            {
              tasks
                ? `${completedTasks.length} completed and ${ongoingTasks.length > 0
                  ? `${ongoingTasks.length} ongoing ${completedTasks.length + ongoingTasks.length > 1
                    ? 'tasks'
                    : 'task'
                  }`
                  : `${pendingTasks.length} pending ${completedTasks.length + pendingTasks.length > 1
                    ? 'tasks'
                    : 'task'
                  }`
                }`
                : "You don't have task yet"
            }
          </Badge>
          <StatCardLink path='/admin/interns-tasks'>View tasks</StatCardLink>
        </div>
      </div>
    </StatCard>
  )
}
