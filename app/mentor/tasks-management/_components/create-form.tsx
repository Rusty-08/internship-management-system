'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { DatePickerWithRange } from '@/components/@core/ui/date-range-picker'
import { DateRange } from 'react-day-picker'
import { z } from 'zod'
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
import { handleFileUpload } from '@/utils/upload-file'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import SubmitCancelButton from '@/components/@core/button/submit-cancel'
import { Textarea } from '@/components/ui/textarea'

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
      const fileUrl = await handleFileUpload(file, 'tasks')

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
    } else {
      throw new Error('File is required')
    }

    form.reset()
    router.push('/mentor/tasks-management')
    router.refresh()
  }

  const { errors, isSubmitting } = form.formState

  return (
    <Card>
      <CardHeader className="text-xl font-medium">Create New Task</CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)}>
          <CardContent>
            <div className="space-y-4">
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
                      <Textarea
                        {...field}
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
            </div>
          </CardContent>
          <CardFooter>
            <SubmitCancelButton
              loading={isSubmitting}
              cancelOnclick={() => router.back()}
              className="w-36"
            >
              Upload Task
            </SubmitCancelButton>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default TaskForm
