import FeatureGridSkeleton from '@/components/skeleton/FeatureGridSkeleton'
import { useMusicStore } from '@/stores/useMusicStore'
import React from 'react'

const FeaturedSection = () => {
    const { isLoading, featureSong, err} = useMusicStore()

    if (isLoading) return <FeatureGridSkeleton />
    if(err) return <p className='text-red-500 mb-4 text-lg'>{err}</p>
  return (
    <div className='grid grid-cols-1 gap-4 mb-8'>
        {featureSong.map((song) => (
            <div className='flex items-center bg-zinc-800/50 rounded-md overflow-hidden hover:bg-zinc-700/50 transition-colors group cursor-pointer relative' key={song._id}>
                <img src={song.imageUrl} className='w-16 h-16 object-cover shrink-0' alt="" />
                <div className='flex-1 p-4'>
                    <p className='font-medium '>{song.title}</p>
                    <p className='text-sm text-zinc-600'>{song.artist}</p>

                </div>
            </div>
        ))}

    </div>
  )
}


export default FeaturedSection