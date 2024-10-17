import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { LoadingSpinner } from '@/components/@core/loading'

import { IoWarningOutline } from 'react-icons/io5'
import { IoInformationCircleOutline } from 'react-icons/io5'
import { UserSubset } from './types'
import SubmitCancelButton from '@/components/@core/button/submit-cancel'

type ArchiveConfirmationProps = {
  user: UserSubset | undefined
  archive: () => void
  loading: boolean
  isOpen: boolean
  setIsOpenHandler: () => void
  isArchivedPage?: boolean
}

export function ArchiveConfirmation({
  user,
  archive,
  isOpen,
  loading,
  isArchivedPage,
  setIsOpenHandler,
}: ArchiveConfirmationProps) {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()
    archive()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpenHandler}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isArchivedPage ? 'Restore' : 'Archive'} User Account
          </DialogTitle>
          <DialogDescription>
            You are about to {isArchivedPage ? 'restore' : 'archive'} the
            account of <span className="font-semibold">{user?.name}</span>.
            Please confirm your action.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Alert variant={isArchivedPage ? 'default' : 'destructive'}>
              {isArchivedPage ? (
                <IoInformationCircleOutline
                  size="1.3rem"
                  className="text-text"
                />
              ) : (
                <IoWarningOutline size="1.3rem" className="text-red-500" />
              )}
              <AlertTitle>Reminder</AlertTitle>
              <AlertDescription>
                If you confirm this action, the user{' '}
                {isArchivedPage ? 'can now' : 'will no longer'} be able to
                access the system.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <SubmitCancelButton
              cancelOnclick={setIsOpenHandler}
              loading={loading}
              className="w-full md:w-40"
            >
              Save Changes
            </SubmitCancelButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
