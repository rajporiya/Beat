import FeatureGridSkeleton from '@/components/skeleton/FeatureGridSkeleton'
import { getFallbackArtwork } from '@/lib/songArtwork'
import { useMusicStore } from '@/stores/useMusicStore'
import PlayButton from './PlayButton'

const FeaturedSection = () => {
    const { isLoading, featureSong, err} = useMusicStore()

    if (isLoading) return <FeatureGridSkeleton />
    if(err) return <p className='text-red-500 mb-4 text-lg'>{err}</p>
  return (
    <div className='px-5 pt-2 grid grid-cols-1 gap-3 mb-8 md:grid-cols-2 xl:grid-cols-3'>
        {featureSong.map((song) => (
            <div className='flex items-center bg-white/10 rounded-md overflow-hidden hover:bg-white/20 transition-colors group cursor-pointer relative shadow-sm' key={song._id}>
                <img
                    src={song.imageUrl}
                    onError={(event) => {
                        if (!event.currentTarget.src.startsWith("https://placehold.co")) {
                            event.currentTarget.src = getFallbackArtwork(song.title)
                        }
                    }}
                    className='w-16 h-16 object-cover shrink-0'
                    alt={`${song.title} cover`}
                />
                <div className='px-4 min-w-0'>
                    <p className='font-bold truncate'>{song.title}</p>
                    <p className='text-sm text-zinc-400 truncate'>{song.artist}</p>

                </div>
                <PlayButton song={song} />
            </div>
        ))}

    </div>
  )
}


export default FeaturedSection
