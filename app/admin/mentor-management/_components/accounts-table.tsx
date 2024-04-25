'use client'

import {
  Row,
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
import { FormDialog } from './register-form'
import { z } from 'zod'
import { RegistrationSchema } from './registration-schema'
import { MentorUsersSubset, accountColumns } from './accounts-column'

export function AccountsTable({ data }: { data: MentorUsersSubset[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [formMode, setFormMode] = useState<'edit' | 'create' | 'view'>('create')
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [editData, setEditData] = useState<z.infer<typeof RegistrationSchema>>({
    id: '',
    name: '',
    email: '',
    expertise: '',
  })

  const handleEdit = (row: Row<MentorUsersSubset>) => {
    setFormMode('edit')
    setIsOpen(true)
    setEditData({
      id: row.original.id || '',
      name: row.original.name || '',
      email: row.original.email || '',
      expertise: row.original.role || '',
    })
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
    columns: accountColumns(actions),
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
    <div>
      <div className="flex items-center justify-between mb-4">
        <SearchFilter column="name" table={table} search="mentor" />
        <FormDialog
          mode={formMode}
          setMode={setFormMode}
          initialValues={editData}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
      <div className="rounded-md border overflow-hidden">
        <DataTable
          columns={accountColumns(actions)}
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
