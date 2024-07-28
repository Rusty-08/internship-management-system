import { ComingSoon } from '@/components/@core/ui/coming-soon'
import { TabsWrapper } from '@/components/@core/ui/tabs'
import Profile from '@/components/layout/profile'
import { TabsContent } from '@/components/ui/tabs'
import { getServerUserById } from '@/utils/users'

const UserProfile = async ({ params: { id } }: { params: { id: string } }) => {
  if (!id) return null

  const user = await getServerUserById(id)

  return (
    <Profile email={user?.email || ''}>
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
