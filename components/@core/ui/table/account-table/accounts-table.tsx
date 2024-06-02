'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { FormDialog } from './register-form'
import { z } from 'zod'
import { RegistrationSchema } from './registration-schema'
import { SearchFilter } from '@/components/@core/ui/table/seach-filter'
import { DataTable } from '@/components/@core/ui/table/data-table'
import { DataTablePagination } from '@/components/@core/ui/table/pagination'
import { useRouter } from 'next/navigation'
import { ArchiveConfirmation } from './archive-confirmation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { UserSubset } from '@/components/@core/ui/table/account-table/types'

const filters = ['All', 'Intern', 'Mentor']

type AccountsTableProps = {
  data: UserSubset[]
  isArchivedPage?: boolean
  user: 'INTERN' | 'MENTOR'
  accountColumns: (actions: {
    [key: string]: (row: Row<UserSubset>) => void
  }) => ColumnDef<UserSubset, any>[]
}

export default function AccountsTable({
  data,
  isArchivedPage = false,
  user,
  accountColumns,
}: AccountsTableProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [roleFilter, setRoleFilter] = useState('All')
  const [formMode, setFormMode] = useState<'edit' | 'create'>('create')
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [archiveIntern, setArchiveIntern] = useState<Row<UserSubset> | null>(
    null,
  )
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editData, setEditData] = useState<z.infer<typeof RegistrationSchema>>({
    id: '',
    name: '',
    email: '',
    mentor: '',
    expertise: '',
  })

  const filteredData = useMemo(
    () =>
      roleFilter !== 'All'
        ? data.filter(d => d.role === roleFilter.toUpperCase())
        : data,
    [roleFilter, data],
  )

  const handleEdit = (row: Row<UserSubset>) => {
    setFormMode('edit')
    setIsOpen(true)
    setEditData({
      id: row.original.id || '',
      name: row.original.name || '',
      email: row.original.email || '',
      mentor: row.original.mentorId || '',
      expertise: row.original.expertise || '',
    })
  }

  const handleArchive = async () => {
    setLoading(true)
    try {
      await fetch('/api/auth/users/update-account', {
        method: 'PUT',
        body: JSON.stringify({
          id: archiveIntern?.original.id || '',
          name: archiveIntern?.original.name || '',
          email: archiveIntern?.original.email || '',
          isArchived: archiveIntern?.original.isArchived ? false : true,
        }),
      })
    } catch {
      console.error('Could not archive user')
    } finally {
      router.refresh()
      setLoading(false)
      setOpenDialog(false)
    }
  }

  const openArchiveConfirmation = (row: Row<UserSubset>) => {
    setArchiveIntern(row)
    setOpenDialog(true)
  }

  const actions = {
    edit: handleEdit,
    openArchiveConfirmation,
  }

  const table = useReactTable({
    data: filteredData,
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
      <ArchiveConfirmation
        isOpen={openDialog}
        user={archiveIntern?.original}
        setIsOpenHandler={() => setOpenDialog(!openDialog)}
        archive={handleArchive}
        loading={loading}
        isArchivedPage={isArchivedPage}
      />
      <div className="flex items-center justify-between mb-4">
        <div className="flex w-full justify-between">
          <SearchFilter column="name" table={table} search="intern" />
          {isArchivedPage && (
            <Select
              onValueChange={value => setRoleFilter(value)}
              value={roleFilter}
              defaultValue={filters[0]}
            >
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {isArchivedPage &&
                  filters.map(filter => (
                    <SelectItem key={filter} value={filter ?? ''}>
                      {filter}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          )}
        </div>
        {!isArchivedPage && (
          <FormDialog
            mode={formMode}
            setMode={setFormMode}
            initialValues={editData}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            role={user}
          />
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
