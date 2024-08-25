import { ComingSoon } from '@/components/@core/ui/coming-soon'
import { TabsWrapper } from '@/components/@core/ui/tabs'
import { TabsContent } from '@/components/ui/tabs'
import { getServerUserById } from '@/utils/users'
import { Metadata } from 'next'
import { IndividualAttendance } from '../../../app/admin/intern-management/_components/individual-attendance'
import Profile from './user-profile'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Intern Profile',
}

type UserProfileProps = {
  userId?: string
  role?: string
  children?: ReactNode
}

const UserProfile = async ({ userId, role = 'INTERN', children }: UserProfileProps) => {
  const user = await getServerUserById(userId || '')

  return (
    <Profile user={user}>
      {role === 'INTERN' ? (
        <TabsWrapper triggers={['Overview', 'Attendance']}>
          <TabsContent value="overview">
            <div className="border-t my-4 flex items-center justify-center min-h-[20rem] rounded-sm">
              <ComingSoon pageName="Profile Overview" />
            </div>
          </TabsContent>
          <TabsContent value="attendance">
            <div className="min-h-[20rem] my-4 p-4 pt-6 bg-card rounded-md">
              <IndividualAttendance attendance={user?.attendance || []} />
            </div>
          </TabsContent>
        </TabsWrapper>
      ) : (
        <>{children}</>
      )}
    </Profile>
  )
}

export default UserProfile
