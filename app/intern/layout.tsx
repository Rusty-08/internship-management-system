import { ReactNode } from 'react'
import CoreLayout from '@/components/layout/wrapper'

const InternLayout = ({ children }: { children: ReactNode }) => {
  return (
    <CoreLayout role="INTERN">
      {children}
    </CoreLayout>
  )
}

export default InternLayout
