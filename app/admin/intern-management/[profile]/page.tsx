import { ComingSoon } from '@/app/intern/chat/page'
import AttendanceTable from '@/app/intern/my-attendance/_components/attendance-table'
import { TabsWrapper } from '@/components/@core/ui/tabs'
import Profile from '@/components/layout/profile'

import { TabsContent } from '@/components/ui/tabs'
import { getAttendanceMode, getInternAttendance } from '@/utils/attendance'
import { getServerUserByEmail } from '@/utils/users'

const breadcrumbLinks = [
  { title: 'Intern Management', path: '/admin/intern-management' },
]

const UserProfile = async ({
  params: { profile },
}: {
  params: { profile: string }
}) => {
  const attendance = await getInternAttendance(`${profile}@gmail.com`)
  const user = await getServerUserByEmail(`${profile}@gmail.com`)

  const mode = getAttendanceMode(attendance)

  return (
    <Profile email={`${profile}@gmail.com`} breadcrumbLinks={breadcrumbLinks}>
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
