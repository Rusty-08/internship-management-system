'use client'

import { UserSubset } from '@/components/@core/ui/table/account-table/types'
import { DataTableColumnHeader } from '@/components/@core/ui/table/column-header'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { TooltipWrapper } from '@/components/ui/tooltip'
import AvatarPlaceholder from '@/public/general/images/male-avatar.svg'
import { ColumnDef, Row } from '@tanstack/react-table'
import Image from 'next/image'
import { format } from 'date-fns'
import Link from 'next/link'
import { FiEdit3 } from 'react-icons/fi'
import { IoArchiveOutline } from 'react-icons/io5'
import { LuArchiveRestore } from 'react-icons/lu'
import { BatchBaseSchema } from './batch-schema'
import { Batch } from '@prisma/client'

export const batchColumns = (actions: {
  [key: string]: (row: Row<Batch>) => void
}): ColumnDef<Batch>[] => [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Name" />
      },
      cell: ({ row }) => {
        return <p className='text-foreground font-medium'>{row.original.name}</p>
      },
    },
    {
      accessorKey: 'startDate',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Start Date" />
      },
      cell: ({ row }) => {
        const formattedDate = format(`${row.original.startDate}`, 'MM/dd/yyyy')

        return <p>{formattedDate}</p>
      },
    },
    {
      accessorKey: 'endDate',
      header: 'End Date',
      cell: ({ row }) => {
        const formattedDate = format(`${row.original.endDate}`, 'MM/dd/yyyy')

        return <p>{formattedDate}</p>
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => {
        const formattedDate = format(`${row.original.createdAt}`, 'MM/dd/yyyy')

        return <p>{formattedDate}</p>
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className="flex justify-end gap-1">
            <TooltipWrapper tooltip="Edit">
              <Link href={`/admin/internship-management/${row.original.id}`}>
                <Button
                  variant="ghost"
                  size="circle"
                >
                  <FiEdit3 size="1.1rem" />
                </Button>
              </Link>
            </TooltipWrapper>
          </div>
        )
      },
    },
  ]
