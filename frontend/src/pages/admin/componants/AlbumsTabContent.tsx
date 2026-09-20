import { useMusicStore } from '@/stores/useMusicStore'
import { Disc3, Music2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const AlbumsTabContent = () => {
  const { albums } = useMusicStore()
  return (
    <section className='rounded-xl bg-[#181818] p-5 sm:p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <div><h2 className='flex items-center gap-2 text-lg font-bold'><Disc3 className='size-5 text-[#1ed760]' />Album library</h2><p className='mt-1 text-sm text-zinc-400'>Organize your published collections.</p></div>
        <button className='rounded-full bg-[#1ed760] px-4 py-2 text-sm font-bold text-black hover:bg-[#3be477]'>+ Add album</button>
      </div>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {albums.map((album) => (
          <Link key={album._id} to={`/album/${album._id}`} className='group rounded-lg p-3 hover:bg-[#282828]'>
            <img src={album.imageUrl} alt={album.title} className='aspect-square w-full rounded-md object-cover shadow-lg' />
            <p className='mt-3 truncate font-bold'>{album.title}</p>
            <p className='mt-1 truncate text-sm text-zinc-400'>{album.artist} • {album.releaseYear}</p>
          </Link>
        ))}
      </div>
      {!albums.length && <div className='py-12 text-center text-zinc-500'><Music2 className='mx-auto mb-3 size-7' />No albums have been added yet.</div>}
    </section>
  )
}

export default AlbumsTabContent
