'use client'

import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { DatePickerWithRange } from '@/components/@core/ui/date-range-picker'
import { DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { CustomIcon } from '@/components/@core/iconify'
import { useMutation } from '@tanstack/react-query'
import { createNewTask } from '@/app/mentor/tasks-management/_actions/create-task'
import { z } from 'zod'
import { LoadingSpinner } from '@/components/@core/loading'

const TaskForm = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleSubmit = async (formData: FormData) => {
    formData.append('startDate', dateRange?.from?.toISOString() || '')
    formData.append('endDate', dateRange?.to?.toISOString() || '')

    try {
      setErrors({})
      await createNewTask(formData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(
          error.errors.reduce((prev, curr) => {
            return { ...prev, [curr.path[0]]: curr.message }
          }, {}),
        ) 
      } else if (error instanceof Error) {
        if (error.message.startsWith('Failed to create task')) {
          setErrors({ form: error.message })
        } else {
          const serverErrors = JSON.parse(error.message)
          setErrors(serverErrors)
        }
      }
    }
  }

  const { mutate: addTask, isPending } = useMutation({
    mutationFn: handleSubmit,
  })

  return (
    <div className="mt-10 border rounded p-5">
      <h1 className="text-xl font-bold mb-5">Create New Task</h1>
      <form action={addTask} aria-describedby="form-error">
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              placeholder="Enter title here..."
              name="title"
              aria-describedby="title-error"
            />
            {errors.title && (
              <p
                className="text-red-500 text-sm mt-1"
                aria-live="polite"
                aria-atomic="true"
              >
                {errors.title}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="descriptions">Descriptions</Label>
            <Textarea
              id="descriptions"
              placeholder="Write descriptions here..."
              name="description"
              aria-describedby="description-error"
            />
            {errors.description && (
              <p
                className="text-red-500 text-sm mt-1"
                aria-live="polite"
                aria-atomic="true"
              >
                {errors.description}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="date">Pick Date</Label>
            <DatePickerWithRange
              date={dateRange}
              setDate={setDateRange}
              className="w-full"
            />
            {errors.startDate || errors.endDate ? (
              <p
                className="text-red-500 text-sm mt-1"
                aria-live="polite"
                aria-atomic="true"
              >
                {errors.startDate || errors.endDate}
              </p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="file">Attach File</Label>
            <Input
              type="file"
              id="file"
              name="upload"
              aria-describedby="upload-error"
            />
            {errors.upload && (
              <p
                className="text-red-500 text-sm mt-1"
                aria-live="polite"
                aria-atomic="true"
              >
                {errors.upload}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <Button disabled={isPending}>
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
        </div>
      </form>
    </div>
  )
}

export default TaskForm
