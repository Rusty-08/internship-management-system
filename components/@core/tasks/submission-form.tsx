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
import { FieldErrors, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { SubmissionSchema } from './task-schema'
import { Dispatch, SetStateAction } from 'react'

type SubmissionFormProps = {
  form: UseFormReturn<{
    file?: File
  }, any, undefined>
  onSubmitForm: (values: z.infer<typeof SubmissionSchema>) => Promise<void>
  isSubmitting: boolean
  errors: FieldErrors<{
    file: File
  }>
  setIsOpenHandler: Dispatch<SetStateAction<boolean>>
}

const SubmissionForm = ({
  form,
  onSubmitForm,
  isSubmitting,
  errors,
  setIsOpenHandler,
}: SubmissionFormProps) => {
  return (
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
        <div className="mt-6">
          <SubmitCancelButton
            loading={isSubmitting}
            cancelOnclick={() => {
              setIsOpenHandler(false)
              form.reset()
            }}
            className="w-full lg:w-36"
          >
            Upload Task
          </SubmitCancelButton>
        </div>
      </form>
    </Form>
  )
}

export default SubmissionForm
