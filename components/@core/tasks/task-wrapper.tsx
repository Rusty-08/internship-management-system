import NoRecords from '@/components/@core/ui/no-records'
import { Accordion } from '@/components/ui/accordion'
import { getTasks } from '@/utils/tasks'
import { getCurrentUser } from '@/utils/users'
import TaskCard from './task-card'
import { TaskWrapperProps } from './types'
import { Badge } from '@/components/ui/badge'
import { TaskAccordions } from './task-accordions'

const TaskWrapper = async ({
  isMentor = false,
  mentorId,
}: TaskWrapperProps) => {
  const user = await getCurrentUser()
  const userId = mentorId || user?.id
  const tasks = await getTasks(userId || '')

  const sortedTasks = tasks
    ? tasks.sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
    )
    : []

  return <TaskAccordions isMentor={isMentor} tasks={sortedTasks} />
}

export default TaskWrapper
