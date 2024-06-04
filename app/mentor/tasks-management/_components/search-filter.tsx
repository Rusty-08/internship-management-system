import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { ClassNameValue } from 'tailwind-merge'
import { useDebouncedCallback } from 'use-debounce'
import { FiSearch } from 'react-icons/fi'

type SearchFilterProps = {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  className?: ClassNameValue
}

export function SearchFilter({
  search,
  setSearch,
  className,
  ...props
}: SearchFilterProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((task: string) => {
    setSearch(task)
    const params = new URLSearchParams(searchParams)
    replace(`${pathname}?${params.toString()}`)
  }, 200)

  return (
    <Input
      icon={FiSearch}
      placeholder="Search tasks"
      onChange={event => handleSearch(event.target.value)}
      defaultValue={searchParams.get(search || '')?.toString()}
      className={cn('max-w-sm bg-card', className)}
      {...props}
    />
  )
}
