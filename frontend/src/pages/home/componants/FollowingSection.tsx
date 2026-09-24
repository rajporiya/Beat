import { useState } from "react";
import { usePlayStore } from "@/stores/usePlayerStore";
import { Play, Check, Plus } from "lucide-react";
import { SPOTIFY_POPULAR_ARTISTS } from "@/data/spotifyHomeData";
import { PODCAST_EPISODES } from "@/data/spotifyBrowseData";
import { getFallbackArtwork } from "@/lib/songArtwork";
import type { Song } from "@/types";

export default function FollowingSection() {
  const { currentSong, setCurrentSong, togglePlay, isPlaying } = usePlayStore();

  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>({
    "Arijit Singh": true,
    "Pritam": true,
    "Jay Shetty": true,
    "David Goggins": true,
    "Ray William Johnson": true,
  });

  const toggleFollow = (name: string) => {
    setFollowingMap((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handlePlayArtist = (name: string, imageUrl: string) => {
    if (currentSong?.artist.toLowerCase().includes(name.toLowerCase())) {
      togglePlay();
      return;
    }

    const payload: Song = {
      _id: `following-${name}`,
      title: `${name} Radio`,
      artist: name,
      albumId: null,
      imageUrl,
      audioUrl: "/songs/aashiqui_2.wav",
      duration: 18,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCurrentSong(payload);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Followed Creators */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Creators & Artists You Follow
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
              New releases and episodes from your library
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {SPOTIFY_POPULAR_ARTISTS.slice(0, 6).map((artist) => {
            const isFollowing = followingMap[artist.name] ?? false;
            const isCurrent =
              currentSong?.artist.toLowerCase().includes(artist.name.toLowerCase()) && isPlaying;

            return (
              <div
                key={artist.id}
                className="group relative p-3.5 rounded-lg bg-[#181818]/60 hover:bg-[#222222] transition-all duration-200 flex flex-col items-center text-center cursor-pointer"
              >
                <div className="relative size-28 sm:size-32 rounded-full overflow-hidden bg-[#282828] mb-3 shadow-lg">
                  <img
                    src={artist.imageUrl}
                    alt={artist.name}
                    onError={(e) => {
                      e.currentTarget.src = getFallbackArtwork(artist.name);
                    }}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  <button
                    type="button"
                    onClick={() => handlePlayArtist(artist.name, artist.imageUrl)}
                    className={`absolute bottom-2 right-2 size-10 rounded-full bg-[#1ed760] text-black flex items-center justify-center shadow-xl transition-all ${
                      isCurrent
                        ? "opacity-100 scale-100"
                        : "opacity-0 group-hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <Play className="size-4 fill-black text-black ml-0.5" />
                  </button>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-white truncate max-w-full">
                  {artist.name}
                </h3>
                <span className="text-xs text-zinc-400 mt-0.5">{artist.role || "Artist"}</span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFollow(artist.name);
                  }}
                  className={`mt-3 px-3 py-1 rounded-full text-xs font-bold transition-colors flex items-center gap-1 ${
                    isFollowing
                      ? "border border-zinc-500 text-white hover:border-white"
                      : "bg-white text-black hover:bg-zinc-200"
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <Check className="size-3 text-[#1ed760]" />
                      Following
                    </>
                  ) : (
                    <>
                      <Plus className="size-3" />
                      Follow
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Followed Podcasts Latest Updates */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-4">
          Latest from Followed Shows
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PODCAST_EPISODES.map((ep) => (
            <div
              key={ep.id}
              onClick={() => {
                const songPayload: Song = {
                  _id: ep.id,
                  title: ep.title,
                  artist: ep.showName,
                  albumId: null,
                  imageUrl: ep.showAvatarUrl,
                  audioUrl: ep.audioUrl,
                  duration: 18,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                };
                setCurrentSong(songPayload);
              }}
              className="p-4 rounded-xl bg-[#1e1e1e] hover:bg-[#282828] transition-colors border border-zinc-800 flex gap-4 cursor-pointer"
            >
              <img
                src={ep.showAvatarUrl}
                alt={ep.showName}
                className="size-16 rounded-lg object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="text-xs text-zinc-400 font-semibold">{ep.showName}</span>
                <h4 className="font-bold text-sm text-white line-clamp-1 mt-0.5 hover:underline">
                  {ep.title}
                </h4>
                <p className="text-xs text-zinc-400 line-clamp-2 mt-1">{ep.description}</p>
                <div className="mt-2 text-[11px] text-zinc-400">
                  {ep.publishDate} • {ep.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
