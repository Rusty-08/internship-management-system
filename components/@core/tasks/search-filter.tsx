'use client'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { ReadonlyURLSearchParams } from 'next/navigation'
import { FiSearch } from 'react-icons/fi'
import { ClassNameValue } from 'tailwind-merge'

type SearchFilterProps = {
  handleSearch: (term: string) => void
  searchParams: ReadonlyURLSearchParams
  className?: ClassNameValue
}

export function SearchFilter({ handleSearch, searchParams, className, ...props }: SearchFilterProps) {
  return (
    <Input
      icon={FiSearch}
      placeholder="Search tasks"
      onChange={event => handleSearch(event.target.value)}
      defaultValue={searchParams.get('task' || '')?.toString()}
      className={cn('w-full bg-card', className)}
      {...props}
    />
  )
}
