'use client'

import { UserSubset } from '@/components/@core/ui/table/account-table/types'
import { DataTableColumnHeader } from '@/components/@core/ui/table/column-header'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { TooltipWrapper } from '@/components/ui/tooltip'
import AvatarPlaceholder from '@/public/general/images/male-avatar.svg'
import { ColumnDef, Row } from '@tanstack/react-table'
import Image from 'next/image'
import { differenceInDays, format } from 'date-fns'
import Link from 'next/link'
import { FiEdit3 } from 'react-icons/fi'
import { IoArchiveOutline } from 'react-icons/io5'
import { LuArchiveRestore } from 'react-icons/lu'
import { BatchBaseSchema } from './batch-schema'
import { Batch } from '@prisma/client'
import { Badge } from '@/components/ui/badge'

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
        const formattedDate = format(`${row.original.startDate}`, 'MMM dd, yyyy')

        return <p>{formattedDate}</p>
      },
    },
    {
      accessorKey: 'endDate',
      header: 'End Date',
      cell: ({ row }) => {
        const formattedDate = format(`${row.original.endDate}`, 'MMM dd, yyyy')

        return <p>{row.original.endDate ? formattedDate : 'To be added later'}</p>
      },
    },
    {
      accessorKey: 'totalDays',
      header: 'Total Days',
      cell: ({ row }) => {
        const startDate = row.original.startDate
        const endDate = row.original.endDate

        const totalDays = differenceInDays(`${endDate}`, startDate)
        const days = differenceInDays(new Date(), startDate) + 1

        return <p>{endDate ? `${days}/${totalDays}` : `${days} days`}</p>
      },
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title='Created At' />
      },
      cell: ({ row }) => {
        const formattedDate = format(`${row.original.createdAt}`, 'MMM dd, yyyy')

        return <p>{formattedDate}</p>
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status
        const statusContent = status.charAt(0).toUpperCase() + status.slice(1, status.length).toLowerCase()

        return (
          <Badge variant={status === 'ONGOING' ? 'IN_PROGRESS' : status}>{statusContent}</Badge>
        )
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
