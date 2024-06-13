'use client'

import { PiCopyrightDuotone } from 'react-icons/pi'
import Link from 'next/link'

type BackButtonProps = {
  label: string
  href: string
}

export const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <div className="font-normal mt-6 flex justify-center text-sm text-muted-foreground w-full gap-1">
      <div className="flex items-center gap-1">
        <p>2024 - {new Date().getFullYear()}</p>
        <PiCopyrightDuotone />
      </div>
      {'•'}
      <Link href={href} className="font-medium text-primary hover:underline">
        {label}
      </Link>
    </div>
  )
}
