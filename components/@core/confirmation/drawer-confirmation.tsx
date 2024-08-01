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
import { cn } from '@/lib/utils'
import { ClassNameValue } from 'tailwind-merge'

type DrawerConfirmationProps = {
  trigger: ReactNode
  title: string
  description: string
  isPending: boolean
  isOpen?: boolean
  setIsOpenHandler: Dispatch<SetStateAction<boolean>>
  isAddButton?: boolean
  isSubmitting: boolean
  className?: ClassNameValue
  children: ReactNode
}

export const DrawerConfirmation = ({
  trigger,
  title,
  description,
  isPending = false,
  isOpen,
  setIsOpenHandler,
  isAddButton,
  isSubmitting,
  className,
  children,
}: DrawerConfirmationProps) => {
  const handleOpenChange = (val: boolean) => {
    if (!isSubmitting) {
      setIsOpenHandler(val)
    }
  }

  return (
    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <Button
          disabled={isPending}
          className={cn(
            'w-full gap-1.5 mt-2 lg:mt-0',
            isAddButton &&
              'h-12 md:h-10 z-50 gap-3 md:gap-1.5 px-4',
            className,
          )}
        >
          {trigger}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm pt-6 pb-12 px-4">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
