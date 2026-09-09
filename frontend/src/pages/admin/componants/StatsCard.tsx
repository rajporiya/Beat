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
    <Card className='bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/80 transition-colors space-x-4'>
      <CardContent className='flex ' >
        <div className='flex items-center gap-4'>
            <div className={`p-3 rounded-lg ${bgColor}`}>
                <Icon  className={`size-6 ${iconColor}`}/>
            </div>
        </div>

        <div>
            <p className='text-sm text-zinc-400'>{label}</p>
            <p className='text-2xl font-bold'>{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatsCard