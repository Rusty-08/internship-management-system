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

type SubmissionDrawerProps = {
  isPending: boolean
  isOpen?: boolean
  setIsOpenHandler: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

export const SubmissionDrawer = ({
  isPending,
  isOpen,
  setIsOpenHandler,
  children,
}: SubmissionDrawerProps) => {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpenHandler}>
      <DrawerTrigger asChild>
        <Button disabled={isPending} className="w-full lg:w-max mt-2 lg:mt-0">
          Upload Report
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm py-8 pb-20 px-4">
          <DrawerHeader>
            <DrawerTitle>Task Submission</DrawerTitle>
            <DrawerDescription>Submit your task report here</DrawerDescription>
          </DrawerHeader>
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
