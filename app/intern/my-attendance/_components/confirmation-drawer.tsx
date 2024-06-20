import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import AddButton from '@/components/@core/ui/add-button'
import { ReactNode, Dispatch, SetStateAction } from 'react'
import useMediaQuery from '@/hooks/useMediaQuery'

type AttendanceDrawerProps = {
  mode: string
  isTriggerDisabled: boolean
  isOpen?: boolean
  setIsOpenHandler: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

export const AttendanceDrawer = ({
  mode,
  isTriggerDisabled,
  children,
  isOpen,
  setIsOpenHandler,
}: AttendanceDrawerProps) => {
  return ( 
    <Drawer open={isOpen} onOpenChange={setIsOpenHandler}>
      <DrawerTrigger asChild>
        <AddButton disabled={isTriggerDisabled} className="w-full lg:w-auto">
          {mode}
        </AddButton>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm py-8 pb-20 px-4">
          <DrawerHeader>
            <DrawerTitle>Attendance - {mode}</DrawerTitle>
            <DrawerDescription>
              Please verify the information. Click save when you&apos;re done.
            </DrawerDescription>
          </DrawerHeader>
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
