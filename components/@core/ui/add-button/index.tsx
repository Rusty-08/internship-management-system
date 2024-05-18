import { Button, ButtonProps } from '@/components/ui/button'
import React, { ReactNode } from 'react'
import { CustomIcon } from '@/components/@core/iconify'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'

type AddButtonProps = ButtonProps & {
  children?: ReactNode
  className?: ClassNameValue
}

const AddButton = ({ children, className, ...props }: AddButtonProps) => {
  return (
    <Button {...props} className={cn('gap-2', className)}>
      {children}
      <CustomIcon icon="lucide:circle-plus" />
    </Button>
  )
}

export default AddButton
