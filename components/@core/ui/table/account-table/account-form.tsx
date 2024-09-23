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
import { fetchMentorUsers } from '@/utils/users'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { RegistrationSchema } from './registration-schema'
import { UserSubset } from './types'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Batch, User } from '@prisma/client'
import { getAllBatch } from '@/utils/batch'
import { cn } from '@/lib/utils'

const sampleExpertise = [
  'Frontend Developer',
  'Backend Developer',
  'Fullstack Developer',
  'Mobile Developer',
  'UI/UX Designer',
  'Data Scientist',
]

type FormDialogProps = {
  initialValues: User | null
  role: 'INTERN' | 'MENTOR'
}

export function UserForm({
  initialValues,
  role,
}: FormDialogProps) {
  const router = useRouter()
  const [isEmailTaken, setIsEmailTaken] = useState(false)
  const [mentors, setMentors] = useState<UserSubset[]>([])
  const [batches, setBatches] = useState<Batch[]>([])

  const form = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      name: initialValues?.name ?? '',
      email: initialValues?.email ?? '',
      mentorId: initialValues?.mentorId ?? '',
      expertise: initialValues?.expertise ?? '',
      course: initialValues?.course ?? '',
      totalHours: undefined,
      batch: initialValues?.batchId ?? ''
    },
  })

  const { isSubmitting, errors } = form.formState

  const onSubmit = async (values: z.infer<typeof RegistrationSchema>) => {
    const { name, email, mentorId, expertise, course, totalHours, batch } = values

    setIsEmailTaken(false)

    try {
      let res
      if (initialValues) {
        res = await fetch('/api/auth/users/update-account', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: initialValues?.id,
            name,
            email,
            role,
            course,
            totalHours: Number(totalHours),
            mentor: role === 'INTERN' ? mentorId : null,
            expertise: role === 'INTERN' ? null : expertise,
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
    if (initialValues) {
      // form.setValue('name', initialValues.name ?? '')
      // form.setValue('email', initialValues.email ?? '')
      // form.setValue('mentorId', initialValues.mentorId ?? '')
      // form.setValue('expertise', initialValues.expertise ?? '')
      // form.setValue('course', initialValues.course ?? '')

      const totalHours = initialValues?.course === 'BSCS' ? 120 : 486
      form.setValue('totalHours', initialValues.totalHours ?? totalHours)
    }

    const fetchMentors = async () => {
      const data = await fetchMentorUsers()
      setMentors(data)
    }

    const fetchAllBatch = async () => {
      const _batches = await getAllBatch()
      setBatches(_batches)
    }

    fetchAllBatch()
    fetchMentors()
  }, [form, initialValues])

  return (
    <Card>
      <CardHeader className="text-xl font-semibold">
        {initialValues ? 'Edit' : 'Add'}{' '}
        {role.charAt(0) + role.slice(1).toLowerCase()} Account
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className="space-y-4">
              <div className={cn('grid gap-4', role === 'INTERN' && 'grid-cols-2')}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isSubmitting} placeholder="sample@gmail.com" />
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
                              placeholder="e.g. 486"
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
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                            disabled={isSubmitting}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={
                                    mentors.length === 0
                                      ? 'No available mentor'
                                      : 'Select the mentor'
                                  }
                                />
                              </SelectTrigger>
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
                            disabled={batches.length === 0}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={
                                    batches.length === 0
                                      ? 'No available batch'
                                      : 'Select the batch name'
                                  }
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {batches.map(batch => (
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
                <FormField
                  control={form.control}
                  name="expertise"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select the role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sampleExpertise.map(expertise => (
                            <SelectItem key={expertise} value={expertise}>
                              {expertise}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
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
              {`Save ${initialValues ? 'Changes' : 'Account'}`}
            </SubmitCancelButton>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
