'use client'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { ClassNameValue } from 'tailwind-merge'
import { FiSearch } from 'react-icons/fi'
import { useDebounce } from 'use-debounce'

type SearchFilterProps = {
  className?: ClassNameValue
}

export function SearchFilter({ className, ...props }: SearchFilterProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const [handleSearch] = useDebounce((task: string) => {
    const params = new URLSearchParams(searchParams)
    if (task) {
      params.set('task', task)
    } else {
      params.delete('task')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 200)

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
