'use client'
import {
  ColumnFiltersState,
  Row,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { InternsUsersSubset, accountColumns } from './accounts-columns'
import { FormDialog } from './register-form'
import { z } from 'zod'
import { RegistrationSchema } from './registration-schema'
import { SearchFilter } from '@/components/@core/ui/table/seach-filter'
import { DataTable } from '@/components/@core/ui/table/data-table'
import { DataTablePagination } from '@/components/@core/ui/table/pagination'

export default function AccountsTable({
  data,
  simpleTable,
}: {
  data: InternsUsersSubset[]
  simpleTable?: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [formMode, setFormMode] = useState<
    'edit' | 'create' | 'view' | 'archive'
  >('create')
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [editData, setEditData] = useState<z.infer<typeof RegistrationSchema>>({
    id: '',
    name: '',
    email: '',
    mentor: '',
  })

  const handleEdit = (row: Row<InternsUsersSubset>) => {
    setFormMode('edit')
    setIsOpen(true)
    setEditData({
      id: row.original.id || '',
      name: row.original.name || '',
      email: row.original.email || '',
      mentor: row.original.mentorId || '',
    })
  }

  const handleArchive = async (row: Row<InternsUsersSubset>) => {
    try {
      await fetch('/api/auth/users/update-account', {
        method: 'PUT',
        body: JSON.stringify({
          id: row.original.id || '',
          name: row.original.name || '',
          email: row.original.email || '',
          isArchived: row.original.isArchived ? false : true,
        }),
      })
      location.reload()
    } catch {
      console.error('Could not archive user')
    }
  }

  const actions = {
    edit: handleEdit,
    archive: handleArchive,
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
    <div className="py-5">
      <div className="flex items-center justify-between mb-4">
        <SearchFilter column="name" table={table} search="intern" />
        {simpleTable && (
          <>
            <FormDialog
              mode={formMode}
              setMode={setFormMode}
              initialValues={editData}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </>
        )}
      </div>
      <div className="rounded-md border overflow-hidden ">
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
