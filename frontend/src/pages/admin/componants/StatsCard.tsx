import { Card, CardContent } from '@/components/ui/card'
import type { ElementType } from 'react'

interface StatsCardProps {
  icon: ElementType
  label: string
  bgColor: string
  value: string
  iconColor: string
}

const StatsCard = ({ icon: Icon, label, bgColor, value, iconColor }: StatsCardProps) => {
  return (
    <Card className='border-0 bg-[#181818] text-white hover:bg-[#242424] transition-colors'>
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
