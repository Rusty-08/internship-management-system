'use client'

import { ColumnDef, Row } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'

import { LuArchiveRestore } from 'react-icons/lu'
import { FiEdit3 } from 'react-icons/fi'

import { DataTableColumnHeader } from '@/components/@core/ui/table/column-header'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { TooltipWrapper } from '@/components/ui/tooltip'
import { UserSubset } from '@/components/@core/ui/table/account-table/types'

export const archiveColumns = (actions: {
  [key: string]: (row: Row<UserSubset>) => void
}): ColumnDef<UserSubset>[] => [
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
      const path = `/admin/intern-management/${
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
    cell: ({ row }) => {
      const role = row.original.role ?? ''
      return <p>{role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}</p>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <TooltipWrapper tooltip="Restore">
            <Button
              variant="ghost"
              size="circle"
              onClick={() => actions.openArchiveConfirmation(row)}
            >
              <LuArchiveRestore size="1.1rem" />
            </Button>
          </TooltipWrapper>
        </div>
      )
    },
  },
]
