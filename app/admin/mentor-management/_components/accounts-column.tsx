'use client'

import { CustomIcon } from '@/components/@core/iconify'

import { ColumnDef, Row } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'

import { DataTableColumnHeader } from '@/components/@core/table/column-header'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import Link from 'next/link'
import { TooltipWrapper } from '@/components/ui/tooltip'

export type MentorUsersSubset = {
  id: string | null
  image: string | null
  name: string | null
  email: string | null
  role: string | null
}

export const accountColumns = (actions: {
  [key: string]: (row: Row<MentorUsersSubset>) => void
}): ColumnDef<MentorUsersSubset>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />
    },
    cell: ({ row }) => {
      const name = row.original.name
      const fallback = name
        ?.split(' ')
        .map(n => n[0])
        .join('')
      const path = `/admin/mentor-management/${
        row.original.email?.split('@')[0]
      }`
      return (
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={`${row.original.image}`} alt={`${name}`} />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
          <Link
            href={path}
            className="font-medium hover:text-secondary-foreground"
          >
            {row.original.name}
          </Link>
        </div>
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
    accessorKey: 'role',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Role" />
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-1">
          <TooltipWrapper tooltip="Edit">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => actions.edit(row)}
            >
              <CustomIcon icon="heroicons:pencil-square" />
            </Button>
          </TooltipWrapper>
          <TooltipWrapper tooltip="Archive">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => actions.archive(row)}
            >
              <CustomIcon icon="heroicons:archive-box" />
            </Button>
          </TooltipWrapper>
        </div>
      )
    },
  },
]
