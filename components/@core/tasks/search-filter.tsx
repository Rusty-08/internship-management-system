'use client'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FiSearch } from 'react-icons/fi'
import { ClassNameValue } from 'tailwind-merge'
import { useDebouncedCallback } from 'use-debounce'

type SearchFilterProps = {
  className?: ClassNameValue
}

export function SearchFilter({ className, ...props }: SearchFilterProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((task: string) => {
    const params = new URLSearchParams(searchParams)
    task ? params.set('task', task) : params.delete('task')
    replace(`${pathname}?${params.toString()}`)
  }, 300)

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
