import { TaskStatCard } from '@/components/@core/placeholder/card'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentor Dashboard',
}

const MentorDashboard = () => {
  return (
    <div className="flex h-full flex-col gap-6 py-2">
      <div className="grid h-40 grid-cols-3 gap-6">
        {['1', '2', '3'].map(item => (
          <TaskStatCard key={item} name={`Placeholder ${item}`} />
        ))}
      </div>
      <div className="flex-grow grid grid-cols-3 gap-6">
        {['4', '5'].map((item, idx) => (
          <TaskStatCard
            key={item}
            name={`Placeholder ${item}`}
            className={idx === 0 && 'col-span-2'}
          />
        ))}
      </div>
    </div>
  )
}

export default MentorDashboard
