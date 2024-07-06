import { ComingSoon } from '@/components/@core/ui/coming-soon'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentor Profile',
}

const MentorProfile = () => {
  return <ComingSoon pageName="Profile" />
}

export default MentorProfile
