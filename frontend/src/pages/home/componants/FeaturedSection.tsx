import FeatureGridSkeleton from '@/components/skeleton/FeatureGridSkeleton'
import { getFallbackArtwork } from '@/lib/songArtwork'
import { useMusicStore } from '@/stores/useMusicStore'

const FeaturedSection = () => {
    const { isLoading, featureSong, err} = useMusicStore()

    if (isLoading) return <FeatureGridSkeleton />
    if(err) return <p className='text-red-500 mb-4 text-lg'>{err}</p>
  return (
    <div className='p-4 grid grid-cols-1 gap-4 mb-8 md:grid-cols-2 xl:grid-cols-3'>
        {featureSong.map((song) => (
            <div className='p-4 flex  items-center bg-zinc-800/50 rounded-md overflow-hidden hover:bg-zinc-700/50 transition-colors group cursor-pointer relative' key={song._id}>
                <img
                    src={song.imageUrl}
                    onError={(event) => {
                        if (!event.currentTarget.src.startsWith("https://placehold.co")) {
                            event.currentTarget.src = getFallbackArtwork(song.title)
                        }
                    }}
                    className='w-16 h-16 object-cover shrink-0 rounded-sm'
                    alt={`${song.title} cover`}
                />
                <div className=' p-4'>
                    <p className='font-medium '>{song.title}</p>
                    <p className='text-sm text-zinc-600'>{song.artist}</p>

                </div>
            </div>
        ))}

    </div>
  )
}


export default FeaturedSection
