import FeatureGridSkeleton from '@/components/skeleton/FeatureGridSkeleton'
import { getFallbackArtwork } from '@/lib/songArtwork'
import { useMusicStore } from '@/stores/useMusicStore'
import PlayButton from './PlayButton'

const FeaturedSection = () => {
    const { isLoading, featureSong } = useMusicStore()

    if (isLoading) return <FeatureGridSkeleton />
    if (!featureSong.length) return null

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">Made for you</h2>
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3'>
        {featureSong.map((song) => (
            <div className='group relative flex items-center gap-4 rounded-md bg-white/10 p-3 pr-4 overflow-hidden transition-colors hover:bg-white/20' key={song._id}>
                <img
                    src={song.imageUrl}
                    onError={(event) => {
                        if (!event.currentTarget.src.startsWith("https://placehold.co")) {
                            event.currentTarget.src = getFallbackArtwork(song.title)
                        }
                    }}
                    className='h-16 w-16 shrink-0 rounded-full object-cover shadow sm:h-20 sm:w-20'
                    alt={`${song.title} cover`}
                />
                <div className='min-w-0 flex-1'>
                    <p className='truncate font-bold'>{song.title}</p>
                    <p className='mt-1 truncate text-sm text-zinc-400'>{song.artist}</p>
                </div>
                <PlayButton song={song} />
            </div>
        ))}
      </div>
    </section>
  )
}


export default FeaturedSection