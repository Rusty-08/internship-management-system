'use client'

import { DataTableColumnHeader } from '@/components/@core/ui/table/column-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { IconLinkButton } from '@/components/ui/icon-link-button'
import { TooltipWrapper } from '@/components/ui/tooltip'
import { Batch } from '@prisma/client'
import { ColumnDef, Row } from '@tanstack/react-table'
import { differenceInDays, format } from 'date-fns'
import Link from 'next/link'
import { FiEdit3 } from 'react-icons/fi'

export const batchColumns = (actions: {
  [key: string]: (row: Row<Batch>) => void
}): ColumnDef<Batch>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />
    },
    cell: ({ row }) => {
      return (
        <Link
          href={`/admin/internship-management/${row.original.id}`}
          className="text-foreground font-medium hover:text-primary"
        >
          {row.original.name}
        </Link>
      )
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

      const totalDays = endDate
        ? differenceInDays(`${endDate}`, startDate) + 1
        : null

      const dateDiff = differenceInDays(new Date(), startDate)

      const days =
        endDate && new Date() >= endDate
          ? totalDays
          : dateDiff
          ? dateDiff + 1
          : dateDiff

      return <p>{endDate ? `${days}/${totalDays ?? 'N/A'}` : `${days} days`}</p>
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Created At" />
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
      const statusContent =
        status.charAt(0).toUpperCase() +
        status.slice(1, status.length).toLowerCase()

      return (
        <Badge variant={status === 'ONGOING' ? 'IN_PROGRESS' : status}>
          {statusContent}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-1">
          <IconLinkButton
            path={`/admin/internship-management/${row.original.id}`}
            tooltip="Edit"
            disabled={row.original.status === 'COMPLETED'}
          >
            <FiEdit3 size="1.1rem" />
          </IconLinkButton>
        </div>
      )
    },
  },
]
