import { Button } from "@/components/ui/button";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayStore } from "@/stores/usePlayerStore";
import type { Song } from "@/types";
import { ChevronLeft, Mic2, Music2, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface RightPanelToggleProps {
  onOpen: () => void;
}

const RightPanelToggle = ({ onOpen }: RightPanelToggleProps) => {
  const { currentSong, setCurrentSong, isPlaying } = usePlayStore();
  const { songs, fetchSongs } = useMusicStore();
  const [displayedSong, setDisplayedSong] = useState<Song | null>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!songs.length) fetchSongs();
  }, [songs.length, fetchSongs]);

  const pickRandomSong = useCallback((): Song | null => {
    const pool = songs.length ? songs : currentSong ? [currentSong] : [];
    if (!pool.length) return null;
    return pool[Math.floor(Math.random() * pool.length)];
  }, [songs, currentSong]);

  useEffect(() => {
    if (!hovered) {
      setDisplayedSong(null);
      return;
    }
    // show the currently playing song first, then rotate random songs
    setDisplayedSong(currentSong ?? pickRandomSong());
    const interval = setInterval(() => setDisplayedSong(pickRandomSong()), 3000);
    return () => clearInterval(interval);
  }, [hovered, currentSong, pickRandomSong]);

  const handlePlay = () => {
    if (displayedSong) setCurrentSong(displayedSong);
  };

  const isCurrent = displayedSong?._id === currentSong?._id;
  const relation = isCurrent ? "Now playing" : "Discover something new";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex h-full w-11 shrink-0 flex-col overflow-hidden rounded-lg bg-zinc-900 transition-all duration-300 hover:bg-zinc-800 hover:w-[300px]"
    >
      <Button
        onClick={onOpen}
        variant="ghost"
        size="icon"
        title="Show friends activity"
        aria-label="Show friends activity"
        className="absolute left-1/2 top-1/2 z-10 size-9 -translate-x-1/2 -translate-y-1/2 rounded-full text-zinc-400 hover:text-white hover:bg-transparent group-hover:left-2 group-hover:top-2 group-hover:translate-x-0 group-hover:translate-y-0"
      >
        <ChevronLeft className="size-5" />
      </Button>

      {/* song details shown inside the panel on hover */}
      <div className={`flex-col pl-11 ${hovered ? "flex h-full min-h-0" : "hidden"}`}>
        {displayedSong ? (
          <>
            <button
              onClick={handlePlay}
              title={`Play ${displayedSong.title}`}
              className="block p-3 pb-2 text-left"
            >
              <div className="relative">
                <img
                  src={displayedSong.imageUrl}
                  onError={(event) => {
                    if (!event.currentTarget.src.startsWith("https://placehold.co")) {
                      event.currentTarget.src = `https://placehold.co/600x600/27272a/f5d0fe?text=${encodeURIComponent(displayedSong.title)}`;
                    }
                  }}
                  alt={displayedSong.title}
                  className="aspect-square w-full rounded-lg object-cover"
                />
                <div className="absolute bottom-2 right-2 flex size-10 items-center justify-center rounded-full bg-[#1ed760] text-black shadow-lg">
                  {isCurrent && isPlaying ? (
                    <Pause className="size-5" fill="currentColor" />
                  ) : (
                    <Play className="ml-0.5 size-5" fill="currentColor" />
                  )}
                </div>
              </div>
            </button>
            <div className="space-y-1 px-3 pb-3">
              <p className="truncate text-base font-semibold text-white">{displayedSong.title}</p>
              <p className="truncate text-sm text-zinc-400">{displayedSong.artist}</p>
              <p className="flex items-center gap-1.5 pt-1.5 text-xs text-emerald-400">
                <Mic2 className="size-3.5 shrink-0" />
                {relation}
              </p>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-4 text-center">
            <div className="rounded-full bg-zinc-800 p-3">
              <Music2 className="size-6 text-emerald-400" />
            </div>
            <p className="text-sm font-medium text-white">No songs yet</p>
            <p className="text-xs text-zinc-400">Click the icon to see friends activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightPanelToggle;