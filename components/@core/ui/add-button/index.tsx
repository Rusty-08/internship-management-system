import { Button, ButtonProps } from '@/components/ui/button'
import React, { ReactNode } from 'react'
import { CustomIcon } from '@/components/@core/iconify'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'
import { IoMdAddCircleOutline } from 'react-icons/io'

type AddButtonProps = ButtonProps & {
  children?: ReactNode
  className?: ClassNameValue
}

const AddButton = ({ children, className, ...props }: AddButtonProps) => {
  return (
    <Button {...props} className={cn('gap-2', className)}>
      {children}
      <IoMdAddCircleOutline size="1.3rem" />
    </Button>
  )
}

export default AddButton
