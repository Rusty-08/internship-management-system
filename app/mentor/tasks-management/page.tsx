import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'
import TaskCard, { TaskCardProps } from './_components/task-card'
import TaskWrapper from './_components/task-wrapper'

const TasksManagement = () => {
  return (
    <div className="py-2 space-y-6">
      <BreadcrumbWrapper links={[]} current="Tasks Management" />
      <TaskWrapper />
    </div>
  )
}

export default TasksManagement
