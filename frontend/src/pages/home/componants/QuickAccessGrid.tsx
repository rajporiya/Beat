import { usePlayStore } from "@/stores/usePlayerStore";
import { Play, Pause } from "lucide-react";
import { QUICK_ACCESS_ITEMS, type QuickAccessItem } from "@/data/spotifyBrowseData";
import { getFallbackArtwork } from "@/lib/songArtwork";
import type { Song } from "@/types";

export default function QuickAccessGrid() {
  const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayStore();

  const handlePlayItem = (item: QuickAccessItem) => {
    // If already current song, toggle
    if (currentSong?.title.toLowerCase() === item.title.toLowerCase()) {
      togglePlay();
      return;
    }

    const songPayload: Song = {
      _id: item.id,
      title: item.title,
      artist: item.artist,
      albumId: null,
      imageUrl: item.imageUrl,
      audioUrl: item.audioUrl,
      duration: 18,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCurrentSong(songPayload);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
      {QUICK_ACCESS_ITEMS.map((item) => {
        const isCurrent =
          currentSong?.title.toLowerCase() === item.title.toLowerCase() ||
          (item.isEqualizerActive && !currentSong);
        const isCurrentlyPlaying = isCurrent && isPlaying;

        return (
          <div
            key={item.id}
            onClick={() => handlePlayItem(item)}
            className="group relative flex items-center bg-[#2a2a2a]/90 hover:bg-[#383838] transition-all duration-200 rounded-md overflow-hidden cursor-pointer shadow-sm pr-3"
            title={`${item.title} - ${item.artist}`}
          >
            {/* Left Cover Art */}
            <div className="relative size-12 sm:size-14 shrink-0 bg-[#1e1e1e]">
              <img
                src={item.imageUrl}
                alt={item.title}
                onError={(e) => {
                  e.currentTarget.src = getFallbackArtwork(item.title);
                }}
                className="w-full h-full object-cover shadow-md"
                loading="lazy"
              />
            </div>

            {/* Middle Title */}
            <div className="min-w-0 flex-1 px-3">
              <p
                className={`text-xs sm:text-sm font-bold truncate ${
                  isCurrentlyPlaying ? "text-[#1ed760]" : "text-white"
                }`}
              >
                {item.title}
              </p>
            </div>

            {/* Right: Equalizer or Play Button */}
            <div className="shrink-0 flex items-center justify-center">
              {isCurrentlyPlaying ? (
                <div className="flex items-end gap-0.5 h-4 px-1" title="Playing">
                  <span className="w-1 bg-[#1ed760] rounded-full animate-bounce [animation-delay:-0.3s] h-3" />
                  <span className="w-1 bg-[#1ed760] rounded-full animate-bounce [animation-delay:-0.1s] h-4" />
                  <span className="w-1 bg-[#1ed760] rounded-full animate-bounce [animation-delay:-0.4s] h-2.5" />
                  <span className="w-1 bg-[#1ed760] rounded-full animate-bounce [animation-delay:-0.2s] h-3.5" />
                </div>
              ) : (
                <button
                  type="button"
                  aria-label={`Play ${item.title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayItem(item);
                  }}
                  className="size-8 sm:size-9 rounded-full bg-[#1ed760] text-black flex items-center justify-center shadow-lg opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  {isCurrentlyPlaying ? (
                    <Pause className="size-4 fill-black text-black" />
                  ) : (
                    <Play className="size-4 fill-black text-black ml-0.5" />
                  )}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
