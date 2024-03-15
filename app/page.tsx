'use client'
import HeroSection from '@/components/home'
import Navbar from '@/components/navbar'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === 'authenticated') {
    if (session?.user?.role === 'ADMIN') {
      return router.push('/admin')
    }
    if (session?.user?.role === 'INTERN') {
      return router.push('/intern')
    }
  }

  return (
    <main className="flex h-auto flex-col overflow-hidden">
      <Navbar />
      <HeroSection />
    </main>
  )
}
