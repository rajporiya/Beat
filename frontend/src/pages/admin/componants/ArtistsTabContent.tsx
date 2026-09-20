import { getFallbackArtwork } from '@/lib/songArtwork';
import { useMusicStore } from '@/stores/useMusicStore';
import { Mic2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArtistsTabContent = () => {
  const { artists, songs } = useMusicStore();
  const songList = Array.isArray(songs) ? songs : [];

  return (
    <section className='rounded-xl bg-[#181818] p-5 sm:p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h2 className='flex items-center gap-2 text-lg font-bold'>
            <Mic2 className='size-5 text-orange-500' />
            Artists library
          </h2>
          <p className='mt-1 text-sm text-zinc-400'>All artists in your catalog.</p>
        </div>
        <span className='rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-white'>{artists.length}</span>
      </div>

      {artists.length ? (
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {artists.map((name) => {
            const count = songList.filter((song) => song.artist === name).length;
            return (
              <Link
                key={name}
                to={`/artist/${name.toLowerCase().replaceAll(" ", "-")}`}
                className='rounded-lg p-3 text-center transition-colors hover:bg-[#242424]'
              >
                <img
                  src={getFallbackArtwork(name)}
                  alt={name}
                  className='aspect-square w-full rounded-full object-cover shadow-lg'
                />
                <p className='mt-3 truncate font-bold'>{name}</p>
                <p className='mt-1 text-sm text-zinc-400'>
                  {count} {count === 1 ? "song" : "songs"}
                </p>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className='py-12 text-center text-zinc-500'>
          <Mic2 className='mx-auto mb-3 size-7' />
          No artists have been added yet.
        </div>
      )}
    </section>
  );
};

export default ArtistsTabContent;