import { useMusicStore } from '@/stores/useMusicStore'
import { Disc3, Loader2, Music2, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { axiosInstance } from '@/lib/axios'
import { getFallbackArtwork } from '@/lib/songArtwork'
import AddAlbumModal from './AddAlbumModal'

const AlbumsTabContent = () => {
  const { albums, fetchAlbums, fetchSongs, fetchStats } = useMusicStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await axiosInstance.delete(`/admin/albums/${id}`)
      await Promise.all([fetchAlbums(), fetchSongs(), fetchStats()])
    } catch (error) {
      console.error("Failed to delete album:", error)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <section className='rounded-xl bg-[#181818] p-5 sm:p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <div><h2 className='flex items-center gap-2 text-lg font-bold'><Disc3 className='size-5 text-[#1ed760]' />Album library</h2><p className='mt-1 text-sm text-zinc-400'>Organize your published collections.</p></div>
        <button onClick={() => setIsModalOpen(true)} className='rounded-full bg-[#1ed760] px-4 py-2 text-sm font-bold text-black hover:bg-[#3be477]'>+ Add album</button>
      </div>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {albums.map((album) => (
          <div key={album._id} className='group relative rounded-lg p-3 hover:bg-[#282828]'>
            <Link to={`/album/${album._id}`} className='block'>
              {album.imageUrl ? (
                <img
                  src={album.imageUrl}
                  onError={(event) => { event.currentTarget.src = getFallbackArtwork(album.title) }}
                  alt={album.title}
                  className='aspect-square w-full rounded-md object-cover shadow-lg'
                />
              ) : (
                <div className='aspect-square w-full rounded-md bg-[#242424] shadow-lg grid place-items-center'>
                  <Disc3 className='size-12 text-zinc-500' />
                </div>
              )}
              <p className='mt-3 truncate font-bold'>{album.title}</p>
              <p className='mt-1 truncate text-sm text-zinc-400'>{album.artist} • {album.releaseYear}</p>
            </Link>
            <button
              aria-label={`Delete ${album.title}`}
              onClick={() => handleDelete(album._id)}
              className='absolute right-5 top-5 grid size-8 place-items-center rounded-full bg-black/60 text-zinc-300 opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100 disabled:opacity-50'
              disabled={deletingId === album._id}
            >
              {deletingId === album._id ? <Loader2 className='size-4 animate-spin' /> : <Trash2 className='size-4' />}
            </button>
          </div>
        ))}
      </div>
      {!albums.length && <div className='py-12 text-center text-zinc-500'><Music2 className='mx-auto mb-3 size-7' />No albums have been added yet.</div>}
      <AddAlbumModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}

export default AlbumsTabContent