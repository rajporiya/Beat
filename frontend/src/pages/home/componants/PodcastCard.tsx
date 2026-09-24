import { Play, Pause } from "lucide-react";
import type { PodcastEpisode } from "@/data/spotifyBrowseData";
import { usePlayStore } from "@/stores/usePlayerStore";
import type { Song } from "@/types";

interface PodcastCardProps {
  episode: PodcastEpisode;
  onOpenVideo?: (episode: PodcastEpisode) => void;
}

export default function PodcastCard({ episode, onOpenVideo }: PodcastCardProps) {
  const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayStore();

  const isCurrent = currentSong?.title.toLowerCase() === episode.title.toLowerCase();
  const isCurrentlyPlaying = isCurrent && isPlaying;

  const handlePlayAudio = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isCurrent) {
      togglePlay();
      return;
    }

    const songPayload: Song = {
      _id: episode.id,
      title: episode.title,
      artist: episode.showName,
      albumId: null,
      imageUrl: episode.showAvatarUrl,
      audioUrl: episode.audioUrl,
      duration: 18,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCurrentSong(songPayload);
  };

  // Select card background based on theme from Image 1
  const getCardBg = () => {
    switch (episode.cardTheme) {
      case "blue":
        return "bg-gradient-to-b from-[#113a5d] to-[#0a2339] border-blue-900/30";
      case "purple":
        return "bg-gradient-to-b from-[#4f0c72] to-[#2f0446] border-purple-900/30";
      case "green":
        return "bg-gradient-to-b from-[#2f3d1f] to-[#1e2714] border-lime-900/30";
      case "cobalt":
        return "bg-[#0c4ea2] border-blue-600/30";
      case "dark":
      default:
        return "bg-[#242424] border-zinc-800";
    }
  };

  return (
    <div
      onClick={handlePlayAudio}
      className={`group relative rounded-2xl p-4 sm:p-5 flex flex-col justify-between border transition-all duration-300 hover:shadow-2xl hover:brightness-105 cursor-pointer ${getCardBg()}`}
    >
      {/* Top Header: Show Avatar + Episode Title + Subtitle */}
      <div className="flex items-start gap-3">
        <div className="size-12 sm:size-14 rounded-lg overflow-hidden shrink-0 bg-black/40 shadow-md">
          <img
            src={episode.showAvatarUrl}
            alt={episode.showName}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3
            className={`font-bold text-sm sm:text-base leading-snug line-clamp-2 transition-colors ${
              isCurrent ? "text-[#1ed760]" : "text-white group-hover:underline"
            }`}
            title={episode.title}
          >
            {episode.title}
          </h3>

          <p className="mt-1 text-xs text-zinc-300 font-medium flex items-center gap-1.5 truncate">
            {episode.subtitle}
          </p>
        </div>
      </div>

      {/* Middle: 16:9 Video Frame */}
      <div
        className="relative aspect-video w-full rounded-xl overflow-hidden bg-black/60 my-3 sm:my-4 shadow-lg group/video cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          if (onOpenVideo) {
            onOpenVideo(episode);
          } else {
            handlePlayAudio();
          }
        }}
      >
        <img
          src={episode.videoThumbnailUrl}
          alt={episode.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover/video:scale-102"
          loading="lazy"
        />

        {/* Video Overlay / Play indicator */}
        <div className="absolute inset-0 bg-black/20 group-hover/video:bg-black/40 transition-colors flex items-center justify-center">
          <div
            className={`size-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-200 ${
              isCurrentlyPlaying
                ? "bg-[#1ed760] text-black scale-105"
                : "bg-black/70 text-white group-hover/video:bg-[#1ed760] group-hover/video:text-black group-hover/video:scale-110"
            }`}
          >
            {isCurrentlyPlaying ? (
              <Pause className="size-5 fill-current" />
            ) : (
              <Play className="size-5 fill-current ml-0.5" />
            )}
          </div>
        </div>

        {/* Video tag badge in corner */}
        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-sm bg-black/80 backdrop-blur-xs text-[10px] font-bold text-white uppercase tracking-wider">
          Video Episode
        </div>
      </div>

      {/* Bottom: Date & Duration & Description */}
      <div className="text-xs text-zinc-300/90 leading-relaxed">
        <p className="line-clamp-3">
          <span className="font-semibold text-white">
            {episode.publishDate} • {episode.duration} •{" "}
          </span>
          {episode.description}
        </p>
      </div>
    </div>
  );
}
