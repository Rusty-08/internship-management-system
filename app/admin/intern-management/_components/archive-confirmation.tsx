import { LoadingSpinner } from '@/components/@core/spinner/circular'
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
            You are about to {isArchivedPage ? 'restore' : 'archive'}{' '}
            <span className="font-semibold">{user?.name}</span>. Please confirm
            your action.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <DialogFooter>
            <Button type="submit" className="w-full">
              {loading ? <LoadingSpinner /> : 'Save changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
