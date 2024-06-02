import React, { ReactNode } from 'react'
import HomeNavbar from '@/components/home/navbar'
import Footer from '@/components/home/footer'

const HomeWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex container min-h-screen flex-col">
      <section className="px-4 md:px-[3%] flex flex-col">
        <HomeNavbar />
        <div style={{ minHeight: 'calc(100vh - 6rem)' }} className="pt-24">
          {children}
        </div>
        <Footer />
      </section>
    </main>
  )
}

export default HomeWrapper
