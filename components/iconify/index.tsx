'use client'
import { cn } from '@/lib/utils'
import { Icon, IconProps } from '@iconify/react/dist/iconify.js'
import { ClassNameValue } from 'tailwind-merge'

type CustomIconProps = {
  icon: string
  className?: ClassNameValue
} & IconProps

export const CustomIcon = ({ icon, className, ...props }: CustomIconProps) => {
  return <Icon className={cn('text-base', className)} icon={icon} {...props} />
}
