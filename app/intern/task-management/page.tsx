import TaskWrapper from '@/components/@core/tasks/task-wrapper'
import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'
import { getTasks } from '@/utils/tasks'
import { getCurrentUserMentorId } from '@/utils/users'

const TasksManagement = async () => {
  const mentorId = await getCurrentUserMentorId()
  const mentorTasks = await getTasks(mentorId || '')

  return (
    <div className="py-2 space-y-6">
      <BreadcrumbWrapper current="Tasks Management" />
      <TaskWrapper tasks={mentorTasks?.tasks || []} isInternUser />
    </div>
  )
}

export default TasksManagement
