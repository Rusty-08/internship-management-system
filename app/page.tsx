import HeroSection from '@/components/home'
import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="flex h-auto flex-col overflow-hidden">
      <Navbar />
      <HeroSection />
    </main>
  )
}
