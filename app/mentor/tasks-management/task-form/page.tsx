'use client'

import React, { useState } from 'react'
import { BreadcrumbWrapper } from '@/components/@core/ui/breadcrumb'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { DatePickerWithRange } from '@/components/@core/ui/date-range-picker'
import { DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { CustomIcon } from '@/components/@core/iconify'

const links = [{ title: 'Tasks Management', path: '/mentor/tasks-management' }]

const TaskForm = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(2024, 11, 31),
  })

  return (
    <div className="mx-auto py-2">
      <BreadcrumbWrapper links={links} current="Create Task" />
      <div className="mt-6 border rounded-md p-8">
        <h1 className="text-xl font-semibold mb-5">Upload New Task</h1>

        <form action="" className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Task Title"
                  required
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
            </div>
            <div className="space-y-1">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                placeholder="Write instructions here..."
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="descriptions">Descriptions</Label>
              <Textarea
                id="descriptions"
                placeholder="Write descriptions here..."
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="file">Attach File</Label>
              <Input type="file" id="file" required />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">
              <span className="mr-1">Upload Task</span>
              <CustomIcon icon="lucide:arrow-right" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskForm
