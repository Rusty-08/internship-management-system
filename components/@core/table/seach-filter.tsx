import { Input } from '@/components/ui/input'
import { Table } from '@tanstack/react-table'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'

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

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set(search || '', term)
      table.getColumn(column)?.setFilterValue(term)
    } else {
      params.delete(search || '')
      table.getColumn(column)?.setFilterValue(undefined)
    }
    replace(`${pathName}?${params.toString()}`)
  }, 200)

  useEffect(() => {
    const query = searchParams.get(search || '')
    if (query) {
      table.getColumn(column)?.setFilterValue(query)
    }
  }, [column, searchParams, table, search])

  return (
    <Input
      placeholder="Search by name"
      onChange={event => handleSearch(event.target.value)}
      defaultValue={searchParams.get(search || '')?.toString()}
      className="max-w-sm"
    />
  )
}
