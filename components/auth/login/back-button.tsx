'use client'

import { PiCopyrightDuotone } from 'react-icons/pi'
import Link from 'next/link'

type BackButtonProps = {
  label: string
  href: string
}

export const BackButton = ({ label, href }: BackButtonProps) => {
  const currentYear = new Date().getFullYear()

  return (
    <div className="font-normal mt-2 flex justify-center text-sm text-muted-foreground w-full gap-1">
      <div className="flex text-sm items-center gap-1">
        <p>{currentYear == 2024 ? '2024' : `2024 - ${currentYear}`}</p>
        <PiCopyrightDuotone size='1rem' />
      </div>
      {'•'}
      <Link href={href} className="font-medium text-sm text-primary hover:underline">
        {label}
      </Link>
    </div>
  )
}
