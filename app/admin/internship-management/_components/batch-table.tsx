'use client'

import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import React, { useMemo, useState } from 'react'
import { Batch } from '@prisma/client'
import { DataTable } from '@/components/@core/ui/table/data-table'
import { DataTablePagination } from '@/components/@core/ui/table/pagination'
import { SearchFilter } from '@/components/@core/ui/table/seach-filter'
import Link from 'next/link'
import { batchColumns } from './batch-columns'
import AddButton from '@/components/@core/ui/add-button'
import { useSearchParams } from 'next/navigation'

const InternshipTable = ({ data }: { data: Batch[] }) => {
  const [rowSelection, setRowSelection] = useState({})
  const [sorting, setSorting] = useState<SortingState>([])
  const searchParams = useSearchParams()
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    {
      id: 'name',
      value: searchParams.get('batch') ?? '',
    },
  ])

  const actions = {}

  const table = useReactTable({
    data,
    columns: batchColumns(actions),
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

  const batchStatus = useMemo(
    () =>
      data
        .find(batch => batch.status === 'ONGOING' || batch.status === 'PENDING')
        ?.status.toLowerCase(),
    [data],
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <SearchFilter
          column="name"
          table={table}
          search={'batch'}
          className="flex-grow"
        />
        {batchStatus ? (
          <AddButton disabled>
            There is already {batchStatus === 'ongoing' ? 'an' : 'a'}{' '}
            {batchStatus} batch
          </AddButton>
        ) : (
          <Link href="/admin/internship-management/create-batch">
            <AddButton>Create New Batch</AddButton>
          </Link>
        )}
      </div>
      <div className="rounded-md overflow-hidden ">
        <DataTable
          columns={batchColumns(actions)}
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

export default InternshipTable
