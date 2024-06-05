import { ComingSoon } from '@/components/coming-soon'
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
