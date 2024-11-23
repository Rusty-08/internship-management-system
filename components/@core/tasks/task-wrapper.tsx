import { getTasks } from '@/utils/tasks'
import { getCurrentUser } from '@/utils/users'
import { TaskWrapperProps } from './types'
import { TaskAccordions } from './task-accordions'
import { getAllBatchInServer, getBatchFilterItems } from '@/utils/batch'

const TaskWrapper = async ({
  isMentor = false,
  mentorId,
}: TaskWrapperProps) => {
  const user = await getCurrentUser()
  const userId = mentorId || user?.id
  const tasks = await getTasks(userId || '', isMentor)
  const allBatches = await getAllBatchInServer()
  const { batchesFilter, batches } = await getBatchFilterItems()

  const IsAllowedToAddTasks = allBatches
    ? allBatches[allBatches.length - 1].status === 'ONGOING'
    : false

  const sortedTasks = tasks
    ? tasks.sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
      )
    : []

  const AllBatchFilters = [
    {
      value: 'all',
      name: 'All tasks',
      color: 'all',
    },
    ...batchesFilter,
  ]

  return (
    <TaskAccordions
      isMentor={isMentor}
      tasks={sortedTasks}
      IsAllowedToAddTasks={IsAllowedToAddTasks}
      batchesFilter={AllBatchFilters || undefined}
    />
  )
}

export default TaskWrapper
