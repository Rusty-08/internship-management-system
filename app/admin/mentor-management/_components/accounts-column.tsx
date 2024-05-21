'use client'

import { ColumnDef, Row } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'

import { DataTableColumnHeader } from '@/components/@core/ui/table/column-header'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import Link from 'next/link'
import { TooltipWrapper } from '@/components/ui/tooltip'

import { IoArchiveOutline } from 'react-icons/io5'
import { LuArchiveRestore } from 'react-icons/lu'
import { FiEdit3 } from 'react-icons/fi'

import { UserSubset } from '@/components/@core/ui/table/account-table/types'

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
    accessorKey: 'expertise',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Expertise" />
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
              size="circle"
              onClick={() => actions.edit(row)}
            >
              {!row.original.isArchived && <FiEdit3 size="1.1rem" />}
            </Button>
          </TooltipWrapper>
          <TooltipWrapper tooltip="Archive">
            <Button
              variant="ghost"
              size="circle"
              onClick={() => actions.openArchiveConfirmation(row)}
            >
              {!row.original.isArchived ? (
                <>
                  <IoArchiveOutline size="1.1rem" />
                </>
              ) : (
                <LuArchiveRestore size="1.1rem" />
              )}
            </Button>
          </TooltipWrapper>
        </div>
      )
    },
  },
]
