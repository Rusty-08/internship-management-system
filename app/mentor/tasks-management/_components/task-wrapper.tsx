'use client'

import { useState } from 'react'
import { SearchFilter } from './search-filter'
import TaskCard from './task-card'
import NoRecords from '@/components/@core/ui/no-records'
import { TaskStatus } from '@prisma/client'
import Link from 'next/link'
import { TaskWrapperProps } from './types'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import AddButton from '@/components/@core/ui/add-button'

const TaskWrapper = ({ tasks, isInternUser = false }: TaskWrapperProps) => {
  const [searchTasks, setSearchTasks] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | 'default'>(
    'default',
  )

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTasks.toLowerCase()),
  )

  const sortedTasks = filteredTasks.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  )

  const selectedTasks = sortedTasks.filter(task => {
    return selectedStatus === 'default' ? task : task.status === selectedStatus
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between border-b pb-4">
        <SearchFilter
          className="w-[25rem]"
          search={searchTasks}
          setSearch={setSearchTasks}
        />
        <div className="flex justify-between gap-2">
          <Select
            defaultValue="default"
            onValueChange={(val: TaskStatus | 'default') =>
              setSelectedStatus(val)
            }
          >
            <SelectTrigger className="bg-card">
              <SelectValue
                placeholder="Select task status"
                defaultValue={selectedStatus}
              />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectGroup>
                <SelectItem value="default">All</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {!isInternUser && (
            <Link href="/mentor/tasks-management/create-task">
              <AddButton>Create Task</AddButton>
            </Link>
          )}
        </div>
      </div>
      {selectedTasks.length ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedTasks.map(task => (
            <TaskCard key={task.id} task={task} isIntern={isInternUser} />
          ))}
        </div>
      ) : (
        <NoRecords
          searchOutput={searchTasks}
          className="border bg-card rounded-md pb-8"
        />
      )}
    </div>
  )
}

export default TaskWrapper
