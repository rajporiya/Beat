import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { formateDuration } from "@/pages/home/AlbumPage";
import { usePlayStore } from "@/stores/usePlayerStore";
import {
  Laptop2,
  ListMusic,
  Mic2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume1,
} from "lucide-react";
import { useEffect, useState } from "react";

const iconButtonClass =
  "size-8 text-zinc-400 hover:bg-transparent hover:text-white disabled:opacity-35";

const PlayBackControl = () => {
  const { currentSong, togglePlay, isPlaying, playNext, playPrevious } =
    usePlayStore();
  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = document.querySelector("audio");
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime || 0);
    const updateDuration = () =>
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const resetTime = () => {
      setCurrentTime(0);
      setDuration(0);
    };

    audio.volume = volume / 100;
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("durationchange", updateDuration);
    audio.addEventListener("emptied", resetTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
      audio.removeEventListener("emptied", resetTime);
    };
  }, [currentSong, volume]);

  const handleSeek = ([nextTime]: number[]) => {
    const audio = document.querySelector("audio");
    if (audio && Number.isFinite(nextTime)) {
      audio.currentTime = nextTime;
      setCurrentTime(nextTime);
    }
  };

  const handleVolume = ([nextVolume]: number[]) => {
    const audio = document.querySelector("audio");
    setVolume(nextVolume);
    if (audio) audio.volume = nextVolume / 100;
  };

  const hasSong = Boolean(currentSong);

  return (
    <footer className="h-20 shrink-0 border-t border-white/10 bg-zinc-950 px-3 sm:h-24 sm:px-4">
      <div className="mx-auto grid h-full max-w-[1800px] grid-cols-[minmax(180px,1fr)_minmax(280px,560px)_minmax(180px,1fr)] items-center gap-4 sm:gap-6">
        <div className="hidden min-w-0 items-center gap-3 sm:flex">
          {currentSong ? (
            <>
              <img src={currentSong.imageUrl} alt={currentSong.title} className="size-14 shrink-0 rounded object-cover" />
              <div className="min-w-0 leading-tight">
                <p className="truncate text-sm font-medium text-white hover:underline">{currentSong.title}</p>
                <p className="mt-1 truncate text-xs text-zinc-400 hover:text-white hover:underline">{currentSong.artist}</p>
              </div>
            </>
          ) : (
            <p className="text-xs text-zinc-500">Choose a song to start listening</p>
          )}
        </div>

        <div className="flex min-w-0 flex-col items-center gap-2">
          <div className="flex h-8 items-center justify-center gap-2 sm:gap-3">
            <Button title="Shuffle" aria-label="Shuffle" size="icon" variant="ghost" className={`${iconButtonClass} hidden sm:inline-flex`} disabled={!hasSong}><Shuffle className="size-4" /></Button>
            <Button title="Previous" aria-label="Previous track" size="icon" variant="ghost" className={iconButtonClass} onClick={playPrevious} disabled={!hasSong}><SkipBack className="size-4" fill="currentColor" /></Button>
            <Button title={isPlaying ? "Pause" : "Play"} aria-label={isPlaying ? "Pause" : "Play"} size="icon" className="size-8 rounded-full bg-[#1ed760] text-black hover:scale-105 hover:bg-[#3be477] disabled:bg-zinc-700 disabled:text-zinc-400" onClick={togglePlay} disabled={!hasSong}>
              {isPlaying ? <Pause className="size-4" fill="currentColor" /> : <Play className="ml-0.5 size-4" fill="currentColor" />}
            </Button>
            <Button title="Next" aria-label="Next track" size="icon" variant="ghost" className={iconButtonClass} onClick={playNext} disabled={!hasSong}><SkipForward className="size-4" fill="currentColor" /></Button>
            <Button title="Repeat" aria-label="Repeat" size="icon" variant="ghost" className={`${iconButtonClass} hidden sm:inline-flex`} disabled={!hasSong}><Repeat className="size-4" /></Button>
          </div>

          <div className="flex w-full items-center gap-2 text-[11px] tabular-nums text-zinc-400">
            <span className="w-9 text-right">{formateDuration(currentTime)}</span>
            <Slider aria-label="Playback progress" value={[Math.min(currentTime, duration || 0)]} max={duration || 1} step={1} className="[&_[data-slot=slider-track]]:h-1 [&_[data-slot=slider-track]]:bg-zinc-700 [&_[data-slot=slider-range]]:bg-zinc-300 [&_[data-slot=slider-thumb]]:size-3 [&_[data-slot=slider-thumb]]:border-0 [&_[data-slot=slider-thumb]]:opacity-0 hover:[&_[data-slot=slider-thumb]]:opacity-100" onValueChange={handleSeek} disabled={!hasSong || !duration} />
            <span className="w-9">{formateDuration(duration)}</span>
          </div>
        </div>

        <div className="hidden items-center justify-end gap-1 sm:flex">
          <Button title="Lyrics" aria-label="Lyrics" size="icon" variant="ghost" className={iconButtonClass}><Mic2 className="size-4" /></Button>
          <Button title="Queue" aria-label="Queue" size="icon" variant="ghost" className={iconButtonClass}><ListMusic className="size-4" /></Button>
          <Button title="Connect to a device" aria-label="Connect to a device" size="icon" variant="ghost" className={iconButtonClass}><Laptop2 className="size-4" /></Button>
          <div className="ml-1 flex items-center gap-1">
            <Button title="Volume" aria-label="Volume" size="icon" variant="ghost" className={iconButtonClass}><Volume1 className="size-4" /></Button>
            <Slider aria-label="Volume" value={[volume]} max={100} step={1} className="w-24 [&_[data-slot=slider-track]]:h-1 [&_[data-slot=slider-track]]:bg-zinc-700 [&_[data-slot=slider-range]]:bg-zinc-300 [&_[data-slot=slider-thumb]]:size-3 [&_[data-slot=slider-thumb]]:border-0 [&_[data-slot=slider-thumb]]:opacity-0 hover:[&_[data-slot=slider-thumb]]:opacity-100" onValueChange={handleVolume} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PlayBackControl;
