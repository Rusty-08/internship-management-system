import HeroSection from '@/components/home'
import Footer from '@/components/home/footer'
import HomeNavbar from '@/components/home/navbar'

export default async function Home() {
  return (
    <main className="flex container h-auto flex-col overflow-hidden">
      <HomeNavbar />
      <HeroSection />
      <Footer />
    </main>
  )
}
