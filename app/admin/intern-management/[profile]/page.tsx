import Profile from '@/components/layout/profile'

const breadcrumbLinks = [
  { title: 'Intern Management', path: '/admin/intern-management' },
]

const UserProfile = ({
  params: { profile },
}: {
  params: { profile: string }
}) => {
  return (
    <Profile email={`${profile}@gmail.com`} breadcrumbLinks={breadcrumbLinks} />
  )
}

export default UserProfile
