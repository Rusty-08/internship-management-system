import { SubmissionSchema } from '@/components/@core/tasks/task-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import { handleFileUpload } from '@/utils/upload-file'
import SubmissionForm from './submission-form'
import SubmissionDialog from './submission-dialog'
import { SubmissionDrawer } from './submission-drawer'
import { Dispatch, SetStateAction } from 'react'
import useMediaQuery from '@/hooks/useMediaQuery'

type TaskDetailProps = {
  taskId: string
  isOpen: boolean
  isPending: boolean
  setIsOpenHandler: Dispatch<SetStateAction<boolean>>
}

export function TaskSubmission({
  taskId,
  isOpen,
  isPending,
  setIsOpenHandler,
}: TaskDetailProps) {
  const router = useRouter()
  const isMobile = useMediaQuery('(max-width: 599px)')

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
    setIsOpenHandler(false)
    router.refresh()
  }

  const { errors, isSubmitting } = form.formState

  const handleOpenChange = () => {
    setIsOpenHandler(!isOpen)
    form.reset()
  }

  const Submission = isMobile ? SubmissionDrawer : SubmissionDialog

  return (
    <Submission
      isPending={isPending}
      isOpen={isOpen}
      setIsOpenHandler={setIsOpenHandler}
    >
      <Form {...form}>
        <SubmissionForm
          form={form}
          onSubmitForm={onSubmitForm}
          isSubmitting={isSubmitting}
          errors={errors}
          setIsOpenHandler={handleOpenChange}
        />
      </Form>
    </Submission>
  )
}
