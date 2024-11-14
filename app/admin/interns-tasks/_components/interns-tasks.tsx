import { TaskAccordions } from '@/components/@core/tasks/task-accordions'
import { getAllBatchInServer } from '@/utils/batch'
import { getAllInternsTasks } from '@/utils/tasks'
import React from 'react'

export const InternsTasksWrapper = async () => {
  const allUsers = await getAllInternsTasks()
  const allBatches = await getAllBatchInServer()

  const currentBatch = allBatches?.[allBatches.length - 1]

  const tasks = allUsers?.flatMap(({ tasks, intern }) =>
    tasks.map(task => {
      return { ...task, intern }
    }),
  )

  const currentTasks = tasks.filter(task => task.batchId === currentBatch?.id)

  const sortedTasks = currentTasks
    ? currentTasks.sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
      )
    : []

  return <TaskAccordions tasks={sortedTasks} isInAdmin />
}
