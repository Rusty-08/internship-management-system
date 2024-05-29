import TaskWrapper from '@/app/mentor/tasks-management/_components/task-wrapper'
import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'
import { getTasks } from '@/utils/tasks'
import { getCurrentUser } from '@/utils/users'

const TasksManagement = async () => {
  const user = await getCurrentUser()
  const mentorTasks = await getTasks(user?.id || '')

  return (
    <div className="py-2 space-y-6">
      <BreadcrumbWrapper current="Tasks Management" />
      <TaskWrapper tasks={mentorTasks?.tasks || []} />
    </div>
  )
}

export default TasksManagement
