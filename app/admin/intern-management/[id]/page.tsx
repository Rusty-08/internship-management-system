import { ComingSoon } from '@/components/@core/ui/coming-soon'
import { TabsWrapper } from '@/components/@core/ui/tabs'
import Profile from '@/components/layout/profile'
import { TabsContent } from '@/components/ui/tabs'
import { getInternAttendance } from '@/utils/attendance'
import { getUserEmailById } from '@/utils/users'
import { Metadata } from 'next'
import { lazy } from 'react'
import { IndividualAttendance } from '../_components/individual-attendance'

export const metadata: Metadata = {
  title: 'Intern Profile',
}

const breadcrumbLinks = [
  { title: 'Intern Management', path: '/admin/intern-management' },
]

const UserProfile = async ({ params: { id } }: { params: { id: string } }) => {
  if (!id) return null

  const email = await getUserEmailById(id)
  const attendance = await getInternAttendance(email)

  return (
    <Profile email={email || ''} breadcrumbLinks={breadcrumbLinks}>
      <TabsWrapper triggers={['Overview', 'Attendance']}>
        <TabsContent value="overview">
          <div className="border-t my-4 flex items-center justify-center min-h-[20rem] rounded-sm">
            <ComingSoon pageName="Profile Overview" />
          </div>
        </TabsContent>
        <TabsContent value="attendance">
          <div className="min-h-[20rem] my-4 p-4 pt-6 bg-card rounded-md">
            <IndividualAttendance attendance={attendance} />
          </div>
        </TabsContent>
      </TabsWrapper>
    </Profile>
  )
}

export default UserProfile
