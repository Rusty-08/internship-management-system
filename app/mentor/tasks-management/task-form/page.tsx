'use client'

import React, { FormEvent, useMemo, useState } from 'react'
import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { DatePickerWithRange } from '@/components/@core/ui/date-range-picker'
import { useRouter } from 'next/navigation'
import { DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { CustomIcon } from '@/components/@core/iconify'
import { formatISO } from 'date-fns'
import { createTask } from '@/app/mentor/_actions/create-task'
import { useMutation } from '@tanstack/react-query'
import { LoadingSpinner } from '@/components/@core/loading'

const links = [{ title: 'Tasks Management', path: '/mentor/tasks-management' }]

const TaskForm = () => {
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    try {
      await createTask(formData)
      router.push('/mentor/tasks-management')
      router.refresh()
    } catch (error) {
      console.error(error)
    }
  }

  const {
    mutate: addTask,
    isPending,
    isError,
  } = useMutation({
    mutationFn: handleSubmit,
  })

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  })
  const [file, setFile] = useState<File | null>(null)

  const formattedStartDate = useMemo(
    () => formatISO(dateRange?.from || new Date()),
    [dateRange],
  )

  const formattedEndDate = useMemo(
    () => formatISO(dateRange?.to || new Date()),
    [dateRange],
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  return (
    <div className="mx-auto py-2">
      <BreadcrumbWrapper links={links} current="Create Task" />
      <div className="mt-6 border rounded-md p-8">
        <h1 className="text-xl font-semibold mb-5">Upload New Task</h1>

        <form action={addTask} className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Task Title"
                  required
                  name="title"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="date">Task Date Range</Label>
                <DatePickerWithRange
                  date={dateRange}
                  setDate={setDateRange}
                  className="w-full"
                />
                <input
                  type="text"
                  name="startDate"
                  value={formattedStartDate}
                  id="date"
                  className="sr-only"
                  readOnly
                />
                <input
                  type="text"
                  name="endDate"
                  value={formattedEndDate}
                  id="date"
                  className="sr-only"
                  readOnly
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="descriptions">Descriptions</Label>
              <Textarea
                id="descriptions"
                placeholder="Write descriptions here..."
                required
                name="description"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="file">Attach File</Label>
              <Input
                type="file"
                id="file"
                name="upload"
                onChange={handleFileChange}
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button disabled={isPending} className="w-40 text-base">
              {isPending ? (
                <LoadingSpinner />
              ) : (
                <>
                  <span className="mr-1">Upload Task</span>

                  <CustomIcon icon="lucide:arrow-right" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskForm
