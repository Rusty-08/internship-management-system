import { ComingSoon } from '@/components/@core/ui/coming-soon'
import HomeWrapper from '@/components/home/layout/home-layout'

const AboutUs = () => {
  return (
    <HomeWrapper>
      <div className="h-[80vh]">
        <ComingSoon pageName="About Us" />
      </div>
    </HomeWrapper>
  )
}

export default AboutUs
