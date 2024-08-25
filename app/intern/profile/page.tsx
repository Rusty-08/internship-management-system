import { Metadata } from 'next'
import { Suspense } from 'react'
import ProfileSkeleton from '@/components/layout/profile/profile-skeleton'
import UserProfile from '@/components/layout/profile'
import { ComingSoon } from '@/components/@core/ui/coming-soon'

export const metadata: Metadata = {
  title: 'Intern Profile',
}

const InternProfile = async () => {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <UserProfile>
        <div className="w-full py-20 rounded-md bg-card">
          <ComingSoon pageName="Profile" />
        </div>
      </UserProfile>
    </Suspense>
  )
}

export default InternProfile
