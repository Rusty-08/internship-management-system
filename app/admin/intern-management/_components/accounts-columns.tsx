'use client'

import { UserSubset } from '@/components/@core/ui/table/account-table/types'
import { DataTableColumnHeader } from '@/components/@core/ui/table/column-header'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { IconLinkButton } from '@/components/ui/icon-link-button'
import { TooltipWrapper } from '@/components/ui/tooltip'
import AvatarPlaceholder from '@/public/general/images/male-avatar.svg'
import { getAttendanceTotalHours } from '@/utils/attendance'
import { ColumnDef, Row } from '@tanstack/react-table'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { FiEdit3 } from 'react-icons/fi'
import { IoArchiveOutline } from 'react-icons/io5'
import { LuArchiveRestore } from 'react-icons/lu'

export const accountColumns = (actions: {
  [key: string]: (row: Row<UserSubset>) => void
}): ColumnDef<UserSubset>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />
    },

    cell: ({ row }) => {
      const name = row.original.name
      const path = `/admin/intern-management/profile/${row.original.id}`

      return (
        <Link
          href={path}
          className="font-medium text-foreground hover:text-primary transition-all whitespace-nowrap"
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
    accessorKey: 'mentor',
    header: 'Mentor',
  },
  {
    accessorKey: 'course',
    header: 'Course',
  },
  {
    accessorKey: 'totalHours',
    header: 'Total Hours',
    cell: ({ row }) => {
      const totalHours = getAttendanceTotalHours(row.original.attendance || [])

      return <p>{`${totalHours.toFixed(1)}/${row.original.totalHours}`}</p>
    },
  },
  {
    accessorKey: 'batch',
    header: 'Batch',
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => {
      const isActive = row.original.isActive
      const status = isActive ? 'Active' : 'Inactive'

      return (
        <Badge variant={isActive ? 'COMPLETED' : 'secondary'}>{status}</Badge>
      )
    },
  },
  // {
  //   accessorKey: 'createdAt',
  //   header: ({ column }) => {
  //     return <DataTableColumnHeader column={column} title="Created At" />
  //   },
  //   cell: ({ row }) => {
  //     const formattedDate = format(`${row.original.createdAt}`, 'MMM dd, yyyy')

  //     return <p>{formattedDate}</p>
  //   },
  // },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <IconLinkButton
            path={`/admin/intern-management/${row.original.id}`}
            tooltip="Edit"
            disabled={row.original.isActive ? false : true}
          >
            <FiEdit3 className="text-muted-foreground" size="1.1rem" />
          </IconLinkButton>
          <div>
            <TooltipWrapper
              tooltip={
                row.original.isArchived === false ? 'Archive' : 'Restore'
              }
            >
              <Button
                variant="ghost"
                size="circle"
                onClick={() => actions.openArchiveConfirmation(row)}
              >
                <IoArchiveOutline size="1.1rem" className="text-destructive" />
              </Button>
            </TooltipWrapper>
          </div>
        </div>
      )
    },
  },
]
