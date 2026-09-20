import { Button } from '@/components/ui/button'
import { usePlayStore } from '@/stores/usePlayerStore'
import type { Song } from '@/types'
import { Pause, Play } from 'lucide-react'

const PlayButton = ({song} : { song : Song}) => {
    const { currentSong, isPlaying, setCurrentSong , togglePlay} = usePlayStore()
    const isCurrentSong = currentSong?._id === song._id
    const handlePlay = () =>{
        if(isCurrentSong) togglePlay()
            else setCurrentSong(song)
    }
  return (
    <Button size={'icon'} aria-label={`Play ${song.title}`} onClick={handlePlay} className={`absolute bottom-3 right-2 rounded-full bg-[#1ed760] hover:bg-[#3be477] hover:scale-105 transition-all shadow-xl
  opacity-0 translate-y-2 group-hover:translate-y-0 ${
    isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"
  }`}>
    {isCurrentSong && isPlaying? (
        <Pause className='size-5 text-black'/>
    ) : (
        <Play className='size-5 text-black'/>
    )}
  </Button>
  )
}

export default PlayButton
