import { taskStats } from './_components/stat-dummy-data'
import { TaskStatCard } from './_components/task-stat-card'

const AdminDashboard = () => {
  return (
    <div className="flex flex-col gap-6 py-2">
      <div className="grid h-40 grid-cols-3 gap-6">
        {taskStats.map(stat => (
          <TaskStatCard key={stat.name} name={stat.name} />
        ))}
      </div>
      <div className="grid h-[25rem] grid-cols-3 gap-6">
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

export default AdminDashboard
