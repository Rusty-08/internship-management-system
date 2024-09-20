'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { DatePickerWithRange } from '@/components/@core/ui/date-range-picker'
import { DateRange } from 'react-day-picker'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { BatchBaseSchema, BatchEditSchema } from './batch-schema'
import { DayPicker } from '@/components/@core/ui/day-picker'

type BatchFormProps = {
  initialState?: z.infer<typeof BatchBaseSchema> | null
}

const BatchForm = ({ initialState }: BatchFormProps) => {
  const router = useRouter()
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())

  const form = useForm<z.infer<typeof BatchBaseSchema>>({
    resolver: zodResolver(BatchBaseSchema),
    defaultValues: {
      name: '',
      startDate,
      endDate,
    },
  })

  const onSubmitForm = async (values: z.infer<typeof BatchBaseSchema>) => {
    const data = {
      name: values.name,
      startDate,
      endDate,
    }

    if (initialState) {
      console.log('edit')
      await fetch(`/api/batch/update/${initialState.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } else {
      await fetch('/api/batch/add', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    form.reset()
    router.push('/admin/internship-management')
    router.refresh()
  }

  const { errors, isSubmitting } = form.formState

  useEffect(() => {
    if (initialState) {
      form.setValue('name', initialState.name ?? '')
      setStartDate(initialState.startDate)
      setEndDate(initialState.endDate)
    }
  }, [initialState, form])

  return (
    <Card>
      <CardHeader className="text-xl font-semibold">
        {initialState ? 'Update Batch' : 'Create Batch'}
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)}>
          <CardContent>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        disabled={isSubmitting}
                        placeholder="Enter the batch name here"
                      />
                    </FormControl>
                    {errors.name && (
                      <FormMessage>{errors.name.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <DayPicker
                        date={startDate}
                        setDate={setStartDate}
                        className='w-full'
                      />
                    </FormControl>
                    {errors.startDate && (
                      <FormMessage>{errors.startDate.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <DayPicker
                        date={endDate}
                        setDate={setEndDate}
                        className='w-full'
                      />
                    </FormControl>
                    {errors.endDate && (
                      <FormMessage>{errors.endDate.message}</FormMessage>
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
              className="w-full lg:w-40"
            >
              {initialState ? 'Save Changes' : 'Create Batch'}
            </SubmitCancelButton>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default BatchForm
