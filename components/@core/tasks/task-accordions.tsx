'use client'

import { Accordion } from '@/components/ui/accordion'
import TaskCard from './task-card'
import NoRecords from '../ui/no-records'
import { useMemo, useState, useCallback, useEffect } from 'react'
import { SearchFilter } from './search-filter'
import { TaskProps } from './types'
import { MdAdd } from 'react-icons/md'
import SelectFilter, { ItemsProps } from '../ui/table/select-filter'
import { useUpdateParams } from '@/hooks/useUpdateParams'
import { taskStatusFilter } from './filter-items'
import { Batch } from '@prisma/client'
import { LinkButton } from '@/components/ui/link-button'

type TaskWrapperProps = {
  batches?: Batch[]
  IsAllowedToAddTasks?: boolean
  isMentor?: boolean
  tasks: TaskProps[]
  isInAdmin?: boolean
  batchesFilter?: ItemsProps[]
}

export const TaskAccordions = ({
  batches,
  batchesFilter,
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
  const [selectedBatch, setSelectedBatch] = useState('')

  const handleSearch = useCallback(
    (task: string) => {
      if (task) {
        setTaskSearch(task)
        updateParams('task', task)
      }
    },
    [updateParams],
  )

  const handleStatusChange = useCallback(
    (value: string) => {
      if (value) {
        setTaskStatus(value)
        updateParams('status', value)
      }
    },
    [updateParams],
  )

  const handleBatchChange = useCallback(
    (value: string) => {
      if (value) {
        setSelectedBatch(value)
        updateParams('batch', value)
      }
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

      const recentBatch = batches?.[batches?.length - 1]
      const batchMatch =
        selectedBatch !== 'all' && recentBatch?.status !== 'COMPLETED'
          ? task.batchId === selectedBatch
          : true

      return isInAdmin
        ? internMatch && statusMatch
        : titleMatch && statusMatch && batchMatch
    })
  }, [batches, isInAdmin, selectedBatch, taskSearch, taskStatus, tasks])

  useEffect(() => {
    const recentBatch = batches?.[batches?.length - 1]
    const currentBatch = batchesFilter?.[batchesFilter.length - 1].value || ''
    const defaultBatch =
      recentBatch?.status === 'COMPLETED' ? 'all' : currentBatch

    setSelectedBatch(searchParams.get('batch') || defaultBatch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="space-y-4">
      <div className="w-full flex gap-3">
        <SearchFilter
          handleSearch={handleSearch}
          defaultValue={taskSearch}
          isInAdmin={isInAdmin}
          className="hidden md:flex"
        />
        {(isMentor || isInAdmin) && (
          <SelectFilter
            defaultValue={
              batchesFilter ? batchesFilter[batchesFilter.length - 1].value : ''
            }
            value={selectedBatch}
            handleStatusChange={handleBatchChange}
            items={batchesFilter}
          />
        )}
        <SelectFilter
          defaultValue={taskStatus}
          handleStatusChange={handleStatusChange}
          items={taskStatusFilter}
          className="w-40"
        />
        {isMentor && (
          <div className="fixed right-0 w-full px-4 py-6 bg-background lg:p-0 lg:w-auto z-50 bottom-0 lg:right-0 lg:bottom-0 lg:relative">
            <LinkButton
              path="/mentor/tasks-management/create-task"
              iconClassName="hidden lg:flex"
              className="w-full lg:w-auto"
              icon={MdAdd}
              disabled={!IsAllowedToAddTasks}
            >
              Create Task
            </LinkButton>
          </div>
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
            noRecordMessage={
              isMentor
                ? "You haven't created a task yet"
                : isInAdmin
                ? 'No records found'
                : "You don't have task yet"
            }
          />
        )}
      </div>
    </div>
  )
}
