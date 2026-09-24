import SectionGridSkeleton from "@/components/skeleton/SectionGridSkeleton";
import { getFallbackArtwork } from "@/lib/songArtwork";
import { usePlayStore } from "@/stores/usePlayerStore";
import type { Song } from "@/types";
import PlayButton from "./PlayButton";

type SectionGridProps = {
  title: string;
  songs: Song[];
  isLoading: boolean;
  onShowAll?: () => void;
};

const SectionGrid = ({ title, songs, isLoading, onShowAll }: SectionGridProps) => {
  const { currentSong, setCurrentSong, togglePlay, isPlaying } = usePlayStore();

  if (isLoading) return <SectionGridSkeleton />;
  if (!songs || !songs.length) return null;

  const handleCardClick = (song: Song) => {
    if (currentSong?._id === song._id) {
      togglePlay();
    } else {
      setCurrentSong(song);
    }
  };

  return (
    <section className="mb-9">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight hover:underline cursor-pointer">
          {title}
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
        {songs.map((song) => {
          const isCurrent = currentSong?._id === song._id;

          return (
            <div
              key={song._id}
              onClick={() => handleCardClick(song)}
              className="group relative p-3 sm:p-3.5 rounded-lg bg-transparent hover:bg-[#181818] transition-all duration-200 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-square w-full rounded-md shadow-lg overflow-hidden bg-[#242424] mb-3">
                <img
                  src={song.imageUrl}
                  onError={(event) => {
                    event.currentTarget.src = getFallbackArtwork(song.title);
                  }}
                  alt={`${song.title} cover`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <PlayButton song={song} />
              </div>

              <h3
                className={`font-semibold text-sm sm:text-base truncate group-hover:underline ${
                  isCurrent ? "text-[#1ed760]" : "text-white"
                }`}
                title={song.title}
              >
                {song.title}
              </h3>

              <p
                className="mt-1 text-xs sm:text-sm text-zinc-400 truncate leading-snug"
                title={song.artist}
              >
                {song.artist}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SectionGrid;
