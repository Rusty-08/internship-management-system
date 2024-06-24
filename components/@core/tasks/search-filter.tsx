import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { ClassNameValue } from 'tailwind-merge'
import { FiSearch } from 'react-icons/fi'

type SearchFilterProps = {
  // search: string
  // setSearch: Dispatch<SetStateAction<string>>
  className?: ClassNameValue
}

export function SearchFilter({
  // search,
  // setSearch,
  className,
  ...props
}: SearchFilterProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handleSearch = (task: string) => {
    const params = new URLSearchParams(searchParams)
    // setSearch(task)
    if (task) {
      params.set('task', task)
    } else {
      params.delete('task')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  // useEffect(() => {
  //   const query = searchParams.get('task')
  //   setSearch(query ?? '')
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

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
