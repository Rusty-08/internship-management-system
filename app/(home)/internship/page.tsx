import { ComingSoon } from '@/app/intern/chat/page'
import HomeWrapper from '@/components/home/layout/home-layout'

const Internship = () => {
  return (
    <HomeWrapper>
      <div className="h-[80vh]">
        <ComingSoon pageName="Internship" />
      </div>
    </HomeWrapper>
  )
}

export default Internship
