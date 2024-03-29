'use client'

import { ColumnDef } from '@tanstack/react-table'

export type UserSubset = {
  name: string | null
  email: string | null
}

export const columns: ColumnDef<UserSubset>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
]
