'use client'

import { Accordion } from "@/components/ui/accordion"
import TaskCard from "./task-card"
import NoRecords from "../ui/no-records"
import { useMemo, useState, useCallback } from "react"
import { SearchFilter } from "./search-filter"
import { TaskProps } from "./types"
import Link from "next/link"
import AddButton from '@/components/@core/ui/add-button';
import { Button } from "@/components/ui/button"
import { MdAdd } from "react-icons/md"
import SelectFilter from "./status-filter"
import { useUpdateParams } from "@/hooks/useUpdateParams"

type TaskWrapperProps = {
  isMentor: boolean
  tasks: TaskProps[]
}

export const TaskAccordions = ({ tasks, isMentor }: TaskWrapperProps) => {
  const { searchParams, updateParams } = useUpdateParams()
  const [taskSearch, setTaskSearch] = useState(searchParams.get('task') || '')
  const [taskStatus, setTaskStatus] = useState(searchParams.get('status') || 'all')

  const handleSearch = useCallback((task: string) => {
    setTaskSearch(task)
    updateParams('task', task)
  }, [updateParams])

  const handleStatusChange = useCallback((value: string) => {
    setTaskStatus(value)
    updateParams('status', value)
  }, [updateParams])

  const selectedTasks = useMemo(() => {
    return tasks.filter(task => {
      const titleMatch =
        taskSearch ? task.title.toLowerCase().includes(taskSearch.toLowerCase()) : true
      const statusMatch =
        taskStatus !== 'all' ? task.status.toLowerCase() === taskStatus : true
      return titleMatch && statusMatch
    })
  }, [taskSearch, taskStatus, tasks])

  return (
    <div className='space-y-4'>
      <div className="w-full flex gap-3">
        <SearchFilter handleSearch={handleSearch} defaultValue={taskSearch} />
        <SelectFilter
          defaultValue={taskStatus}
          handleStatusChange={handleStatusChange}
          items={[
            { value: 'all', name: 'Status', color: 'all' },
            { value: 'pending', name: 'Pending', color: 'bg-pending' },
            { value: 'in_progress', name: 'In Progress', color: 'bg-in-progress' },
            { value: 'completed', name: 'Completed', color: 'bg-completed' },
            { value: 'overdue', name: 'Overdue', color: 'bg-overdue' }
          ]}
          className='w-40'
        />
        {isMentor && (
          <Link
            href="/mentor/tasks-management/create-task"
            className="fixed lg:relative bottom-4 lg:bottom-0 right-4 lg:right-0"
          >
            <AddButton className="hidden lg:inline-flex">Create Task</AddButton>
            <Button className="inline-flex z-50 font-normal h-12 pe-6 md:hidden gap-3">
              <MdAdd size="1.5rem" />
              New
            </Button>
          </Link>
        )}
      </div>
      <div>
        {selectedTasks.length ? (
          <Accordion type="single" collapsible className="w-full">
            {selectedTasks.map(task => (
              <TaskCard key={task.id} task={task} isMentor={isMentor} />
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
