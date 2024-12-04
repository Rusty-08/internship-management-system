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
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ArchiveConfirmation } from './archive-confirmation'
import SelectFilter, {
  ItemsProps,
} from '@/components/@core/ui/table/select-filter'
import { useUpdateParams } from '@/hooks/useUpdateParams'
import AddButton from '../../add-button'
import Link from 'next/link'
import { Batch } from '@prisma/client'
import { LinkButton } from '@/components/ui/link-button'
import { MdAdd } from 'react-icons/md'

type AccountsTableProps = {
  batches?: Batch[]
  batchesFilter?: ItemsProps[]
  data: UserSubset[]
  isArchivedPage?: boolean
  user?: 'INTERN' | 'MENTOR'
  accountColumns: (
    actions: {
      [key: string]: (row: Row<UserSubset>) => void
    },
    selectedBatch?: string,
  ) => ColumnDef<UserSubset, any>[]
}

export default function AccountsTable({
  batches,
  batchesFilter,
  data,
  isArchivedPage = false,
  user,
  accountColumns,
}: AccountsTableProps) {
  const router = useRouter()
  const { searchParams, updateParams } = useUpdateParams()
  const [roleFilter, setRoleFilter] = useState('')
  const [activeBatch, setActiveBatch] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [archiveIntern, setArchiveIntern] = useState<Row<UserSubset> | null>(
    null,
  )
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)

  const recentBatch = batches?.[batches?.length - 1]

  const filteredData = useMemo(() => {
    if (isArchivedPage && roleFilter !== 'all') {
      return data.filter(_user => _user.role === roleFilter.toUpperCase())
    }

    if (batchesFilter && activeBatch !== 'all') {
      return data.filter(_user => _user.batchId === activeBatch)
    }

    return data
  }, [isArchivedPage, roleFilter, batchesFilter, activeBatch, data])

  const handleArchive = async () => {
    setLoading(true)

    try {
      if (archiveIntern) {
        const { id, name, email, isArchived } = archiveIntern.original

        await fetch('/api/auth/users/update-account', {
          method: 'PUT',
          body: JSON.stringify({
            id,
            name,
            email,
            isArchived: !isArchived,
          }),
        })
      }

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
    openArchiveConfirmation,
  }

  const table = useReactTable({
    data: filteredData,
    columns: accountColumns(actions, activeBatch),
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
    const searchFilters = [
      {
        id: 'name',
        value: searchParams.get(user ? user.toLowerCase() : 'user') ?? '',
      },
    ]

    const recentBatchFilter =
      batchesFilter?.[batchesFilter.length - 1].value || ''

    setActiveBatch(
      searchParams.get('batch') || recentBatch?.status !== 'COMPLETED'
        ? recentBatchFilter
        : 'all',
    )

    if (isArchivedPage) {
      setRoleFilter(searchParams.get('role') || 'all')
    }

    setColumnFilters(searchFilters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      <div className="flex items-center justify-between gap-2">
        <div className="flex w-full justify-between gap-2">
          <SearchFilter
            column="name"
            table={table}
            search={user ? user.toLowerCase() : 'user'}
            className="flex-grow"
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
          <div className="flex space-x-2">
            <SelectFilter
              defaultValue={
                batchesFilter
                  ? batchesFilter[batchesFilter.length - 1].value
                  : ''
              }
              value={activeBatch}
              handleStatusChange={batch => {
                setActiveBatch(batch)
                updateParams('batch', batch)
              }}
              items={batchesFilter}
            />
            {/* <Link href={`/admin/${user.toLowerCase()}-management/create-user`}>
              <AddButton>Add New Account</AddButton>
            </Link> */}
            <LinkButton
              path={`/admin/${user.toLowerCase()}-management/create-user`}
              icon={MdAdd}
              disabled={
                user === 'INTERN' && recentBatch?.status === 'COMPLETED'
              }
            >
              Add New Account
            </LinkButton>
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
