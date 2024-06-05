import { ComingSoon } from '@/components/coming-soon'
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
