import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { ElementType } from 'react'

interface StatsCardProps {
  icon: ElementType
  label: string
  bgColor: string
  value: string
  iconColor: string
  active?: boolean
  onClick?: () => void
}

const StatsCard = ({ icon: Icon, label, bgColor, value, iconColor, active = false, onClick }: StatsCardProps) => {
  return (
    <Card
      onClick={onClick}
      className={cn(
        'border-0 bg-[#181818] text-white transition-colors',
        onClick && 'cursor-pointer hover:bg-[#242424]',
        active && 'ring-2 ring-[#1ed760]'
      )}
    >
      <CardContent className='flex items-center gap-4 p-5' >
        <div className={`p-3 rounded-full ${bgColor}`}><Icon className={`size-5 ${iconColor}`}/></div>
        <div className='min-w-0'>
            <p className='text-sm text-zinc-400'>{label}</p>
            <p className='text-2xl font-bold'>{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatsCard
