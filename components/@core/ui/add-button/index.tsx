import { Button, ButtonProps } from '@/components/ui/button'
import React, { ReactNode } from 'react'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'
import { IoMdAddCircleOutline } from 'react-icons/io'

type AddButtonProps = ButtonProps & {
  children?: ReactNode
  className?: ClassNameValue
}

const AddButton = ({ children, className, ...props }: AddButtonProps) => {
  return (
    <Button {...props} className={cn('gap-1.5', className)}>
      {children}
      <IoMdAddCircleOutline size="1.3rem" />
    </Button>
  )
}

export default AddButton
