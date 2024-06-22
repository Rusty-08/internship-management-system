import { Dispatch, SetStateAction } from 'react'
import DeleteForm from './delete-form'
import DeleteDialog from './delete-dialog'
import useMediaQuery from '@/hooks/useMediaQuery'
import { DeleteDrawer } from './delete-drawer'

type ArchiveConfirmationProps = {
  taskName: string
  deleteTask: () => void
  loading: boolean
  isOpen: boolean
  setIsOpenHandler: Dispatch<SetStateAction<boolean>>
}

const DeleteConfirmation = ({
  taskName,
  deleteTask,
  isOpen,
  loading,
  setIsOpenHandler,
}: ArchiveConfirmationProps) => {
  const isMobile = useMediaQuery('(max-width: 599px)')

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()
    deleteTask()
  }

  const DeleteComponent = isMobile ? DeleteDrawer : DeleteDialog

  return (
    <DeleteComponent
      taskName={taskName}
      isOpen={isOpen}
      setIsOpenHandler={setIsOpenHandler}
    >
      <DeleteForm
        onSubmitForm={handleSubmit}
        isSubmitting={loading}
        isOpen={isOpen}
        setIsOpenHandler={setIsOpenHandler}
      />
    </DeleteComponent>
  )
}

export default DeleteConfirmation
