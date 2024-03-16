'use client'
import HeroSection from '@/components/home'
import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      switch (session.user.role) {
        case 'ADMIN':
          router.push('/admin')
          break
        case 'INTERN':
          router.push('/intern')
          break
      }
    }
  }, [router, session])

  if (status === 'unauthenticated') {
    return (
      <main className="flex h-auto flex-col overflow-hidden">
        <Navbar />
        <HeroSection />
        <Footer />
      </main>
    )
  }
}
