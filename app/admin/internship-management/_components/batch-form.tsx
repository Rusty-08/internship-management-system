'use client'

import React, { Fragment, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { DatePickerWithRange } from '@/components/@core/ui/date-range-picker'
import { DateRange } from 'react-day-picker'
import { z } from 'zod'
import { useFieldArray, useForm } from 'react-hook-form'
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
import { BatchBaseSchema, BatchWithUsers, internProps } from './batch-schema'
import { DayPicker } from '@/components/@core/ui/day-picker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { UserSubset } from '@/components/@core/ui/table/account-table/types'
import { Button } from '@/components/ui/button'
import { fetchMentorUsers } from '@/utils/users'
import AddButton from '@/components/@core/ui/add-button'
import { Separator } from '@/components/ui/separator'
import { Batch, User } from '@prisma/client'
import { cn } from '@/lib/utils'
import { TooltipWrapper } from '@/components/ui/tooltip'
import { HiOutlineInformationCircle } from 'react-icons/hi2'
import { IoIosCloseCircleOutline } from 'react-icons/io'

type BatchFormProps = {
  initialState: Batch & { interns: User[] } | null
}

const BatchForm = ({ initialState }: BatchFormProps) => {
  const router = useRouter()
  const [startDate, setStartDate] = useState<Date | undefined>(initialState?.startDate || new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(initialState?.endDate || new Date())
  const [mentors, setMentors] = useState<UserSubset[]>([])

  const form = useForm<z.infer<typeof BatchWithUsers>>({
    resolver: zodResolver(BatchWithUsers),
    defaultValues: {
      name: initialState?.name || '',
      startDate,
      endDate,
      interns: initialState?.interns || [internProps]
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'interns',
  })

  const onSubmitForm = async (values: z.infer<typeof BatchWithUsers>) => {
    const data = {
      name: values.name,
      startDate,
      endDate,
      interns: values.interns
    }

    if (initialState) {
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
    // for listing mentors in the select dropdown
    const fetchMentors = async () => {
      const data = await fetchMentorUsers()
      setMentors(data)
    }
    fetchMentors()
  }, [])

  return (
    <Card>
      <CardHeader className="text-xl font-semibold">
        {initialState ? 'Update Batch' : 'Create Batch'}
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)}>
          <CardContent>
            <div className="space-y-4">
              <div className="flex border bg-card p-6 pt-5 rounded-md flex-col gap-4">
                <p className='font-medium'>Batch Details</p>
                <div className="grid grid-cols-3 gap-4">
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
                            disableBtn={isSubmitting}
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
                            disableBtn={isSubmitting}
                          />
                        </FormControl>
                        {errors.endDate && (
                          <FormMessage>{errors.endDate.message}</FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex border bg-card p-6 pt-5 rounded-md flex-col gap-4">
                <p className='font-medium'>Intern Accounts</p>
                <div className="flex flex-col gap-4">
                  {fields.map((field, index) => (
                    <Fragment key={field.id}>
                      <div className="flex flex-col gap-4">
                        <div className='grid grid-cols-3 gap-4'>
                          <FormField
                            control={form.control}
                            name={`interns.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input {...field} disabled={isSubmitting} placeholder="Enter the user's name here" />
                                </FormControl>
                                {errors.interns && errors.interns[index]?.name && (
                                  <FormMessage>{errors.interns[index]?.name?.message}</FormMessage>
                                )}
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`interns.${index}.email`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input {...field} disabled={isSubmitting} placeholder="sample@example.com" />
                                    {!initialState && (
                                      <TooltipWrapper tooltip='Please use a valid and active email. This email will be used to receive the default password.' className="absolute right-1 -top-7">
                                        <Button className='h-max w-max p-0' variant='ghost' size='icon'>
                                          <HiOutlineInformationCircle size='1.2rem' />
                                        </Button>
                                      </TooltipWrapper>
                                    )}
                                  </div>
                                </FormControl>
                                {errors.interns && errors.interns[index]?.email && (
                                  <FormMessage>{errors.interns[index]?.email?.message}</FormMessage>
                                )}
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`interns.${index}.course`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Course</FormLabel>
                                <Select
                                  onValueChange={value => {
                                    field.onChange(value);
                                    const totalHours = value === 'BSCS' ? 120 : 486;
                                    form.setValue(`interns.${index}.totalHours`, totalHours);
                                  }}
                                  defaultValue={field.value ?? ''}
                                  disabled={isSubmitting}
                                >
                                  <FormControl>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select the course" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {['BSIT', 'BSCS', 'BSIS'].map(course => (
                                      <SelectItem key={course} value={course ?? ''}>
                                        {course}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                {errors.interns && errors.interns[index]?.course && (
                                  <FormMessage>{errors.interns[index]?.course?.message}</FormMessage>
                                )}
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-3 items-end gap-4">
                          <FormField
                            control={form.control}
                            name={`interns.${index}.totalHours`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Total Hours</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    value={field.value ?? ''}
                                    type="number"
                                    placeholder="Select the course to get the total hours"
                                    onChange={event =>
                                      field.onChange(Number(event.target.value))
                                    }
                                    disabled
                                  />
                                </FormControl>
                                {errors.interns && errors.interns[index]?.totalHours && (
                                  <FormMessage>{errors.interns[index]?.totalHours?.message}</FormMessage>
                                )}
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`interns.${index}.mentorId`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Mentor</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value ?? ''}
                                  disabled={mentors.length === 0 || isSubmitting}
                                >
                                  <FormControl>
                                    <div className="relative">
                                      <SelectTrigger className='w-full'>
                                        <SelectValue
                                          placeholder={
                                            mentors?.length === 0
                                              ? 'No available mentor'
                                              : 'Select the mentor'
                                          }
                                        />
                                      </SelectTrigger>
                                      <TooltipWrapper tooltip='Remove mentor'>
                                        <Button
                                          onClick={() => form.setValue(`interns.${index}.mentorId`, '')}
                                          type='button'
                                          size='circle'
                                          className='absolute right-10 text-muted-foreground top-2.5 h-fit w-fit leading-none p-0'
                                          variant='ghost'
                                        >
                                          <IoIosCloseCircleOutline size='1.1rem' />
                                        </Button>
                                      </TooltipWrapper>
                                    </div>
                                  </FormControl>
                                  <SelectContent>
                                    {mentors.map(mentor => (
                                      <SelectItem
                                        key={mentor.email}
                                        value={mentor.id ?? ''}
                                      >
                                        {mentor.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                {errors.interns && errors.interns[index]?.mentorId && (
                                  <FormMessage>{errors.interns[index]?.mentorId?.message}</FormMessage>
                                )}
                              </FormItem>
                            )}
                          />
                          <div className={cn(
                            "grid gap-4",
                            fields.length > 1 && index === fields.length - 1 && !initialState
                            && 'grid-cols-2'
                          )}>
                            {fields.length > 1 && !initialState && (
                              <Button
                                variant='outline-destructive'
                                type='button'
                                className='flex-grow'
                                onClick={() => remove(index)}
                              >
                                Remove
                              </Button>
                            )}
                            {index === fields.length - 1 && !initialState && (
                              <AddButton variant='outline-default' type="button" onClick={() => append(internProps)} className='flex-grow'>
                                Add Another
                              </AddButton>
                            )}
                          </div>
                        </div>
                      </div>
                      {fields.length > 1 && index !== fields.length - 1 && <Separator className='my-4' />}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitCancelButton
              loading={isSubmitting}
              cancelOnclick={() => router.back()}
              className="w-full lg:w-44"
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
