'use client'

import { UserSubset } from '@/components/@core/ui/table/account-table/types'
import { DataTable } from '@/components/@core/ui/table/data-table'
import { DataTablePagination } from '@/components/@core/ui/table/pagination'
import { SearchFilter } from '@/components/@core/ui/table/seach-filter'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { fetchMentorUsers } from '@/utils/users'
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
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState, useCallback } from 'react'
import { z } from 'zod'
import { ArchiveConfirmation } from './archive-confirmation'
import { FormDialog } from './register-form'
import { RegistrationSchema } from './registration-schema'
import SelectFilter from '@/components/@core/tasks/status-filter'
import { useUpdateParams } from '@/hooks/useUpdateParams'

type AccountsTableProps = {
  data: UserSubset[]
  isArchivedPage?: boolean
  user?: 'INTERN' | 'MENTOR'
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
  const { searchParams, updateParams } = useUpdateParams()
  const [roleFilter, setRoleFilter] = useState(searchParams.get('role') || 'all')
  const [formMode, setFormMode] = useState<'edit' | 'create'>('create')
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [archiveIntern, setArchiveIntern] = useState<Row<UserSubset> | null>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mentors, setMentors] = useState<UserSubset[]>([])
  const [editData, setEditData] = useState<z.infer<typeof RegistrationSchema>>({
    id: '',
    name: '',
    email: '',
    mentor: '',
    expertise: '',
    course: '',
    totalHours: undefined,
  })

  const filteredData = useMemo(() => {
    return roleFilter !== 'all'
      ? data.filter(d => d.role === roleFilter.toUpperCase())
      : data
  }, [roleFilter, data])

  const handleEdit = (row: Row<UserSubset>) => {
    setFormMode('edit')
    setIsOpen(true)
    setEditData({
      id: row.original.id || '',
      name: row.original.name || '',
      email: row.original.email || '',
      mentor: row.original.mentorId || '',
      expertise: row.original.expertise || '',
      course: row.original.course || '',
      totalHours: row.original.totalHours || undefined,
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
      setLoading(false)
      setOpenDialog(false)
      router.refresh()
    } catch {
      console.error('Could not archive user')
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

  useEffect(() => {
    // for listing mentors in the select dropdown
    const fetchMentors = async () => {
      const data = await fetchMentorUsers()
      setMentors(data)
    }
    fetchMentors()
  }, [])

  return (
    <div className='flex flex-col gap-4'>
      <ArchiveConfirmation
        isOpen={openDialog}
        user={archiveIntern?.original}
        setIsOpenHandler={() => setOpenDialog(!openDialog)}
        archive={handleArchive}
        loading={loading}
        isArchivedPage={isArchivedPage}
      />
      <div className="flex items-center justify-between">
        <div className="flex w-full justify-between">
          <SearchFilter
            column="name"
            table={table}
            search={user ? user.toLowerCase() : 'user'}
          />
          {isArchivedPage && (
            <SelectFilter
              defaultValue='all'
              value={roleFilter}
              handleStatusChange={role => {
                setRoleFilter(role)
                updateParams('role', role)
              }}
              items={[
                { value: 'all', name: 'Role', color: 'all' },
                { value: 'intern', name: 'Interns', color: 'bg-completed' },
                { value: 'mentor', name: 'Mentors', color: 'bg-primary' },
              ]}
              className='w-32'
            />
          )}
        </div>
        {!isArchivedPage && user && (
          <FormDialog
            mode={formMode}
            setMode={setFormMode}
            initialValues={editData}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            role={user}
            mentors={mentors}
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
      <div className="flex items-center justify-between">
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}
