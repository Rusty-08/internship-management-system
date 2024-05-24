'use client'

import { ColumnDef, Row } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'

import { IoArchiveOutline } from 'react-icons/io5'
import { LuArchiveRestore } from 'react-icons/lu'
import { FiEdit3 } from 'react-icons/fi'

import { DataTableColumnHeader } from '@/components/@core/ui/table/column-header'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { TooltipWrapper } from '@/components/ui/tooltip'
import { UserSubset } from '@/components/@core/ui/table/account-table/types'
import defaultAvatar from '@/public/general/images/profile-bg.jpg'

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
      const path = `/admin/intern-management/${row.original.id}`

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
    accessorKey: 'mentor',
    header: 'Mentor',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          {!row.original.isArchived && (
            <TooltipWrapper tooltip="Edit">
              <Button
                variant="ghost"
                size="circle"
                onClick={() => actions.edit(row)}
              >
                {row.original.isArchived === false && <FiEdit3 size="1.1rem" />}
              </Button>
            </TooltipWrapper>
          )}
          <div>
            {/* <ArchiveConfirmation row={row} archive={actions.archive(row)} /> */}
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
                {row.original.isArchived === false ? (
                  <>
                    <IoArchiveOutline size="1.1rem" />
                  </>
                ) : (
                  <LuArchiveRestore size="1.1rem" />
                )}
              </Button>
            </TooltipWrapper>
          </div>
        </div>
      )
    },
  },
]
