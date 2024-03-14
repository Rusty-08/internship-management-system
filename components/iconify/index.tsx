'use client'
import { Icon } from '@iconify/react/dist/iconify.js'

type CustomIconProps = {
  icon: string
}

export const CustomIcon = ({ icon }: CustomIconProps) => {
  return <Icon icon={icon} />
}
