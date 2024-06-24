'use client'

import { useState, useMemo } from 'react'
import NoRecords from '@/components/@core/ui/no-records'
import { TaskStatus } from '@prisma/client'
import Link from 'next/link'
import { TaskWrapperProps } from './types'
import { IoAdd } from 'react-icons/io5'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import AddButton from '@/components/@core/ui/add-button'
import { Accordion } from '@/components/ui/accordion'
import TaskCard from './task-card'
import { Button } from '@/components/ui/button'

const TaskWrapper = ({
  tasks,
  search,
  isInternUser = false,
}: TaskWrapperProps) => {
  // const [searchTasks, setSearchTasks] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | 'default'>(
    'default',
  )

  const filteredTasks = useMemo(() => {
    return search
      ? tasks.filter(task =>
          task.title.toLowerCase().includes(search.toLowerCase()),
        )
      : tasks
  }, [search, tasks])

  const sortedTasks = filteredTasks.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  )

  const selectedTasks = sortedTasks.filter(task => {
    return selectedStatus === 'default' ? task : task.status === selectedStatus
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full flex gap-3">
        <Select
          defaultValue="default"
          onValueChange={(val: TaskStatus | 'default') =>
            setSelectedStatus(val)
          }
        >
          <SelectTrigger className="bg-card w-max">
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
          <Link
            href="/mentor/tasks-management/create-task"
            className="fixed lg:relative bottom-4 lg:bottom-0 right-4 lg:right-0"
          >
            <AddButton className="hidden lg:inline-flex">Create Task</AddButton>
            <Button
              size="circle"
              className="inline-flex md:hidden w-16 h-16"
              onClick={e => e.stopPropagation()}
            >
              <IoAdd size="1.8rem" />
            </Button>
          </Link>
        )}
      </div>
      {selectedTasks.length ? (
        <Accordion type="single" collapsible className="w-full">
          {selectedTasks.map(task => (
            <TaskCard key={task.id} task={task} isIntern={isInternUser} />
          ))}
        </Accordion>
      ) : (
        <NoRecords
          searchOutput={search}
          className="border bg-card rounded-md pb-8"
        />
      )}
    </div>
  )
}

export default TaskWrapper
