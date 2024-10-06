import { StatCard } from '@/components/@core/ui/dashboard/stat-card'
import { Skeleton } from '@/components/ui/skeleton'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export const StatCardSkeleton = ({ image }: { image: string | StaticImport }) => {
  return (
    <StatCard isLoading header="Total Days" image={image}>
      <div className="flex flex-col gap-4 w-full">
        <Skeleton className='h-10 bg-muted rounded-md w-28' />
        <div className="flex items-center justify-between">
          <Skeleton className='h-8 bg-muted rounded-md w-40' />
          <Skeleton className='h-5 bg-muted rounded-[4px] w-24' />
        </div>
      </div>
    </StatCard>
  )
}
