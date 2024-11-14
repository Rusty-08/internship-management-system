import { getTasks } from '@/utils/tasks'
import { getCurrentUser } from '@/utils/users'
import { TaskWrapperProps } from './types'
import { TaskAccordions } from './task-accordions'
import { getAllBatchInServer } from '@/utils/batch'

const TaskWrapper = async ({
  isMentor = false,
  mentorId,
}: TaskWrapperProps) => {
  const user = await getCurrentUser()
  const userId = mentorId || user?.id
  const tasks = await getTasks(userId || '')

  const allBatches = await getAllBatchInServer()

  const IsAllowedToAddTasks = allBatches
    ? allBatches[allBatches.length - 1].status === 'ONGOING'
    : false

  const sortedTasks = tasks
    ? tasks.sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
      )
    : []

  return (
    <TaskAccordions
      isMentor={isMentor}
      tasks={sortedTasks}
      IsAllowedToAddTasks={IsAllowedToAddTasks}
    />
  )
}

export default TaskWrapper
