'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

type BackButtonProps = {
  label: string
  href: string
}

export const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <Button variant="link" className="font-normal text-muted-foreground w-full">
      <Link href={href}>{label}</Link>
    </Button>
  )
}
