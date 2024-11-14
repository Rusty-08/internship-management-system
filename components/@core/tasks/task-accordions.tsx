'use client'

import { Accordion } from '@/components/ui/accordion'
import TaskCard from './task-card'
import NoRecords from '../ui/no-records'
import { useMemo, useState, useCallback } from 'react'
import { SearchFilter } from './search-filter'
import { TaskProps } from './types'
import Link from 'next/link'
import AddButton from '@/components/@core/ui/add-button'
import { Button } from '@/components/ui/button'
import { MdAdd } from 'react-icons/md'
import SelectFilter from './status-filter'
import { useUpdateParams } from '@/hooks/useUpdateParams'

type TaskWrapperProps = {
  IsAllowedToAddTasks?: boolean
  isMentor?: boolean
  tasks: TaskProps[]
  isInAdmin?: boolean
}

export const TaskAccordions = ({
  IsAllowedToAddTasks,
  tasks,
  isMentor = false,
  isInAdmin = false,
}: TaskWrapperProps) => {
  const { searchParams, updateParams } = useUpdateParams()
  const [taskSearch, setTaskSearch] = useState(searchParams.get('task') || '')
  const [taskStatus, setTaskStatus] = useState(
    searchParams.get('status') || 'all',
  )

  const handleSearch = useCallback(
    (task: string) => {
      setTaskSearch(task)
      updateParams('task', task)
    },
    [updateParams],
  )

  const handleStatusChange = useCallback(
    (value: string) => {
      setTaskStatus(value)
      updateParams('status', value)
    },
    [updateParams],
  )

  const selectedTasks = useMemo(() => {
    return tasks.filter(task => {
      const titleMatch = taskSearch
        ? task.title.toLowerCase().includes(taskSearch.toLowerCase())
        : true
      const internMatch = taskSearch
        ? task.intern?.toLowerCase().includes(taskSearch.toLowerCase())
        : true
      const statusMatch =
        taskStatus !== 'all' ? task.status.toLowerCase() === taskStatus : true

      return isInAdmin ? internMatch && statusMatch : titleMatch && statusMatch
    })
  }, [isInAdmin, taskSearch, taskStatus, tasks])

  return (
    <div className="space-y-4">
      <div className="w-full flex gap-3">
        <SearchFilter
          handleSearch={handleSearch}
          defaultValue={taskSearch}
          isInAdmin={isInAdmin}
        />
        <SelectFilter
          defaultValue={taskStatus}
          handleStatusChange={handleStatusChange}
          items={[
            { value: 'all', name: 'Status', color: 'all' },
            { value: 'pending', name: 'Pending', color: 'bg-pending' },
            {
              value: 'in_progress',
              name: 'In Progress',
              color: 'bg-in-progress',
            },
            { value: 'completed', name: 'Completed', color: 'bg-completed' },
            { value: 'overdue', name: 'Overdue', color: 'bg-overdue' },
          ]}
          className="w-40"
        />
        {isMentor && IsAllowedToAddTasks && (
          <Link
            href="/mentor/tasks-management/create-task"
            className="fixed right-0 w-full px-4 py-6 bg-background lg:p-0 lg:w-auto z-50 bottom-0 lg:right-0 lg:bottom-0 lg:relative"
          >
            <AddButton className="hidden lg:inline-flex">Create Task</AddButton>
            <Button className="inline-flex w-full lg:w-auto z-50 font-normal h-12 pe-6 md:hidden gap-2">
              <MdAdd size="1.5rem" className="hidden lg:flex" />
              Create Task
            </Button>
          </Link>
        )}
      </div>
      <div>
        {selectedTasks.length ? (
          <Accordion type="single" collapsible className="w-full">
            {selectedTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                isMentor={isMentor}
                isInAdmin={isInAdmin}
              />
            ))}
          </Accordion>
        ) : (
          <NoRecords
            searchOutput={taskSearch ?? ''}
            className="border bg-card rounded-md pb-8"
          />
        )}
      </div>
    </div>
  )
}
