import { TaskAccordions } from '@/components/@core/tasks/task-accordions'
import { getAllInternsTasks } from '@/utils/tasks'
import React from 'react'

export const InternsTasksWrapper = async () => {
  const allUsers = await getAllInternsTasks()
  const tasks = allUsers?.flatMap(user =>
    user.tasks.map(task => {
      return {
        ...task,
        intern: user.intern,
      }
    }),
  )

  const sortedTasks = tasks
    ? tasks.sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
      )
    : []

  return <TaskAccordions tasks={sortedTasks} isInAdmin />
}
