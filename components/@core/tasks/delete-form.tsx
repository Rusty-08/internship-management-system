import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { DialogFooter } from '@/components/ui/dialog'
import React, { Dispatch, FormEventHandler, SetStateAction } from 'react'
import { IoWarningOutline } from 'react-icons/io5'
import SubmitCancelButton from '../button/submit-cancel'

type SubmissionFormProps = {
  onSubmitForm: FormEventHandler<HTMLFormElement>
  isSubmitting: boolean
  isOpen: boolean
  setIsOpenHandler: Dispatch<SetStateAction<boolean>>
}

const DeleteForm = ({
  onSubmitForm,
  isSubmitting,
  isOpen,
  setIsOpenHandler,
}: SubmissionFormProps) => {
  return (
    <form onSubmit={onSubmitForm}>
      <div className="mb-4">
        <Alert variant="destructive">
          <IoWarningOutline size="1.3rem" className="text-red-500" />
          <AlertTitle>Reminder</AlertTitle>
          <AlertDescription>
            If you confirm this action, the task will no longer be able to be
            restored.
          </AlertDescription>
        </Alert>
      </div>
      <div className="mt-6">
        <SubmitCancelButton
          cancelOnclick={() => setIsOpenHandler(!isOpen)}
          loading={isSubmitting}
          className="w-full lg:w-40"
        >
          Save Changes
        </SubmitCancelButton>
      </div>
    </form>
  )
}

export default DeleteForm
