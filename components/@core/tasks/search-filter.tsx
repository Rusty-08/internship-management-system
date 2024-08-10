'use client'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { FiSearch } from 'react-icons/fi'
import { ClassNameValue } from 'tailwind-merge'

type SearchFilterProps = {
  defaultValue: string
  handleSearch: (term: string) => void
  className?: ClassNameValue
}

export function SearchFilter({
  handleSearch,
  defaultValue,
  className,
  ...props
}: SearchFilterProps) {
  return (
    <Input
      icon={FiSearch}
      placeholder="Search tasks"
      onChange={event => handleSearch(event.target.value)}
      defaultValue={defaultValue}
      className={cn('w-full bg-card', className)}
      {...props}
    />
  )
}
