import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { ReactNode, Dispatch, SetStateAction } from 'react'
import { Button } from '@/components/ui/button'
import { TooltipWrapper } from '@/components/ui/tooltip'
import { MdOutlineDeleteOutline } from 'react-icons/md'

type DeleteDrawerProps = {
  taskName: string
  isOpen?: boolean
  setIsOpenHandler: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

export const DeleteDrawer = ({
  taskName,
  isOpen,
  setIsOpenHandler,
  children,
}: DeleteDrawerProps) => {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpenHandler}>
      <DrawerTrigger>
        <TooltipWrapper tooltip="Delete Task">
          <Button
            variant="ghost"
            size="circle"
            className="text-muted-foreground"
          >
            <MdOutlineDeleteOutline size="1.1rem" />
          </Button>
        </TooltipWrapper>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm pt-6 pb-20 px-4">
          <DrawerHeader>
            <DrawerTitle>Delete Task</DrawerTitle>
            <DrawerDescription>
              You are about to delete the task entitled{' '}
              <span className="font-semibold">{taskName}</span>. Please confirm
              your action.
            </DrawerDescription>
          </DrawerHeader>
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
