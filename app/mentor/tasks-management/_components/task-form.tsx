'use client'

import React, { Dispatch, SetStateAction, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { DatePickerWithRange } from '@/components/@core/ui/date-range-picker'
import { useRouter } from 'next/navigation'
import { DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { createTask } from '@/app/mentor/tasks-management/_actions/create-task'
import { useMutation } from '@tanstack/react-query'
import { LoadingSpinner } from '@/components/@core/loading'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import AddButton from '@/components/@core/ui/add-button'
import { z } from 'zod'
import { set } from 'date-fns'

type FormPropsTypes = {
  isOpen: boolean
  mode?: 'edit' | 'add'
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const TaskForm = ({ isOpen, mode, setIsOpen }: FormPropsTypes) => {
  const router = useRouter()
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleSubmit = async (formData: FormData) => {
    formData.append('startDate', dateRange?.from?.toISOString() || '')
    formData.append('endDate', dateRange?.to?.toISOString() || '')
    try {
      await createTask(formData)
      setIsOpen(false)
      router.refresh()
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(
          error.errors.reduce((prev, curr) => {
            return { ...prev, [curr.path[0]]: curr.message }
          }, {}),
        )
      } else if (error instanceof Error) {
        const serverErrors = JSON.parse(error.message)
        setErrors(serverErrors)
      }
    }
  }

  const { mutate: addTask, isPending } = useMutation({
    mutationFn: handleSubmit,
  })

  return (
    <Dialog
      open={isOpen}
      onOpenChange={open => {
        if (open) {
          setDateRange({ from: undefined, to: undefined })
          setErrors({})
        }
        setIsOpen(open)
      }}
    >
      <DialogTrigger asChild>
        <AddButton>Create Task</AddButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload New Task</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          <form action={addTask} className="space-y-4">
            <div className="flex flex-col gap-4">
              <div className="space-y-1">
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Task Title"
                  name="title"
                />
                {errors.title && (
                  <p
                    className="text-red-500 text-sm"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {errors.title}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="date">Task Date Range</Label>
                <DatePickerWithRange
                  date={dateRange}
                  setDate={setDateRange}
                  className="w-full"
                />
                {errors.startDate || errors.endDate ? (
                  <p
                    className="text-red-500 text-sm"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {errors.startDate || errors.endDate}
                  </p>
                ) : null}
              </div>
              <div className="space-y-1">
                <Label htmlFor="descriptions">Descriptions</Label>
                <Textarea
                  id="descriptions"
                  placeholder="Write descriptions here..."
                  name="description"
                />
                {errors.description && (
                  <p
                    className="text-red-500 text-sm"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {errors.description}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="file">Attach File</Label>
                <Input type="file" id="file" name="upload" />
                {errors.upload && (
                  <p
                    className="text-red-500 text-sm"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {errors.upload}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <div className="flex justify-end space-x-2">
                <DialogClose>
                  <Button type="button" variant="ghost">
                    Cancel
                  </Button>
                </DialogClose>
                <Button disabled={isPending} className="w-32 gap-1">
                  {isPending ? <LoadingSpinner /> : 'Upload Task'}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TaskForm
