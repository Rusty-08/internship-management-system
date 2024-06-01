'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

type BackButtonProps = {
  label: string
  href: string
}

export const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <div className="font-normal flex justify-center text-sm text-muted-foreground w-full">
      Don&apos;t have an account?
      <Link href={href} className="font-medium ms-1 hover:underline">
        {label}
      </Link>
    </div>
  )
}
