import { X, Play, Pause, Volume2 } from "lucide-react";
import type { PodcastEpisode } from "@/data/spotifyBrowseData";
import { usePlayStore } from "@/stores/usePlayerStore";

interface PodcastVideoModalProps {
  episode: PodcastEpisode | null;
  onClose: () => void;
}

export default function PodcastVideoModal({ episode, onClose }: PodcastVideoModalProps) {
  const { isPlaying, togglePlay, currentSong } = usePlayStore();

  if (!episode) return null;

  const isCurrentEpisode = currentSong?.title.toLowerCase() === episode.title.toLowerCase();

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#181818] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#121212]">
          <div className="flex items-center gap-3">
            <img
              src={episode.showAvatarUrl}
              alt={episode.showName}
              className="size-10 rounded-md object-cover"
            />
            <div>
              <h4 className="font-bold text-sm sm:text-base text-white truncate max-w-md sm:max-w-xl">
                {episode.title}
              </h4>
              <p className="text-xs text-zinc-400">{episode.showName}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Video Area */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          <img
            src={episode.videoThumbnailUrl}
            alt={episode.title}
            className="w-full h-full object-cover opacity-90"
          />

          {/* Center Play Button Overlay */}
          <button
            type="button"
            onClick={togglePlay}
            className="size-16 sm:size-20 rounded-full bg-[#1ed760] hover:bg-[#1fdf64] hover:scale-105 active:scale-95 text-black flex items-center justify-center shadow-2xl transition-all duration-200 cursor-pointer"
          >
            {isPlaying && isCurrentEpisode ? (
              <Pause className="size-8 fill-black text-black" />
            ) : (
              <Play className="size-8 fill-black text-black ml-1" />
            )}
          </button>

          {/* Bottom status bar */}
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-zinc-300 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg">
            <span>{episode.publishDate} • {episode.duration}</span>
            <div className="flex items-center gap-2">
              <Volume2 className="size-4 text-[#1ed760]" />
              <span>Enhanced Audio</span>
            </div>
          </div>
        </div>

        {/* Description section */}
        <div className="p-6 bg-[#181818] space-y-2">
          <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Episode Notes</h5>
          <p className="text-sm text-zinc-300 leading-relaxed">{episode.description}</p>
        </div>
      </div>
    </div>
  );
}
