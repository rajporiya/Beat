import { getFallbackArtwork } from "@/lib/songArtwork";
import { SPOTIFY_POPULAR_ARTISTS, type ArtistItem } from "@/data/spotifyHomeData";
import { usePlayStore } from "@/stores/usePlayerStore";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";

type PopularArtistsProps = {
  artists?: ArtistItem[];
  onShowAll?: () => void;
};

export default function PopularArtists({
  artists = SPOTIFY_POPULAR_ARTISTS,
  onShowAll,
}: PopularArtistsProps) {
  const { queue, setCurrentSong, togglePlay, currentSong, isPlaying } = usePlayStore();

  if (!artists || !artists.length) return null;

  const handleArtistPlay = (e: React.MouseEvent, artistName: string) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if current song is already by this artist
    if (currentSong?.artist.toLowerCase().includes(artistName.toLowerCase())) {
      togglePlay();
      return;
    }

    // Find song by this artist in the queue
    const matchedSong = queue.find((s) =>
      s.artist.toLowerCase().includes(artistName.toLowerCase())
    );

    if (matchedSong) {
      setCurrentSong(matchedSong);
    }
  };

  return (
    <section className="mb-9">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight hover:underline cursor-pointer">
          Popular artists
        </h2>
        <button
          type="button"
          onClick={onShowAll}
          className="text-xs sm:text-sm font-bold text-zinc-400 hover:text-white hover:underline transition-colors cursor-pointer"
        >
          Show all
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 min-[1800px]:grid-cols-8 gap-4">
        {artists.map((artist) => {
          const isArtistActive =
            currentSong?.artist.toLowerCase().includes(artist.name.toLowerCase()) && isPlaying;

          return (
            <Link
              key={artist.id || artist.name}
              to={`/artist/${artist.name.toLowerCase().replaceAll(" ", "-")}`}
              className="group relative p-3 sm:p-3.5 rounded-lg bg-transparent hover:bg-[#181818] transition-all duration-200 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-square w-full rounded-full shadow-lg overflow-hidden bg-[#242424] mb-3">
                <img
                  src={artist.imageUrl}
                  onError={(event) => {
                    event.currentTarget.src = getFallbackArtwork(artist.name);
                  }}
                  alt={artist.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />

                <button
                  type="button"
                  aria-label={`Play ${artist.name}`}
                  onClick={(e) => handleArtistPlay(e, artist.name)}
                  className={`absolute bottom-2 right-2 size-11 sm:size-12 rounded-full bg-[#1ed760] hover:bg-[#1fdf64] hover:scale-105 shadow-2xl flex items-center justify-center transition-all duration-200 text-black ${
                    isArtistActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                  }`}
                >
                  <Play className="size-5 fill-black text-black ml-0.5" />
                </button>
              </div>

              <h3 className="font-semibold text-sm sm:text-base text-white truncate group-hover:underline">
                {artist.name}
              </h3>

              <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                {artist.role || "Artist"}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}