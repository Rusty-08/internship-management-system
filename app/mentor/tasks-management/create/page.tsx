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

const page = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(2024, 11, 31),
  })
  const links = [
    { title: 'Tasks Management', path: '/mentor/tasks-management' },
  ]
  const current = 'Create Task'

  return (
    <>
      <div className="mx-auto px-4">
        <BreadcrumbWrapper links={links} current={current} />
        <div className="mt-10 border rounded p-5">
          <h1 className="text-xl font-bold mb-5">Upload New Task</h1>
          <form action="" className="space-y-4">
            <div className="flex flex-col gap-4">
              <div>
                <Label htmlFor="title" className="mb-2">
                  Title
                </Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Task Title"
                  required
                />
              </div>
              <div>
                <Label htmlFor="instructions" className="mb-2">
                  Instructions
                </Label>
                <Textarea
                  id="instructions"
                  placeholder="Write instructions here..."
                  required
                />
              </div>
              <div>
                <Label htmlFor="descriptions" className="mb-2">
                  Descriptions
                </Label>
                <Textarea
                  id="descriptions"
                  placeholder="Write descriptions here..."
                  required
                />
              </div>
              <div className="flex gap-4">
                <div>
                  <Label htmlFor="date" className="mb-2">
                    Task Date Range
                  </Label>
                  <DatePickerWithRange
                    date={dateRange}
                    setDate={setDateRange}
                  />
                </div>
                <div>
                  <Label htmlFor="file" className="mb-2">
                    Attach File
                  </Label>
                  <Input type="file" id="file" required />
                </div>
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
    </>
  )
}

export default page
