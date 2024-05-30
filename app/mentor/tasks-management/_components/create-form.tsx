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
import { useFormState } from 'react-dom'

const TaskForm = () => {
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

  // const [errors, setErrors] = useState<{ [key: string]: string }>({})

  //   const { mutate: addTask, isPending } = useMutation({
  //   mutationFn: createNewTask,
  // })

  // const [state, addTask] = useFormState(createNewTask, { errors: {} })

  const onSubmitForm = async (values: z.infer<typeof TaskFormSchema>) => {
    const formData = new FormData()
    // formData.append('startDate', dateRange?.from?.toISOString() || '')
    // formData.append('endDate', dateRange?.to?.toISOString() || '')
    formData.append('upload', values.upload as File)
    const data = {
      ...values,
      date: {
        startDate: dateRange?.from?.toISOString() || '',
        endDate: dateRange?.to?.toISOString() || '',
      },
      upload: formData.get('upload'),
    }
    try {
      // setErrors({})
      await fetch('/api/tasks/upload', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.log(error)
      // if (error instanceof z.ZodError) {
      //   setErrors(
      //     error.errors.reduce((prev, curr) => {
      //       return { ...prev, [curr.path[0]]: curr.message }
      //     }, {}),
      //   )
      // } else if (error instanceof Error) {
      //   if (error.message.startsWith('Failed to create task')) {
      //     setErrors({ form: error.message })
      //   } else {
      //     const serverErrors = JSON.parse(error.message)
      //     setErrors(serverErrors)
      //   }
      // }
    }
  }

  const { errors, isSubmitting } = form.formState

  // const { mutate: addTask, isPending } = useMutation({
  //   mutationFn: handleSubmit,
  // })

  return (
    <div className="mt-10 border rounded p-5">
      <h1 className="text-xl font-bold mb-5">Create New Task</h1>
      {/* <form action={addTask} aria-describedby="form-error">
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
      </form> */}
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
                      disabled={isSubmitting}
                      type="text"
                      placeholder=""
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
                      disabled={isSubmitting}
                      type="text"
                      placeholder=""
                    />
                  </FormControl>
                  {errors.description && (
                    <FormMessage>{errors.description.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <Label htmlFor="date">Pick Date</Label>
            <DatePickerWithRange
              date={dateRange}
              setDate={setDateRange}
              className="w-full"
            />
            <FormField
              control={form.control}
              name="upload"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attach Document</FormLabel>
                  <FormControl>
                    <Input type="file" />
                  </FormControl>
                  {errors.upload && (
                    <FormMessage>{errors.upload.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            {/* <div>
              <Label htmlFor="file">Attach File</Label>
              <Input
                type="file"
                id="file"
                name="upload"
                aria-describedby="upload-error"
                onChange={e => setFile(e.target.files?.[0])}
              />
            </div> */}
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
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
            {/* {errorMessage && <ErrorCard>{errorMessage}</ErrorCard>} */}
          </div>
        </form>
      </Form>
    </div>
  )
}

export default TaskForm
