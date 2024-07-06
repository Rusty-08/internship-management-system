import { ComingSoon } from '@/components/@core/ui/coming-soon'
import { TabsWrapper } from '@/components/@core/ui/tabs'
import Profile from '@/components/layout/profile'
import { TabsContent } from '@/components/ui/tabs'
import { getAttendanceMode, getInternAttendance } from '@/utils/attendance'
import { getServerUserById } from '@/utils/users'
import { Metadata } from 'next'
import { lazy } from 'react'

export const metadata: Metadata = {
  title: 'Intern Profile',
}

const AttendanceTable = lazy(
  () => import('@/app/intern/my-attendance/_components/attendance-table'),
)

const breadcrumbLinks = [
  { title: 'Intern Management', path: '/admin/intern-management' },
]

const UserProfile = async ({ params: { id } }: { params: { id: string } }) => {
  const user = await getServerUserById(id)
  const attendance = await getInternAttendance(user?.email)
  const mode = getAttendanceMode(attendance)

  return (
    <Profile email={user?.email || ''} breadcrumbLinks={breadcrumbLinks}>
      <TabsWrapper triggers={['Overview', 'Attendance']}>
        <TabsContent value="overview">
          <div className="border-t my-4 flex items-center justify-center min-h-[20rem] rounded-sm">
            <ComingSoon pageName="Profile Overview" />
          </div>
        </TabsContent>
        <TabsContent value="attendance">
          <div className="min-h-[20rem] my-4 p-4 bg-card rounded-md">
            <AttendanceTable
              data={attendance}
              user={user}
              mode={mode}
              showTimeInBtn={false}
            />
          </div>
        </TabsContent>
      </TabsWrapper>
    </Profile>
  )
}

export default UserProfile
