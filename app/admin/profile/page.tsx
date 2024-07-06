import Profile from '@/components/layout/profile'
import { getCurrentUserEmail } from '@/utils/users'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Profile',
}

const AdminProfile = async () => {
  const currentUserEmail = await getCurrentUserEmail()

  return <Profile email={currentUserEmail || ''}>...</Profile>
}

export default AdminProfile
