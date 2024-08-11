import { ReactNode } from 'react'
import CoreLayout from '@/components/layout/wrapper'

const MentorLayout = ({ children }: { children: ReactNode }) => {
  return (
    <CoreLayout role="MENTOR" withSidebar={false}>
      {children}
    </CoreLayout>
  )
}

export default MentorLayout
