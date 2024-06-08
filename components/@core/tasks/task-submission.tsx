import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { SubmissionSchema } from '@/components/@core/tasks/task-schema'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { Input } from '@/components/ui/input'
import SubmitCancelButton from '@/components/@core/button/submit-cancel'
import { useRouter } from 'next/navigation'
import { handleFileUpload } from '@/utils/upload-file'

type TaskDetailProps = {
  taskId: string
  isOpen: boolean
  setIsOpenHandler: () => void
}

export function TaskSubmission({
  taskId,
  isOpen,
  setIsOpenHandler,
}: TaskDetailProps) {
  const router = useRouter()

  const form = useForm<z.infer<typeof SubmissionSchema>>({
    resolver: zodResolver(SubmissionSchema),
    defaultValues: {
      file: undefined,
    },
  })

  const onSubmitForm = async (values: z.infer<typeof SubmissionSchema>) => {
    if (values.file) {
      const file = values.file as File
      const fileUrl = await handleFileUpload(file, 'submissions')

      const data = {
        taskId,
        fileUrl,
        fileName: file.name,
      }

      await fetch('/api/tasks/submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    } else {
      throw new Error('Server error')
    }
    setIsOpenHandler()
    router.refresh()
  }

  const { errors, isSubmitting } = form.formState

  const handleOpenChange = () => {
    setIsOpenHandler()
    form.reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Upload Report</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-full lg:w-[30rem]">
        <DialogHeader>
          <DialogTitle>Task Submission</DialogTitle>
        </DialogHeader>
        <DialogDescription>Submit your task report here</DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitForm)}>
            <div className="space-y-4 mb-4">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Attach Document</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="file"
                        className="cursor-pointer"
                        disabled={isSubmitting}
                        value={undefined}
                        onChange={e => {
                          field.onChange(e.target.files?.[0])
                        }}
                      />
                    </FormControl>
                    {errors.file && (
                      <FormMessage>{errors.file.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <SubmitCancelButton
                loading={isSubmitting}
                cancelOnclick={() => {
                  setIsOpenHandler()
                  form.reset()
                }}
                className="w-36"
              >
                Upload Task
              </SubmitCancelButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
