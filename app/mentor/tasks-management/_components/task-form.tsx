'use client'

import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { DatePickerWithRange } from '@/components/@core/ui/date-range-picker'
import { useRouter } from 'next/navigation'
import { DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { formatISO } from 'date-fns'
import { createTask } from '@/app/mentor/_actions/create-task'
import { useMutation } from '@tanstack/react-query'
import { LoadingSpinner } from '@/components/@core/loading'
import { IoMdAddCircleOutline } from 'react-icons/io'

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

  const handleSubmit = async (formData: FormData) => {
    try {
      await createTask(formData)
      setIsOpen(false)
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
            <DialogFooter>
              <div className="flex justify-end space-x-2">
                <DialogClose>
                  <Button
                    type="button"
                    variant="ghost"
                    // onClick={() => form.reset()}
                  >
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
