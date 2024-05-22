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

type FormPropsTypes = {
  isOpen: boolean
  mode?: 'edit' | 'add'
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const TaskForm = ({ isOpen, mode, setIsOpen }: FormPropsTypes) => {
  const router = useRouter()
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  })

  const handleSubmit = async (formData: FormData) => {
    formData.append('startDate', dateRange?.from?.toISOString() || '')
    formData.append('endDate', dateRange?.to?.toISOString() || '')
    try {
      await createTask(formData)
      setIsOpen(false)
      router.refresh()
    } catch (error) {
      console.error(error)
    }
  }

  const { mutate: addTask, isPending } = useMutation({
    mutationFn: handleSubmit,
  })

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
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
                <Input type="file" id="file" name="upload" required />
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
