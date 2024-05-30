'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { DatePickerWithRange } from '@/components/@core/ui/date-range-picker'
import { DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { CustomIcon } from '@/components/@core/iconify'
import { z } from 'zod'
import { LoadingSpinner } from '@/components/@core/loading'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TaskFormSchema } from './task-schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { handleFileUpload } from '@/utils/fileService'
import { useRouter } from 'next/navigation'

const TaskForm = () => {
  const router = useRouter()
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  })

  const form = useForm<z.infer<typeof TaskFormSchema>>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      title: '',
      description: '',
      date: {
        startDate: dateRange?.from,
        endDate: dateRange?.to,
      },
      upload: undefined,
    },
  })

  const onSubmitForm = async (values: z.infer<typeof TaskFormSchema>) => {
    if (values.upload) {
      const file = values.upload as File
      const fileUrl = await handleFileUpload(file)

      const data = {
        ...values,
        date: {
          startDate: dateRange?.from?.toISOString() || '',
          endDate: dateRange?.to?.toISOString() || '',
        },
        fileUrl,
        fileName: file.name,
      }

      await fetch('/api/tasks/upload', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      form.reset()
      router.push('/mentor/tasks-management')
      router.refresh()
    } else {
      throw new Error('File is required')
    }
  }

  const { errors, isSubmitting } = form.formState

  return (
    <div className="mt-10 border rounded p-5">
      <h1 className="text-xl font-bold mb-5">Create New Task</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)}>
          <div className="space-y-4 mb-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter title here..."
                    />
                  </FormControl>
                  {errors.title && (
                    <FormMessage>{errors.title.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter description here..."
                    />
                  </FormControl>
                  {errors.description && (
                    <FormMessage>{errors.description.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Picker</FormLabel>
                  <FormControl>
                    <DatePickerWithRange
                      {...field}
                      date={dateRange}
                      setDate={setDateRange}
                      className="w-full"
                    />
                  </FormControl>
                  {errors.date && (
                    <FormMessage>{errors.date.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="upload"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attach Document</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="file"
                      value={undefined}
                      onChange={e => {
                        field.onChange(e.target.files?.[0])
                      }}
                    />
                  </FormControl>
                  {errors.upload && (
                    <FormMessage>{errors.upload.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" className="w-40" disabled={isSubmitting}>
                {isSubmitting ? (
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
      </Form>
    </div>
  )
}

export default TaskForm
