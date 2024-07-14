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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  table: TableType<TData>
  searchOutput?: string
}

export function DataTable<TData, TValue>({
  columns,
  table,
  searchOutput,
}: DataTableProps<TData, TValue>) {
  return (
    <div className="border-y overflow-hidden">
      <Table>
        <TableHeader className="bg-card">
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
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
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
                <NoRecords searchOutput={searchOutput} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
