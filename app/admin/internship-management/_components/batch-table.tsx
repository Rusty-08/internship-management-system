'use client'

import { ColumnFiltersState, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { Batch } from '@prisma/client'
import { DataTable } from '@/components/@core/ui/table/data-table'
import { DataTablePagination } from '@/components/@core/ui/table/pagination'
import { SearchFilter } from '@/components/@core/ui/table/seach-filter'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { batchColumns } from './batch-columns'

const InternshipTable = ({ data }: { data: Batch[] }) => {
  // const router = useRouter()
  // const [isOpen, setIsOpen] = useState(false)
  // const { searchParams, updateParams } = useUpdateParams()
  const [formMode, setFormMode] = useState<'edit' | 'create'>('create')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  // const [loading, setLoading] = useState(false)

  const actions = {}

  const table = useReactTable({
    data: data,
    columns: batchColumns(actions),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  })

  // useEffect(() => {
  //   // for listing mentors in the select dropdown
  //   const fetchMentors = async () => {
  //     const data = await fetchMentorUsers()
  //     setMentors(data)
  //   }
  //   fetchMentors()
  // }, [])

  return (
    <div className='flex flex-col gap-4'>
      <div className="flex items-center justify-between">
        <SearchFilter
          column="name"
          table={table}
          search={'batch'}
        />
        <Link href='/admin/internship-management/create-batch'>
          <Button>Create New Batch</Button>
        </Link>
      </div>
      <div className="rounded-md border overflow-hidden ">
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