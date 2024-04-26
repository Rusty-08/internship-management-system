import Profile from '@/components/layout/profile'
import { getCurrentUserEmail } from '@/utils/users'

const InternProfile = async () => {
  const currentUserEmail = await getCurrentUserEmail()

  return <Profile email={currentUserEmail}>...</Profile>
}

export default InternProfile
