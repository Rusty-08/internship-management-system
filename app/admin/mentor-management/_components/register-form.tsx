import { CustomIcon } from '@/components/@core/iconify'
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
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

import { zodResolver } from '@hookform/resolvers/zod'

import { RegistrationSchema } from './registration-schema'
import ErrorCard from '@/components/auth/login/error-card'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LoadingSpinner } from '@/components/@core/loading'

const sampleExpertise = [
  'Frontend Developer',
  'Backend Developer',
  'Fullstack Developer',
  'Mobile Developer',
  'UI/UX Designer',
  'Data Scientist',
]

type FormActions = 'edit' | 'create' | 'view'

type FormDialogProps = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  initialValues?: z.infer<typeof RegistrationSchema>
  mode?: FormActions
  setMode: (mode: FormActions) => void
}

export function FormDialog({
  isOpen,
  setIsOpen,
  initialValues,
  mode,
  setMode,
}: FormDialogProps) {
  const router = useRouter()
  const [isEmailTaken, setIsEmailTaken] = useState(false)
  const form = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  const { isSubmitting, errors } = form.formState

  const onSubmit = async (values: z.infer<typeof RegistrationSchema>) => {
    const { name, email, expertise } = values

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
            role: 'MENTOR',
            expertise,
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
            role: 'MENTOR',
            expertise,
          }),
        })
      }

      if (res.status === 400) {
        setIsEmailTaken(true)
      }
    } catch (error) {
      console.error(error)
    } finally {
      form.reset()
      setIsOpen(false)
      router.refresh()
    }
  }

  useEffect(() => {
    if (initialValues) {
      form.setValue('name', initialValues.name ?? '')
      form.setValue('email', initialValues.email ?? '')
      form.setValue('expertise', initialValues.expertise ?? '')
    }
  }, [initialValues, form])

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button
          className="gap-2"
          onClick={() => {
            setMode('create')
            form.reset()
          }}
        >
          <CustomIcon icon="ic:sharp-add" />
          Add Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Account</DialogTitle>
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
              {isEmailTaken && (
                <ErrorCard>The Email is already existing</ErrorCard>
              )}
            </div>
            <DialogFooter>
              <div className="flex gap-1">
                <DialogClose>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => form.reset()}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button disabled={isSubmitting} className="w-40 text-base">
                  {isSubmitting ? <LoadingSpinner /> : 'Save Account'}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
