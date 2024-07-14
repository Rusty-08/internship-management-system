import { ReactNode } from 'react'
import CoreLayout from '@/components/layout/wrapper'

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <CoreLayout role="ADMIN">
      {children}
    </CoreLayout>
  )
}

export default AdminLayout
