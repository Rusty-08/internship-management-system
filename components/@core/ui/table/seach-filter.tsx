import { Input } from '@/components/ui/input'
import { Table } from '@tanstack/react-table'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'

interface SearchFilterProps<TData> {
  column: string
  table: Table<TData>
  search?: string
}

export function SearchFilter<TData>({
  column,
  table,
  search,
}: SearchFilterProps<TData>) {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams)

    if (term) {
      params.set(search || '', term)
      table.getColumn(column)?.setFilterValue(term)
    } else {
      params.delete(search || '')
      table.getColumn(column)?.setFilterValue(undefined)
    }

    replace(`${pathName}?${params.toString()}`)
  }

  useEffect(() => {
    const query = searchParams.get(search || '')
    if (query) {
      table.getColumn(column)?.setFilterValue(query)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Input
      placeholder="Search user by name"
      icon={FiSearch}
      onChange={event => handleSearch(event.target.value)}
      defaultValue={searchParams.get(search || '')?.toString()}
      className="w-[25rem] bg-card"
    />
  )
}
