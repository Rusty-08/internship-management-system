'use client'

import { useState } from 'react'
import { tasks } from './dummy-data'
import { SearchFilter } from './search-filter'
import TaskCard from './task-card'
import NoRecords from '@/components/@core/ui/no-records'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CustomIcon } from '@/components/@core/iconify'

type Props = {}

const TaskWrapper = (props: Props) => {
  const [searchTasks, setSearchTasks] = useState('')

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTasks.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <SearchFilter
          className="w-[20rem]"
          search={searchTasks}
          setSearch={setSearchTasks}
        />
        <Link href="/mentor/tasks-management/task-form">
          <Button>
            <span className="mr-2">Create Task</span>
            <CustomIcon icon="lucide:circle-plus" />
          </Button>
        </Link>
      </div>
      {filteredTasks.length ? (
        <div className="grid grid-cols-2 gap-4">
          {filteredTasks.map(task => (
            <TaskCard
              key={task.taskNumber}
              taskNumber={task.taskNumber}
              title={task.title}
              description={task.description}
              status={task.status}
              date={task.date}
            />
          ))}
        </div>
      ) : (
        <NoRecords
          searchOutput={searchTasks}
          className="border rounded-md pb-8"
        />
      )}
    </div>
  )
}

export default TaskWrapper
