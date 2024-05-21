import { ComingSoon } from '@/app/intern/chat/page'
import { TabsWrapper } from '@/components/@core/ui/tabs'
import Profile from '@/components/layout/profile'

import { TabsContent } from '@/components/ui/tabs'
import { getServerUserByEmail } from '@/utils/users'

const breadcrumbLinks = [
  { title: 'Mentor Management', path: '/admin/mentor-management' },
]

const UserProfile = async ({
  params: { profile },
}: {
  params: { profile: string }
}) => {
  // const user = await getServerUserByEmail(`${profile}@gmail.com`)

  return (
    <Profile email={`${profile}@gmail.com`} breadcrumbLinks={breadcrumbLinks}>
      <TabsWrapper triggers={['Overview', 'Reports']}>
        <TabsContent value="overview">
          <div className="border-t my-4 flex items-center justify-center min-h-[20rem] rounded-sm">
            <ComingSoon pageName="Profile Overview" />
          </div>
        </TabsContent>
        <TabsContent value="reports">
          <div className="border-t my-4 flex items-center justify-center min-h-[20rem] rounded-sm">
            <ComingSoon pageName="Reports Overview" />
          </div>
        </TabsContent>
      </TabsWrapper>
    </Profile>
  )
}

export default UserProfile
