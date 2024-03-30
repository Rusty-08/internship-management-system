import { Input } from '@/components/ui/input'
import { Table } from '@tanstack/react-table'

interface SearchFilterProps<TData> {
  column: string
  table: Table<TData>
}

export function SearchFilter<TData>({
  column,
  table,
}: SearchFilterProps<TData>) {
  return (
    <Input
      placeholder="Search by name"
      value={(table.getColumn(column)?.getFilterValue() as string) ?? ''}
      onChange={event =>
        table.getColumn(column)?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />
  )
}
