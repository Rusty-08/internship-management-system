'use client'

import NoRecords from '@/components/@core/ui/no-records'
import { TaskWrapperProps } from './types'
import { Accordion } from '@/components/ui/accordion'
import TaskCard from './task-card'
import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'

const TaskWrapper = ({ tasks, isInternUser = false }: TaskWrapperProps) => {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)

  const search = params.get('task')
  const status = params.get('status')

  const filteredTasks = search
    ? tasks.filter(task =>
        task.title.toLowerCase().includes(search.toLowerCase()),
      )
    : tasks

  const sortedTasks = filteredTasks.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  )

  const selectedTasks = status
    ? sortedTasks.filter(task => {
        return status !== 'all'
          ? task.status.toLowerCase() === status
          : task
      })
    : sortedTasks

  return (
    <div className="flex flex-col gap-6">
      {selectedTasks.length ? (
        <Accordion type="single" collapsible className="w-full">
          {selectedTasks.map(task => (
            <TaskCard key={task.id} task={task} isIntern={isInternUser} />
          ))}
        </Accordion>
      ) : (
        <NoRecords
          searchOutput={search ?? ''}
          className="border bg-card rounded-md pb-8"
        />
      )}
    </div>
  )
}

export default TaskWrapper
