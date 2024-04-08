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
import Image from 'next/image'

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
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted">
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead key={header.id} className="px-4">
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
                  <TableCell key={cell.id} className="px-4 text-text">
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
                <div className="flex justify-center flex-col items-center pb-4">
                  <Image
                    alt="no records"
                    loading="eager"
                    src={'/general/images/no-records.svg'}
                    width="0"
                    height="0"
                    className="h-[15rem] w-auto object-cover"
                  />
                  <h1 className="text-lg text-text text-center w-2/3 font-medium">
                    {searchOutput !== undefined
                      ? 'No Records Found for'
                      : 'No Records Found'}
                    {searchOutput !== undefined && (
                      <span className="text-secondary-foreground">
                        {` "${searchOutput}"`}
                      </span>
                    )}
                  </h1>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
