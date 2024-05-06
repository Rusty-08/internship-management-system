import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { InternsUsersSubset } from './accounts-columns'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CustomIcon } from '@/components/@core/iconify'
import { LoadingSpinner } from '@/components/@core/loading'

type ArchiveConfirmationProps = {
  user: InternsUsersSubset | undefined
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
              <CustomIcon
                className={`${isArchivedPage ? 'text-text' : 'text-red-500'}`}
                icon={isArchivedPage ? 'eva:info-fill' : 'bx:bxs-error'}
              />
              <AlertTitle>Reminder</AlertTitle>
              <AlertDescription>
                If you confirm this action, the user{' '}
                {isArchivedPage ? 'can now' : 'will no longer'} be able to
                access the system.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button disabled={loading} type="submit" className="w-full">
              {loading ? <LoadingSpinner /> : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
