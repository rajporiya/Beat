import PlaylistSkeleton from '@/components/skeleton/PlaylistSkeleton'
import { buttonVariants } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { useMusicStore } from '@/stores/useMusicStore'
import { SignedIn } from '@clerk/clerk-react'
import { Clock3, Heart, HomeIcon, Library, MessageCircle, Plus, Search } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const LeftSideBar = () => {
    const { albums, fetchAlbums, isLoading} = useMusicStore();
    // const isLoading = false;
    useEffect(()=>{
        fetchAlbums()
    }, [fetchAlbums])
  return (
    <div className='h-full flex flex-col gap-2'>
        {/* navigation */}
        <div className='rounded-lg bg-[#121212] p-3'>
            <div className='space-y-2'>
                <Link to={"/"} className={cn(buttonVariants(
                    {
                        variant:"ghost", className: "w-full justify-start rounded-md text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    }
                ))}>

                <HomeIcon  className='mr-2 size-5'/><span className='hidden md:block'>Home</span></Link>
                <Link to={"/search"} className={cn(buttonVariants({ variant:"ghost", className: "w-full justify-start rounded-md text-zinc-300 hover:bg-zinc-800 hover:text-white" }))}><Search className='mr-2 size-5'/><span className='hidden md:block'>Search</span></Link>
                <Link to={"/library"} className={cn(buttonVariants({ variant:"ghost", className: "w-full justify-start rounded-md text-zinc-300 hover:bg-zinc-800 hover:text-white" }))}><Library className='mr-2 size-5'/><span className='hidden md:block'>Your Library</span></Link>
                <SignedIn>
                    <Link to={"/"} className={cn(buttonVariants(
                    {
                        variant:"ghost", className: "w-full justify-start rounded-md text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    }
                ))}>

                <MessageCircle  className='mr-2 size-5'/><span className='hidden md:block'>Message</span></Link>
                </SignedIn>
            </div>
            <div className='mt-3 space-y-1 border-t border-white/10 pt-3 hidden md:block'><Link to="/liked" className='flex items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white'><Heart className='size-4'/>Liked Songs</Link><Link to="/recently-played" className='flex items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white'><Clock3 className='size-4'/>Recently Played</Link></div>
        </div>

        {/* Library */}
        <div className='rounded-lg bg-[#121212] p-3 flex-1 flex flex-col overflow-hidden'>
            <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center text-white px-2'>
                    <Library className='size-5 mr-2'/> 
                    <span className='hidden md:inline font-semibold'>Your Library</span>
                </div>
                <div className='hidden md:flex items-center gap-1 text-zinc-400'><Plus className='size-5 hover:text-white cursor-pointer' /><Search className='size-4 hover:text-white cursor-pointer' /></div>
            </div>
            <ScrollArea className='flex-1'>
                <div className='space-y-2'>
                    {isLoading ?(
                        <PlaylistSkeleton />
                    ) : (
                        albums.map((album: any) => (
                        <Link to={`/album/${album._id}`} key={album._id} className='p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer'>
                        <img src={album.imageUrl}  alt=""  className='size-12 rounded-md flex shrink-0 object-cover'/>
                        <div className='flex-1 min-w-0 hidden md:block'>
                            <p className='font-medium truncate'>{album.title}</p>
                            <p className='text-sm text-zinc-400 truncate'>Album • {album.artist}</p>
                            </div>
                        </Link>
                        ))
                    )}
                </div>
            </ScrollArea>
        </div>
    </div>
  )
}

export default LeftSideBar
