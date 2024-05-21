'use client'
import { cn } from '@/lib/utils'
import { Icon, IconProps, IconifyIcon } from '@iconify/react/dist/iconify.js'
import { ClassNameValue } from 'tailwind-merge'

type CustomIconProps = {
  icon: string | IconifyIcon
  className?: ClassNameValue
} & IconProps

export const CustomIcon = ({ icon, className, ...props }: CustomIconProps) => {
  return <Icon className={cn('text-xl', className)} icon={icon} {...props} />
}
