'use client'

import { CustomIcon } from '@/components/@core/iconify'

import { ColumnDef, Row } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTableColumnHeader } from '@/components/@core/table/column-header'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

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
    accessorKey: 'image',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} />
    },
    cell: ({ row }) => {
      return (
        <Avatar className="w-8 h-8">
          <AvatarImage
            src={`${row.original.image}`}
            alt={`${row.original.name}`}
          />
        </Avatar>
      )
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />
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
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <CustomIcon icon="fluent:more-horizontal-16-regular" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => actions.edit(row)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => actions.archieve(row)}
              >
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => actions.viewDetails(row)}
              >
                View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
