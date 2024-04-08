'use client'

import { CustomIcon } from '@/components/@core/iconify'

import { Column, ColumnDef, Row } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTableColumnHeader } from '@/components/@core/table/column-header'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

export type InternsUsersSubset = {
  id: string | null
  image: string | null
  name: string | null
  email: string | null
  mentor: string | null
  mentorId: string | null
}

export const columns = (actions: {
  [key: string]: (row: Row<InternsUsersSubset>) => void
}): ColumnDef<InternsUsersSubset>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'image',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} />
    },
    cell: ({ row }) => {
      const name = row.original.name
      const fallback = name
        ?.split(' ')
        .map(n => n[0])
        .join('')

      return (
        <Avatar className="w-8 h-8">
          <AvatarImage src={`${row.original.image}`} alt={`${name}`} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      )
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />
    },
    cell: ({ row }) => {
      const path = `/admin/intern-management/${
        row.original.email?.split('@')[0]
      }`
      return (
        <Link
          href={path}
          className="font-medium hover:text-secondary-foreground"
        >
          {row.original.name}
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
              <DropdownMenuItem onClick={() => actions.edit(row)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => actions.archive(row)}>
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => actions.viewDetails(row)}>
                View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
