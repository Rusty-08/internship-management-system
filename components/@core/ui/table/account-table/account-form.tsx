'use client'

import SubmitCancelButton from '@/components/@core/button/submit-cancel'
import ErrorCard from '@/components/auth/login/error-card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { RegistrationSchema } from './registration-schema'
import { UserSubset } from './types'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Batch, User } from '@prisma/client'
import { HiOutlineInformationCircle } from "react-icons/hi2"
import { RequiredLabel } from '@/components/ui/required-label'
import { TooltipWrapper } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/configs/site'
import { getAllBatch } from '@/utils/batch'
import { getClientUserById } from '@/utils/users'
import { Skeleton } from '@/components/ui/skeleton'
import { IoIosCloseCircleOutline } from "react-icons/io"

type FormDialogProps = {
  userId: string
  role: 'INTERN' | 'MENTOR'
  batches?: Batch[]
  mentors?: UserSubset[]
  interns?: UserSubset[]
}

export function UserForm({
  userId,
  role,
  batches,
  mentors,
  interns
}: FormDialogProps) {
  const router = useRouter()
  const [isEmailTaken, setIsEmailTaken] = useState(false)
  const [initialState, setInitialState] = useState<User | null>(null)
  const [isFetching, setIsFetching] = useState(false)
  const [mentorsWithoutIntern, setMentorsWithoutIntern] = useState<UserSubset[] | null>()

  const form = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
  })

  const { isSubmitting, errors } = form.formState

  const onSubmit = async (values: z.infer<typeof RegistrationSchema>) => {
    const { name, email, mentorId, expertise, course, totalHours, batch } = values

    setIsEmailTaken(false)

    try {
      let res

      console.log(mentorId)

      if (userId !== 'create-user') {
        res = await fetch('/api/auth/users/update-account', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: initialState?.id,
            name,
            email,
            role,
            course,
            totalHours: Number(totalHours),
            mentor: mentorId,
            expertise,
            batch
          }),
        })
      } else {
        res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            role,
            mentor: mentorId,
            expertise,
            course,
            totalHours: Number(totalHours),
            batch
          }),
        })
      }

      if (res.status === 400) {
        setIsEmailTaken(true)
        return
      }

      form.reset()
      router.push(`/admin/${role.toLowerCase()}-management`)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (userId !== 'create-user') {
      const fetchedUser = async () => {
        setIsFetching(true)
        const user = await getClientUserById(userId)

        form.setValue('name', user?.name || '')
        form.setValue('email', user?.email || '')
        form.setValue('course', user?.course || '')
        form.setValue('mentorId', user?.mentorId || '')
        form.setValue('expertise', user?.expertise || '')
        form.setValue('batch', user?.batchId || '')

        const assignedIntern = interns?.find(intern => user?.id === intern.mentorId)?.id || ''
        const totalHours = user?.course ? user?.course === 'BSCS' ? 120 : 486 : undefined
        const _mentors = mentors?.filter(mentor => !mentor.assignedIntern || user?.mentorId === mentor.id)

        form.setValue('assignedIntern', assignedIntern)
        form.setValue('totalHours', totalHours)

        setInitialState(user)
        setIsFetching(false)
        setMentorsWithoutIntern(_mentors)

        console.log('refetched')
      }

      fetchedUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isFetching) {
    return (
      <Skeleton className='rounded-lg h-[20rem] w-full' />
    )
  }

  return (
    <Card>
      <CardHeader className="text-xl font-semibold">
        {initialState ? 'Edit' : 'Add'}{' '}
        {role.charAt(0) + role.slice(1).toLowerCase()} Account
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className="space-y-4">
              <div className='grid gap-4 grid-cols-2'>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <RequiredLabel>Name</RequiredLabel>
                      <FormControl>
                        <Input {...field} disabled={isSubmitting} placeholder="John Doe" />
                      </FormControl>
                      {errors.name && (
                        <FormMessage>{errors.name.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <RequiredLabel>Email</RequiredLabel>
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
                      {errors.email && (
                        <FormMessage>{errors.email.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              {role === 'INTERN' && (
                <>
                  <div className='grid grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name="course"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course</FormLabel>
                          <Select
                            onValueChange={value => {
                              field.onChange(value)
                              const totalHours = value === 'BSCS' ? 120 : 486
                              form.setValue('totalHours', totalHours)
                            }}
                            disabled={isSubmitting}
                            defaultValue={field.value}
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
                          {errors.course && (
                            <FormMessage>{errors.course.message}</FormMessage>
                          )}
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="totalHours"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Hours</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              placeholder="Select the course to get the total hours"
                              onChange={event =>
                                field.onChange(Number(event.target.value))
                              }
                              disabled
                            />
                          </FormControl>
                          {errors.totalHours && (
                            <FormMessage>{errors.totalHours.message}</FormMessage>
                          )}
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <FormField
                      control={form.control}
                      name="mentorId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mentor</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            disabled={isSubmitting}
                            value={field.value}
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
                                    onClick={() => form.setValue('mentorId', '')}
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
                              {mentorsWithoutIntern?.map(mentor => (
                                <SelectItem
                                  key={mentor.email}
                                  value={mentor.id ?? ''}
                                >
                                  {mentor.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.mentorId && (
                            <FormMessage>{errors.mentorId.message}</FormMessage>
                          )}
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="batch"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Batch</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={isSubmitting}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={
                                    batches?.length === 0
                                      ? 'No available batch'
                                      : 'Select the batch name'
                                  }
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {batches?.map(batch => (
                                <SelectItem
                                  key={batch.id}
                                  value={batch.id ?? ''}
                                >
                                  {batch.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.batch && (
                            <FormMessage>{errors.batch.message}</FormMessage>
                          )}
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}
              {role === 'MENTOR' && (
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expertise"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={isSubmitting}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select the role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {siteConfig.mentorsExpertise.map(expertise => (
                              <SelectItem key={expertise} value={expertise}>
                                {expertise}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="assignedIntern"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assigned Intern</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="No handled intern yet" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {interns?.map(intern => (
                              <SelectItem key={intern.id} value={intern.id ?? ''}>
                                {intern.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              )}
              {isEmailTaken && (
                <ErrorCard>The Email is already taken</ErrorCard>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitCancelButton
              loading={isSubmitting}
              cancelOnclick={() => {
                form.reset()
                router.back()
              }}
              className="w-44"
            >
              {`Save ${initialState ? 'Changes' : 'Account'}`}
            </SubmitCancelButton>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
