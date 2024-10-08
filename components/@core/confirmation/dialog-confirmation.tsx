import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { ReactNode, Dispatch, SetStateAction } from 'react'
import { Button } from '@/components/ui/button'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'

type DialogConfirmationProps = {
  trigger: ReactNode
  title: string
  description: ReactNode
  isPending?: boolean
  isOpen?: boolean
  setIsOpenHandler: Dispatch<SetStateAction<boolean>>
  isAddButton?: boolean
  isSubmitting: boolean
  className?: ClassNameValue
  children: ReactNode
}

const DialogConfirmation = ({
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
}: DialogConfirmationProps) => {
  const handleOpenChange = (val: boolean) => {
    if (!isSubmitting) {
      setIsOpenHandler(val)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          disabled={isPending}
          className={cn(
            'w-full gap-1.5 mt-2 lg:mt-0',
            isAddButton && 'h-12 z-50 md:h-10 gap-3 md:gap-1.5 px-4',
            className,
          )}
        >
          {trigger}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-full lg:w-[30rem]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default DialogConfirmation
