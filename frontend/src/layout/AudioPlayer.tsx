import { usePlayStore } from '@/stores/usePlayerStore'
import { useEffect, useRef } from 'react'

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const prevSongRef = useRef<string | null>(null)
  const { currentSong, isPlaying, playNext } = usePlayStore()

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (!currentSong) {
      audio.pause()
      audio.removeAttribute('src')
      prevSongRef.current = null
      return
    }

    const songChanged = prevSongRef.current !== currentSong._id

    if (songChanged) {
      audio.src = currentSong.audioUrl
      audio.currentTime = 0
      prevSongRef.current = currentSong._id
    }

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error('Failed to play audio:', error)
      })
    } else {
      audio.pause()
    }
  }, [currentSong, isPlaying])

  // song end
  useEffect(() => {
    const audio = audioRef.current

    const handleEnded = () => {
      playNext()
    }

    audio?.addEventListener('ended', handleEnded)
    return () => audio?.removeEventListener('ended', handleEnded)
  }, [playNext])

  return (
    <audio ref={audioRef} preload="auto" />
  )
}

export default AudioPlayer