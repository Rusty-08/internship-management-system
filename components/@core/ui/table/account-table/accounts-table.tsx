'use client'

import { UserSubset } from '@/components/@core/ui/table/account-table/types'
import { DataTable } from '@/components/@core/ui/table/data-table'
import { DataTablePagination } from '@/components/@core/ui/table/pagination'
import { SearchFilter } from '@/components/@core/ui/table/seach-filter'
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
import { useCallback, useMemo, useState } from 'react'
import { ArchiveConfirmation } from './archive-confirmation'
import SelectFilter, {
  ItemsProps,
} from '@/components/@core/tasks/status-filter'
import { useUpdateParams } from '@/hooks/useUpdateParams'
import AddButton from '../../add-button'
import Link from 'next/link'
import { Batch } from '@prisma/client'

type AccountsTableProps = {
  batchesFilter?: ItemsProps[]
  data: UserSubset[]
  isArchivedPage?: boolean
  user?: 'INTERN' | 'MENTOR'
  accountColumns: (actions: {
    [key: string]: (row: Row<UserSubset>) => void
  }) => ColumnDef<UserSubset, any>[]
}

export default function AccountsTable({
  batchesFilter,
  data,
  isArchivedPage = false,
  user,
  accountColumns,
}: AccountsTableProps) {
  const router = useRouter()
  const { searchParams, updateParams } = useUpdateParams()
  const [roleFilter, setRoleFilter] = useState(
    searchParams.get('role') || 'all',
  )
  const [activeBatch, setActiveBatch] = useState(
    searchParams.get('batch') ||
      (batchesFilter ? batchesFilter[batchesFilter.length - 1].name : ''),
  )
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    {
      id: 'name',
      value: searchParams.get(user ? user.toLowerCase() : 'user') ?? '',
    },
  ])
  const [archiveIntern, setArchiveIntern] = useState<Row<UserSubset> | null>(
    null,
  )
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)

  const filteredData = useMemo(() => {
    return roleFilter !== 'all'
      ? data.filter(_user => _user.role === roleFilter.toUpperCase()) // for role in archived records table
      : batchesFilter && activeBatch !== 'all'
      ? data.filter(_user => _user.batch === activeBatch) // for interns-management table in batch filter
      : data
  }, [roleFilter, data, batchesFilter, activeBatch])

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

  const getActiveBatch = () => {
    return activeBatch
  }

  const actions = {
    openArchiveConfirmation,
    getActiveBatch,
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
    <div className="flex flex-col gap-4">
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
              defaultValue="all"
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
              className="w-32"
            />
          )}
        </div>
        {!isArchivedPage && user && (
          <div className="flex space-x-4">
            <SelectFilter
              defaultValue={batchesFilter ? batchesFilter[0].value : ''}
              value={activeBatch}
              handleStatusChange={batch => {
                setActiveBatch(batch)
                updateParams('batch', batch)
              }}
              items={batchesFilter}
            />
            <Link href={`/admin/${user.toLowerCase()}-management/create-user`}>
              <AddButton>Add New Account</AddButton>
            </Link>
          </div>
        )}
      </div>
      <div className="rounded-md overflow-hidden ">
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
