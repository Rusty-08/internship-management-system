import Link from 'next/link'
import { Button, ButtonProps } from './button'
import { ReactNode } from 'react'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'
import { IconType } from 'react-icons/lib'

type LinkButtonProps = {
  path: string
  icon?: IconType
  children: ReactNode
  iconClassName?: ClassNameValue
  className?: ClassNameValue
} & ButtonProps

export const LinkButton = ({
  path,
  icon: Icon,
  iconClassName,
  className,
  children,
  ...props
}: LinkButtonProps) => {
  return (
    <Button className={cn('', Icon && 'pe-7', className)} {...props}>
      <Link
        href={path}
        className="w-full h-full gap-1.5 flex items-center justify-center"
      >
        {Icon && <Icon size="1.3rem" className={cn('', iconClassName)} />}
        {children}
      </Link>
    </Button>
  )
}
