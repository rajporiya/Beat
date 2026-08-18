import PlaylistSkeleton from '@/components/skeleton/PlaylistSkeleton'
import { buttonVariants } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { SignedIn } from '@clerk/clerk-react'
import { HomeIcon, Library, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const LeftSideBar = () => {
    const isLoading = false;
  return (
    <div className='h-full flex flex-col gap-2'>
        {/* navigation */}
        <div className='rounded-lg bg-zinc-900 p-4'>
            <div className='space-y-2'>
                <Link to={"/"} className={cn(buttonVariants(
                    {
                        variant:"ghost", className: "w-full justify-start  text-white hover:bg-zinc-100"
                    }
                ))}>

                <HomeIcon  className='mr-2 size-5'/><span className='hidden md:block'>Home</span></Link>
                <SignedIn>
                    <Link to={"/"} className={cn(buttonVariants(
                    {
                        variant:"ghost", className: "w-full justify-start  text-white hover:bg-zinc-100"
                    }
                ))}>

                <MessageCircle  className='mr-2 size-5'/><span className='hidden md:block'>Message</span></Link>
                </SignedIn>
            </div>
        </div>

        {/* Library */}
        <div className='rounded-lg bg-zinc-900 p-4'>
            <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center text-white px-2'>
                    <Library className='size-5 mr-2'/> 
                    <span className='hidden md:inline'>Playlist</span>
                </div>
            </div>
            <ScrollArea className='h-[calc(100vh-300px)]'>
                <div className='space-y-2'>
                    {isLoading ?(
                        <PlaylistSkeleton />
                    ) : (
                        "Some Music"
                    )}
                </div>
            </ScrollArea>
        </div>
    </div>
  )
}

export default LeftSideBar