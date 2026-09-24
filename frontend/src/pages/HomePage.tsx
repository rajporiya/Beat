import { useEffect, useMemo } from "react";
import { Topbar } from "@/components/c/Topbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayStore } from "@/stores/usePlayerStore";
import PopularArtists from "./home/componants/PopularArtists";
import SectionGrid from "./home/componants/SectionGrid";
import {
  SPOTIFY_TRENDING_SONGS,
  SPOTIFY_POPULAR_ARTISTS,
  SPOTIFY_POPULAR_ALBUMS,
} from "@/data/spotifyHomeData";

const HomePage = () => {
  const {
    fetchFeatureSong,
    fetchMadeForYouSong,
    fetchTrendingSong,
    isLoading,
    madeForYouSongs,
    trendingSong,
  } = useMusicStore();

  const { initalizeQueue, queue } = usePlayStore();

  useEffect(() => {
    fetchFeatureSong();
    fetchMadeForYouSong();
    fetchTrendingSong();
  }, [fetchFeatureSong, fetchMadeForYouSong, fetchTrendingSong]);

  // Combine fetched songs with our high-definition showcase items (prioritizing showcase to match photo)
  const displayTrendingSongs = useMemo(() => {
    if (!trendingSong || trendingSong.length === 0) return SPOTIFY_TRENDING_SONGS;
    return [
      ...SPOTIFY_TRENDING_SONGS,
      ...trendingSong.filter(
        (s) => !SPOTIFY_TRENDING_SONGS.some((st) => st.title.toLowerCase() === s.title.toLowerCase())
      ),
    ];
  }, [trendingSong]);

  const displayAlbums = useMemo(() => {
    if (!madeForYouSongs || madeForYouSongs.length === 0) return SPOTIFY_POPULAR_ALBUMS;
    return [
      ...SPOTIFY_POPULAR_ALBUMS,
      ...madeForYouSongs.filter(
        (s) => !SPOTIFY_POPULAR_ALBUMS.some((sa) => sa.title.toLowerCase() === s.title.toLowerCase())
      ),
    ];
  }, [madeForYouSongs]);

  useEffect(() => {
    const totalCount = displayTrendingSongs.length + displayAlbums.length;
    if (queue.length !== totalCount) {
      initalizeQueue([...displayTrendingSongs, ...displayAlbums]);
    }
  }, [initalizeQueue, queue.length, displayTrendingSongs, displayAlbums]);

  return (
    <main className="flex h-full flex-col overflow-hidden bg-[#121212]">
      <Topbar />

      <ScrollArea className="min-h-0 flex-1">
        <div className="px-5 py-3 sm:px-7 sm:py-5 space-y-7 pb-24">
          {/* Section 1: Trending songs */}
          <SectionGrid
            title="Trending songs"
            songs={displayTrendingSongs}
            isLoading={isLoading && !displayTrendingSongs.length}
          />

          {/* Section 2: Popular artists */}
          <PopularArtists artists={SPOTIFY_POPULAR_ARTISTS} />

          {/* Section 3: Popular albums and singles */}
          <SectionGrid
            title="Popular albums and singles"
            songs={displayAlbums}
            isLoading={isLoading && !displayAlbums.length}
          />
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;