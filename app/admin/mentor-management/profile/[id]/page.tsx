import { Metadata } from 'next'
import { Suspense } from 'react'
import ProfileSkeleton from '@/components/layout/profile/profile-skeleton'
import UserProfile from '@/components/layout/profile'
import { ComingSoon } from '@/components/@core/ui/coming-soon'

export const metadata: Metadata = {
  title: 'Mentor Profile',
}

const MentorProfile = async ({ params: { id } }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <UserProfile userId={id} role='MENTOR'>
        <div className="w-full py-20 rounded-md bg-card">
          <ComingSoon pageName="Mentor Profile" />
        </div>
      </UserProfile>
    </Suspense>
    // <ProfileSkeleton />
  )
}

export default MentorProfile
