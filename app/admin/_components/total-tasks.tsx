import { StatCard } from '@/components/@core/ui/dashboard/stat-card'
import { Badge } from '@/components/ui/badge'
import totalTaskImage from '@/public/dashboard/task-dashboard.svg'
import { getAllInternsTasks } from '@/utils/tasks'
import { getInternUsers } from '@/utils/users'
import { StatCardLink } from './stat-card-link'

export const TotalTasks = async () => {
  const allUsers = await getAllInternsTasks()
  const tasks = allUsers.flatMap(user => user.tasks)

  const completedTasks = tasks.filter(task => task.status === 'COMPLETED')
  const pendingTasks = tasks.filter(task => task.status === 'PENDING')
  const ongoingTasks = tasks.filter(task => task.status === 'IN_PROGRESS')

  return (
    <StatCard header="Total Tasks" image={totalTaskImage}>
      <div className="flex flex-col w-full gap-4">
        <div className="flex gap-2 items-end">
          <h1 className="text-4xl font-semibold">{tasks.length}</h1>
          <span className="text-text mb-0.5 font-medium">
            {tasks.length > 1 ? 'tasks' : 'task'}
          </span>
        </div>
        <div className="flex items-center flex-col lg:flex-row justify-between">
          <Badge
            variant={tasks ? 'PRIMARY' : 'OVERDUE'}
            className='py-2 px-4'
          >
            {
              tasks
                ? `${completedTasks.length} completed and ${ongoingTasks.length > 0
                  ? `${ongoingTasks.length} ongoing tasks`
                  : `${pendingTasks.length} pending tasks`
                }`
                : "Interns don't have task yet"
            }
          </Badge>
          <StatCardLink path='/admin/interns-tasks'>View tasks</StatCardLink>
        </div>
      </div>
    </StatCard>
  )
}
