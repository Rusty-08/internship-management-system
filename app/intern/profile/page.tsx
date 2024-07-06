import { ComingSoon } from '@/components/@core/ui/coming-soon'
import Profile from '@/components/layout/profile'
import { getCurrentUserEmail } from '@/utils/users'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Intern Profile',
}

const InternProfile = async () => {
  const currentUserEmail = await getCurrentUserEmail()

  return (
    <Profile email={currentUserEmail || ''}>
      <div className="w-full py-20 rounded-md bg-card">
        <ComingSoon pageName="Profile" />
      </div>
    </Profile>
  )
}

export default InternProfile
