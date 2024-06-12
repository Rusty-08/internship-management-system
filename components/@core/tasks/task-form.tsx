'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { DatePickerWithRange } from '@/components/@core/ui/date-range-picker'
import { DateRange } from 'react-day-picker'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TaskFormEditSchema, TaskFormSchema } from './task-schema'
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

type TaskFormProps = {
  initialState: z.infer<typeof TaskFormSchema> | undefined
}

const TaskForm = ({ initialState }: TaskFormProps) => {
  const router = useRouter()
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  })

  const form = useForm<z.infer<typeof TaskFormSchema>>({
    resolver: zodResolver(!initialState ? TaskFormSchema : TaskFormEditSchema),
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
    const file = values.upload as File
    const fileUrl = await handleFileUpload(file, 'tasks')

    const data = {
      ...values,
      id: initialState?.id,
      date: {
        startDate: dateRange?.from,
        endDate: dateRange?.to,
      },
      fileUrl: fileUrl ? fileUrl : null,
      fileName: fileUrl ? file.name : null,
    }

    if (initialState) {
      await fetch(`/api/tasks/update/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } else {
      await fetch('/api/tasks/upload', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    form.reset()
    router.push('/mentor/tasks-management')
    router.refresh()
  }

  const { errors, isSubmitting } = form.formState

  useEffect(() => {
    if (initialState) {
      form.setValue('title', initialState.title ?? '')
      form.setValue('description', initialState.description ?? '')
      form.setValue('upload', initialState.upload ?? undefined)
      setDateRange({
        from: initialState.date.startDate,
        to: initialState.date.endDate,
      })
    }
  }, [initialState, form])

  return (
    <Card>
      <CardHeader className="text-xl font-medium">
        {initialState ? 'Update Task' : 'Create Task'}
      </CardHeader>
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                    <FormLabel>Date Duration</FormLabel>
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
                    <FormLabel>
                      Attach Document{initialState && ' (optional)'}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="file"
                        value={undefined}
                        disabled={isSubmitting}
                        className="cursor-pointer"
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
              className="w-40"
            >
              {initialState ? 'Save Changes' : 'Upload Task'}
            </SubmitCancelButton>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default TaskForm
