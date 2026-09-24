import { usePlayStore } from "@/stores/usePlayerStore";
import { Play, Pause } from "lucide-react";
import type { DailyMixItem } from "@/data/spotifyBrowseData";
import { getFallbackArtwork } from "@/lib/songArtwork";
import type { Song } from "@/types";

interface DailyMixCardProps {
  item: DailyMixItem;
}

export default function DailyMixCard({ item }: DailyMixCardProps) {
  const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayStore();

  const isCurrent = currentSong?.title.toLowerCase() === item.title.toLowerCase();
  const isCurrentlyPlaying = isCurrent && isPlaying;

  const handlePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isCurrent) {
      togglePlay();
      return;
    }

    const songPayload: Song = {
      _id: item.id,
      title: item.title,
      artist: item.subtitle,
      albumId: null,
      imageUrl: item.imageUrl,
      audioUrl: item.audioUrl,
      duration: 18,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCurrentSong(songPayload);
  };

  const isDiscoverWeekly = item.title === "Discover Weekly";

  return (
    <div
      onClick={() => handlePlay()}
      className="group relative p-3 sm:p-3.5 rounded-lg bg-[#181818]/60 hover:bg-[#222222] transition-all duration-200 cursor-pointer flex flex-col"
    >
      {/* Cover Image Container */}
      <div className="relative aspect-square w-full rounded-md shadow-lg overflow-hidden bg-[#282828] mb-3">
        {isDiscoverWeekly ? (
          // Discover Weekly Graphic Artwork
          <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#1e0826] via-[#3d185b] to-[#120524] flex flex-col justify-between p-3 select-none">
            {/* Spotify / Beat Logo top */}
            <div className="flex items-center gap-1.5">
              <div className="size-3.5 rounded-full bg-white flex items-center justify-center">
                <div className="size-2 rounded-full bg-black" />
              </div>
            </div>

            {/* Geometric colorful bars */}
            <div className="absolute inset-0 flex items-center justify-center opacity-85 pointer-events-none">
              <div className="flex gap-1.5 rotate-[-12deg] scale-125">
                <div className="w-4 h-28 bg-[#ff5e7e] rounded-sm transform translate-y-2" />
                <div className="w-4 h-32 bg-[#a355f7] rounded-sm transform -translate-y-2" />
                <div className="w-4 h-24 bg-[#00d2c4] rounded-sm transform translate-y-4" />
                <div className="w-4 h-30 bg-[#ffaa00] rounded-sm transform -translate-y-1" />
              </div>
            </div>

            {/* Large Discover Weekly Typography */}
            <div className="relative z-10 font-black tracking-tight text-white leading-none">
              <span className="block text-2xl sm:text-3xl font-black drop-shadow-md">DISCOVER</span>
              <span className="block text-2xl sm:text-3xl font-black drop-shadow-md text-zinc-100">WEEKLY</span>
            </div>
          </div>
        ) : (
          // Daily Mix Artwork with Authentic Spotify Styling
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.title}
              onError={(e) => {
                e.currentTarget.src = getFallbackArtwork(item.title);
              }}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />

            {/* Top Spotify/Beat Logo */}
            <div className="absolute top-2 left-2 size-4 rounded-full bg-black/60 backdrop-blur-xs flex items-center justify-center">
              <div className="size-2 rounded-full bg-white" />
            </div>

            {/* Bottom Spotify Daily Mix Banner */}
            <div className="absolute bottom-0 inset-x-0 h-9 sm:h-10 bg-black/85 backdrop-blur-sm flex items-center justify-between px-2.5">
              {/* Daily Mix Label Pill */}
              <span
                className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-sm"
                style={{
                  backgroundColor: item.badgeColor,
                  color: "#000000",
                }}
              >
                {item.badgeText}
              </span>

              {/* Number Badge */}
              <span
                className="text-base sm:text-lg font-black tracking-tighter"
                style={{ color: item.badgeColor }}
              >
                {item.badgeNumber}
              </span>
            </div>
          </div>
        )}

        {/* Hover / Active Play Button */}
        <button
          type="button"
          aria-label={`Play ${item.title}`}
          onClick={handlePlay}
          className={`absolute bottom-2.5 right-2.5 size-11 sm:size-12 rounded-full bg-[#1ed760] hover:bg-[#1fdf64] hover:scale-105 shadow-2xl flex items-center justify-center transition-all duration-200 text-black ${
            isCurrentlyPlaying
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
          }`}
        >
          {isCurrentlyPlaying ? (
            <Pause className="size-5 fill-black text-black" />
          ) : (
            <Play className="size-5 fill-black text-black ml-0.5" />
          )}
        </button>
      </div>

      {/* Card Text */}
      <h3
        className={`font-semibold text-sm sm:text-base truncate group-hover:underline ${
          isCurrent ? "text-[#1ed760]" : "text-white"
        }`}
        title={item.title}
      >
        {item.title}
      </h3>

      <p
        className="mt-1 text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed"
        title={item.subtitle}
      >
        {item.subtitle}
      </p>
    </div>
  );
}
