import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { zodResolver } from '@hookform/resolvers/zod'

import SubmitCancelButton from '@/components/@core/button/submit-cancel'
import { LoadingSpinner } from '@/components/@core/loading'
import AddButton from '@/components/@core/ui/add-button'
import ErrorCard from '@/components/auth/login/error-card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { fetchMentorUsers } from '@/utils/users'
import { InternCourse } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { RegistrationSchema } from './registration-schema'
import { UserSubset } from './types'

const sampleExpertise = [
  'Frontend Developer',
  'Backend Developer',
  'Fullstack Developer',
  'Mobile Developer',
  'UI/UX Designer',
  'Data Scientist',
]

type FormActions = 'edit' | 'create'

type FormDialogProps = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  initialValues?: z.infer<typeof RegistrationSchema>
  mode?: FormActions
  setMode: (mode: FormActions) => void
  role: 'INTERN' | 'MENTOR'
}

export function FormDialog({
  isOpen,
  setIsOpen,
  initialValues,
  mode,
  setMode,
  role,
}: FormDialogProps) {
  const [mentors, setMentors] = useState<UserSubset[]>([])
  const router = useRouter()
  const [isEmailTaken, setIsEmailTaken] = useState(false)

  const form = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      name: '',
      email: '',
      mentor: '',
      expertise: '',
      course: '',
      totalHours: 0,
    },
  })

  const { isSubmitting, errors } = form.formState

  const onSubmit = async (values: z.infer<typeof RegistrationSchema>) => {
    const { name, email, mentor, expertise, course, totalHours } = values

    try {
      let res
      if (mode === 'edit') {
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
            mentor: role === 'INTERN' ? mentor : null,
            expertise: role === 'INTERN' ? null : expertise,
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
            mentor,
            expertise,
            course,
            totalHours: Number(totalHours),
          }),
        })
      }

      if (res.status === 400) {
        setIsEmailTaken(true)
        return
      } else {
        form.reset()
        setIsOpen(false)
        router.refresh()
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    // for listing mentors in the select dropdown
    const fetchMentors = async () => {
      const data = await fetchMentorUsers()
      setMentors(data)
    }
    fetchMentors()
  }, [])

  useEffect(() => {
    if (initialValues) {
      form.setValue('name', initialValues.name ?? '')
      form.setValue('email', initialValues.email ?? '')
      form.setValue('mentor', initialValues.mentor ?? '')
      form.setValue('expertise', initialValues.expertise ?? '')
      form.setValue('course', initialValues.course ?? '')

      const totalHours = initialValues?.course === 'BSCS' ? 120 : 486
      form.setValue('totalHours', initialValues.totalHours ?? totalHours)
    }
  }, [initialValues, form])

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <AddButton
          onClick={() => {
            setMode('create')
            form.reset()
          }}
        >
          Add Account
        </AddButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Edit' : 'Add'}{' '}
            {role.charAt(0) + role.slice(1).toLowerCase()} Account
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="John Doe" />
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
                      <Input {...field} placeholder="sample@gmail.com" />
                    </FormControl>
                    {errors.email && (
                      <FormMessage>{errors.email.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              {role === 'INTERN' && (
                <>
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
                            placeholder="465"
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
                  <FormField
                    control={form.control}
                    name="mentor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mentor</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select the mentor" />
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
                        {errors.mentor && (
                          <FormMessage>{errors.mentor.message}</FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
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
            <DialogFooter>
              <SubmitCancelButton
                loading={isSubmitting}
                cancelOnclick={() => {
                  form.reset()
                  setIsOpen(!isOpen)
                }}
                className="w-40"
              >
                {`Save ${mode === 'edit' ? 'Changes' : 'Account'}`}
              </SubmitCancelButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
