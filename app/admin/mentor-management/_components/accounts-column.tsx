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

export const accountColumns = (
  actions: {
    [key: string]: (row: Row<UserSubset>) => void
  },
  selectedBatch?: string,
): ColumnDef<UserSubset>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />
    },
    cell: ({ row }) => {
      const name = row.original.name
      const path = `/admin/mentor-management/profile/${row.original.id}`

      return (
        <Link
          href={path}
          className="font-medium text-foreground hover:text-primary"
        >
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={`${row.original.image}`} alt={`${name}`} />
              <AvatarFallback>
                <Image
                  src={AvatarPlaceholder}
                  width={32}
                  height={32}
                  alt={`${name}`}
                />
              </AvatarFallback>
            </Avatar>
            <span>{row.original.name}</span>
          </div>
        </Link>
      )
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />
    },
  },
  {
    accessorKey: 'expertise',
    header: 'Expertise',
  },
  {
    accessorKey: 'assignedIntern',
    header: 'Assigned Intern',
  },
  {
    accessorKey: 'batch',
    header: 'Batch',
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
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-1">
          <TooltipWrapper tooltip="Edit">
            <Link href={`/admin/mentor-management/${row.original.id}`}>
              <Button variant="ghost" size="circle">
                {row.original.isArchived === false && (
                  <FiEdit3 size="1.1rem" className="text-primary" />
                )}
              </Button>
            </Link>
          </TooltipWrapper>
          <TooltipWrapper tooltip="Archive">
            <Button
              variant="ghost"
              size="circle"
              onClick={() => actions.openArchiveConfirmation(row)}
            >
              <IoArchiveOutline size="1.1rem" className="text-destructive" />
            </Button>
          </TooltipWrapper>
        </div>
      )
    },
  },
]
