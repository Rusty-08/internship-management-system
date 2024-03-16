import Navbar from '@/components/home/navbar'
import { ReactNode } from 'react'

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="container">
      <Navbar />
      <div className="px-[10%]">{children}</div>
    </section>
  )
}

export default AdminLayout
