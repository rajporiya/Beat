import SectionGridSkeleton from '@/components/skeleton/SectionGridSkeleton';
import { Button } from '@/components/ui/button';
import { getFallbackArtwork } from '@/lib/songArtwork';
import type { Song } from '@/types';

type SectionGridProps = {
  title : string;
  songs : Song[];
  isLoading : boolean;
}
const SectionGrid = ({title,songs, isLoading} : SectionGridProps) => {
  if(isLoading) return <SectionGridSkeleton />
  
  return (
    <div className='mb-8 '>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-2xl font-bold'>{title}</h2>
        <Button variant="link" className='text-sm text-zinc-400'>Show All </Button>
      </div>

      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
        {songs.map((song) => (
          <div key={song._id} className='group rounded-md bg-zinc-800/40 p-4 transition-all hover:cursor-pointer hover:bg-zinc-800/70'>
            <div className='relative'>
              <div className='aspect-square rounded-md shadow-lg overflow-hidden'>
                <img
                  src={song.imageUrl}
                  onError={(event) => {
                    if (!event.currentTarget.src.startsWith("https://placehold.co")) {
                      event.currentTarget.src = getFallbackArtwork(song.title)
                    }
                  }}
                  alt={`${song.title} cover`}
                  className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                />
              </div>
            </div>
            <h3 className='mt-3 truncate font-medium'>{song.title}</h3>
            <p className='truncate text-sm text-zinc-400'>{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SectionGrid
