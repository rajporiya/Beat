import SectionGridSkeleton from '@/components/skeleton/SectionGridSkeleton';
import { Button } from '@/components/ui/button';
import { getFallbackArtwork } from '@/lib/songArtwork';
import type { Song } from '@/types';
import PlayButton from './PlayButton';

type SectionGridProps = {
  title : string;
  songs : Song[];
  isLoading : boolean;
}
const SectionGrid = ({title,songs, isLoading} : SectionGridProps) => {
  if(isLoading) return <SectionGridSkeleton />
  if(!songs.length) return null
  
  return (
    <div className='mb-8 '>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-bold tracking-tight sm:text-2xl'>{title}</h2>
        <Button variant="link" className='text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white'>Show all</Button>
      </div>

      <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {songs.map((song) => (
          <div key={song._id} className='group rounded-md bg-[#181818] p-3 transition-all hover:cursor-pointer hover:bg-[#282828] sm:p-4'>
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
              <PlayButton song={song} />
            </div>
            <h3 className='mt-3 truncate font-medium'>{song.title}</h3>
            <p className='mt-1 text-sm text-zinc-400 truncate'>{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SectionGrid
