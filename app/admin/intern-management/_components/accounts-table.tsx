'use client'

import {
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { useState } from 'react'
import { DataTablePagination } from '@/components/@core/table/pagination'
import { DataTable } from '@/components/@core/table/data-table'
import { SearchFilter } from '@/components/@core/table/seach-filter'
import { InternsUsersSubset, columns } from '../accounts'
import { FormDialog } from './register-form'

export default function AccountsTable({
  data,
}: {
  data: InternsUsersSubset[]
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const handleEdit = () => {
    setIsOpen(true)
  }

  const handleArchive = () => null
  const handleViewDetails = () => null

  const actions = {
    edit: handleEdit,
    archive: handleArchive,
    viewDetails: handleViewDetails,
  }

  const table = useReactTable({
    data,
    columns: columns(actions),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      rowSelection,
      columnFilters,
    },
  })

  return (
    <div className="py-5">
      <div className="flex items-center justify-between mb-4">
        <SearchFilter column="name" table={table} />
        <FormDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div className="rounded-md border overflow-hidden">
        <DataTable
          columns={columns(actions)}
          table={table}
          searchOutput={`${columnFilters[0]?.value}`}
        />
      </div>
      <div className="flex items-center justify-between py-3">
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}
