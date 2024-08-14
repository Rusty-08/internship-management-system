'use client'

import { UserSubset } from '@/components/@core/ui/table/account-table/types'
import { DataTableColumnHeader } from '@/components/@core/ui/table/column-header'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TooltipWrapper } from '@/components/ui/tooltip'
import AvatarPlaceholder from '@/public/general/images/male-avatar.svg'
import { ColumnDef, Row } from '@tanstack/react-table'
import Image from 'next/image'
import Link from 'next/link'
import { LuArchiveRestore } from 'react-icons/lu'

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
        const path = `/admin/intern-management/${row.original.id}`

        return (
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
      header: 'Role',
      cell: ({ row }) => {
        const role = row.original.role ?? ''
        return (
          <Badge
            variant={role.toLowerCase() === 'intern' ? 'COMPLETED' : 'PRIMARY'}
            className="hidden lg:inline-flex"
          >
            {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
          </Badge>
        )
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
