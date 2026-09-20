import { getFallbackArtwork } from '@/lib/songArtwork';
import { axiosInstance } from '@/lib/axios';
import { useMusicStore } from '@/stores/useMusicStore';
import { Loader2, Mic2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const ArtistsTabContent = () => {
  const { artists, songs, fetchArtists, fetchSongs, fetchAlbums, fetchStats } = useMusicStore();
  const songList = Array.isArray(songs) ? songs : [];
  const [artistToDelete, setArtistToDelete] = useState<string | null>(null);
  const [deletingName, setDeletingName] = useState<string | null>(null);

  const confirmDelete = async () => {
    if (!artistToDelete) return;
    setDeletingName(artistToDelete);
    try {
      await axiosInstance.delete(`/admin/artists/${encodeURIComponent(artistToDelete)}`);
      await Promise.all([fetchArtists(), fetchSongs(), fetchAlbums(), fetchStats()]);
      setArtistToDelete(null);
    } catch (error) {
      console.error("Failed to delete artist:", error);
    } finally {
      setDeletingName(null);
    }
  };

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
              <div key={name} className='group relative rounded-lg p-3 text-center transition-colors hover:bg-[#242424]'>
                <Link to={`/artist/${name.toLowerCase().replaceAll(" ", "-")}`} className='block'>
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
                <button
                  aria-label={`Delete artist ${name}`}
                  onClick={() => setArtistToDelete(name)}
                  className='absolute right-5 top-5 grid size-8 place-items-center rounded-full bg-black/60 text-zinc-300 opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100 disabled:opacity-50'
                  disabled={deletingName === name}
                >
                  {deletingName === name ? <Loader2 className='size-4 animate-spin' /> : <Trash2 className='size-4' />}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className='py-12 text-center text-zinc-500'>
          <Mic2 className='mx-auto mb-3 size-7' />
          No artists have been added yet.
        </div>
      )}

      <ConfirmDeleteModal
        open={artistToDelete !== null}
        title={`Delete artist "${artistToDelete}"?`}
        message="This will permanently delete all songs and albums by this artist."
        loading={deletingName !== null}
        onCancel={() => setArtistToDelete(null)}
        onConfirm={confirmDelete}
      />
    </section>
  );
};

export default ArtistsTabContent;