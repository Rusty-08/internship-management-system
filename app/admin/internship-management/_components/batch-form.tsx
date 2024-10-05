'use client'

import React, { Fragment, useEffect, useMemo, useState } from 'react'
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
import { Batch, BatchStatus, User } from '@prisma/client'
import { cn } from '@/lib/utils'
import { TooltipWrapper } from '@/components/ui/tooltip'
import { HiOutlineInformationCircle } from 'react-icons/hi2'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { getClientBatchById } from '@/utils/batch'
import { Skeleton } from '@/components/ui/skeleton'
import { addBatch, updateBatch } from '../_actions/actions'
import { isBefore, isWithinInterval } from 'date-fns'
import { GoAlert } from 'react-icons/go'
import Link from 'next/link'
import { ErrorCard } from '@/components/@core/errors/error-card'

type InitialBatchState = Batch & { interns: User[] } | null

type BatchFormProps = {
  haveOngoingBatch?: boolean
  batchId: string
  batchMentors: UserSubset[] | undefined
}

const BatchForm = ({ haveOngoingBatch, batchId, batchMentors }: BatchFormProps) => {
  const router = useRouter()
  const [initialState, setInitialState] = useState<InitialBatchState>(null)
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [isFetching, setIsFetching] = useState(false)

  const form = useForm<z.infer<typeof BatchWithUsers>>({
    resolver: zodResolver(BatchWithUsers),
    defaultValues: {
      batchName: initialState?.name || '',
      startDate,
      endDate,
      interns: initialState?.interns || [internProps]
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'interns',
  })

  const selectedMentors = form.watch('interns')?.map(intern => intern.mentorId)

  const onSubmitForm = async (values: z.infer<typeof BatchWithUsers>) => {
    const data = {
      batchName: values.batchName,
      startDate: startDate || new Date(),
      endDate,
      interns: values.interns
    }

    if (batchId !== 'create-batch' && initialState) {
      await updateBatch({
        id: initialState.id,
        ...data
      })
    } else {
      await addBatch(data)
    }

    form.reset()
    router.push('/admin/internship-management')
  }

  const { errors, isSubmitting } = form.formState

  useEffect(() => {
    if (batchId !== 'create-batch') {
      const fetchSelectedBatch = async () => {
        setIsFetching(true)
        const data = await getClientBatchById(batchId)

        form.setValue('batchName', data?.name || '')
        form.setValue('interns', data?.interns || [internProps])

        setStartDate(data?.startDate || new Date())
        setEndDate(data?.endDate || new Date())

        setInitialState(data)
        setIsFetching(false)
      }

      fetchSelectedBatch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (haveOngoingBatch && batchId === 'create-batch') {
    return (
      <ErrorCard>There is already an ongoing batch, you cannot add new batch.</ErrorCard>
    )
  }

  if (isFetching) {
    return (
      <Skeleton className='rounded-lg h-[30rem] w-full' />
    )
  }

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
                    name="batchName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Batch Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            disabled={isSubmitting}
                            placeholder="Enter the batch name here"
                          />
                        </FormControl>
                        {errors.batchName && (
                          <FormMessage>{errors.batchName.message}</FormMessage>
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
                            date={startDate || new Date()}
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
                  {fields.map((field, index) => {
                    const currentMentorId = form.watch(`interns.${index}.mentorId`)
                    const availableMentors = batchMentors?.filter(mentor =>
                      !selectedMentors?.includes(mentor.id) || mentor.id === currentMentorId
                    )

                    return (
                      <Fragment key={field.id}>
                        <div className="flex flex-col gap-4">
                          <div className='grid grid-cols-3 gap-4'>
                            <FormField
                              control={form.control}
                              name={`interns.${index}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Intern Name</FormLabel>
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
                                          <Button className='h-max w-max p-0 text-primary hover:text-primary/90' variant='ghost' size='icon'>
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
                                    value={field.value || ''}
                                    disabled={
                                      availableMentors?.length === 0 ||
                                      isSubmitting ||
                                      batchId !== 'create-batch'
                                    }
                                  >
                                    <FormControl>
                                      <div className="relative">
                                        <SelectTrigger className='w-full'>
                                          <SelectValue
                                            placeholder={
                                              availableMentors?.length === 0
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
                                      {availableMentors?.map(mentor => (
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
                    )
                  })}
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
