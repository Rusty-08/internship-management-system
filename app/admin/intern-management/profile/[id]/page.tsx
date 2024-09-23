import { Metadata } from 'next'
import { Suspense } from 'react'
import ProfileSkeleton from '@/components/layout/profile/profile-skeleton'
import UserProfile from '@/components/layout/profile'

export const metadata: Metadata = {
  title: 'Intern Profile',
}

const InternProfile = async ({ params: { id } }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <UserProfile userId={id} />
    </Suspense>
    // <ProfileSkeleton />
  )
}

export default InternProfile
