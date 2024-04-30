'use client'

import { CustomIcon } from '@/components/@core/iconify'
import { ColumnDef, Row } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'

import { DataTableColumnHeader } from '@/components/@core/ui/table/column-header'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { TooltipWrapper } from '@/components/ui/tooltip'

export type InternsUsersSubset = {
  id: string | null
  image: string | null
  name: string | null
  email: string | null
  mentor: string | null
  mentorId: string | null
  isArchived?: boolean | null
}

export const accountColumns = (actions: {
  [key: string]: (row: Row<InternsUsersSubset>) => void
}): ColumnDef<InternsUsersSubset>[] => [
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
                {row.original.isArchived === false && (
                  <CustomIcon icon="heroicons:pencil-square" />
                )}
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
                    <CustomIcon icon="heroicons:archive-box" />
                  </>
                ) : (
                  <CustomIcon icon="ic:outline-restore" />
                )}
              </Button>
            </TooltipWrapper>
          </div>
        </div>
      )
    },
  },
]
