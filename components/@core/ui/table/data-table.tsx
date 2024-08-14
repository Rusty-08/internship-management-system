import {
  ColumnDef,
  Table as TableType,
  flexRender,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import NoRecords from '../no-records'
import { cn } from '@/lib/utils'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  table: TableType<TData>
  searchOutput?: string
  noRecordMessage?: string
}

export function DataTable<TData, TValue>({
  columns,
  table,
  searchOutput,
  noRecordMessage
}: DataTableProps<TData, TValue>) {
  return (
    <div className="border rounded-md bg-card overflow-hidden">
      <Table>
        <TableHeader className="bg-muted">
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead
                    key={header.id}
                    className="px-6 py-2 text-xs font-semibold uppercase tracking-wide text-nowrap"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, idx) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className={cn('bg-transparent', idx % 2 !== 0 && 'bg-muted/50')}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id} className="px-6 py-2.5 text-text">
                    {(() => {
                      return flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )
                    })()}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <NoRecords searchOutput={searchOutput} noRecordMessage={noRecordMessage} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
