import Link from 'next/link'
import React, { ReactNode } from 'react'
import { LuChevronRight } from 'react-icons/lu'

type StatCardLinkProps = {
  children: ReactNode
  path: string
}

export const StatCardLink = ({ children, path = '/admin' }: StatCardLinkProps) => {
  return (
    <Link href={path} className='text-xs relative group hover:text-primary transition-all ease-in-out duration-300 font-medium flex items-center justify-center mr-4 gap-2'>
      {children}
      <LuChevronRight size="1rem" className="flex-shrink-0 absolute -right-3 group-hover:-right-4 transition-[right] duration-300 ease-in-out -me-2" />
    </Link>
  )
}
