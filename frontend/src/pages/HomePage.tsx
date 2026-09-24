import { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Topbar } from "@/components/c/Topbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayStore } from "@/stores/usePlayerStore";
import SectionGrid from "./home/componants/SectionGrid";
import PopularArtists from "./home/componants/PopularArtists";
import QuickAccessGrid from "./home/componants/QuickAccessGrid";
import DailyMixCard from "./home/componants/DailyMixCard";
import PodcastCard from "./home/componants/PodcastCard";
import PodcastVideoModal from "./home/componants/PodcastVideoModal";
import FollowingSection from "./home/componants/FollowingSection";
import {
  SPOTIFY_TRENDING_SONGS,
  SPOTIFY_POPULAR_ARTISTS,
  SPOTIFY_POPULAR_ALBUMS,
} from "@/data/spotifyHomeData";
import {
  DAILY_MIX_ITEMS,
  MORE_LIKE_ITEMS,
  PODCAST_EPISODES,
  SECOND_ROW_PODCASTS,
  type PodcastEpisode,
} from "@/data/spotifyBrowseData";

type FilterTab = "All" | "Music" | "Podcasts" | "Following";

const HomePage = () => {
  const { user } = useUser();
  const userName = user?.fullName || user?.firstName || "Raj Poriya";

  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [selectedVideoPodcast, setSelectedVideoPodcast] = useState<PodcastEpisode | null>(null);

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

  // Combine fetched songs with showcase items
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
    if (queue.length !== totalCount && totalCount > 0) {
      initalizeQueue([...displayTrendingSongs, ...displayAlbums]);
    }
  }, [initalizeQueue, queue.length, displayTrendingSongs, displayAlbums]);

  // Compute filter chips based on user instructions:
  // - Default / All: [All, Music, Podcasts]
  // - If clicked Music: [All, Music, Following, Podcasts]
  // - If clicked Podcasts: [All, Music, Podcasts, Following]
  // - If clicked Following: [All, Music, Following, Podcasts]
  const currentChips: FilterTab[] = useMemo(() => {
    if (activeTab === "All") {
      return ["All", "Music", "Podcasts"];
    }
    if (activeTab === "Music") {
      return ["All", "Music", "Following", "Podcasts"];
    }
    if (activeTab === "Podcasts") {
      return ["All", "Music", "Podcasts", "Following"];
    }
    if (activeTab === "Following") {
      return ["All", "Music", "Following", "Podcasts"];
    }
    return ["All", "Music", "Podcasts"];
  }, [activeTab]);

  return (
    <main className="flex h-full flex-col overflow-hidden bg-[#121212] select-none">
      <Topbar />

      {/* Filter Chips Bar (Replicating Spotify Top Navigation) */}
      <div className="sticky top-0 z-20 flex items-center gap-2 px-5 py-2.5 sm:px-7 bg-[#121212]/95 backdrop-blur-md shrink-0 overflow-x-auto no-scrollbar">
        {currentChips.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all duration-150 cursor-pointer shrink-0 ${
                isActive
                  ? "bg-white text-black shadow-md scale-100 hover:scale-[1.02]"
                  : "bg-[#2a2a2a] text-white hover:bg-[#383838] hover:text-white"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="px-5 py-4 sm:px-7 space-y-9 pb-28">
          {/* ========================================================= */}
          {/* VIEW: MUSIC (Matching Image 2)                            */}
          {/* ========================================================= */}
          {activeTab === "Music" && (
            <div className="space-y-9 animate-in fade-in duration-200">
              {/* Top Quick Access 8-Grid (Sitaare, The Rish Mix, etc.) */}
              <QuickAccessGrid />

              {/* Section 1: Made For [Raj Poriya] */}
              <section>
                <div className="flex items-end justify-between mb-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-0.5">
                      Made For
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight hover:underline cursor-pointer">
                      {userName}
                    </h2>
                  </div>
                  <button
                    type="button"
                    className="text-xs sm:text-sm font-bold text-zinc-400 hover:text-white hover:underline transition-colors cursor-pointer"
                  >
                    Show all
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {DAILY_MIX_ITEMS.map((mix) => (
                    <DailyMixCard key={mix.id} item={mix} />
                  ))}
                </div>
              </section>

              {/* Section 2: More like The Rish Mix */}
              <section>
                <div className="flex items-end justify-between mb-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-0.5">
                      More like
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight hover:underline cursor-pointer">
                      The Rish Mix
                    </h2>
                  </div>
                  <button
                    type="button"
                    className="text-xs sm:text-sm font-bold text-zinc-400 hover:text-white hover:underline transition-colors cursor-pointer"
                  >
                    Show all
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
                  {MORE_LIKE_ITEMS.map((song) => (
                    <SectionGridItem key={song._id} song={song} />
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW: PODCASTS (Matching Image 1)                         */}
          {/* ========================================================= */}
          {activeTab === "Podcasts" && (
            <div className="space-y-9 animate-in fade-in duration-200">
              {/* Row 1: 3-column layout under headers "Episodes to try" */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PODCAST_EPISODES.map((ep) => (
                  <div key={ep.id} className="flex flex-col">
                    <h3 className="text-sm font-bold text-zinc-300 mb-3 px-1">
                      Episodes to try
                    </h3>
                    <PodcastCard
                      episode={ep}
                      onOpenVideo={(episode) => setSelectedVideoPodcast(episode)}
                    />
                  </div>
                ))}
              </div>

              {/* Row 2: 3-column layout under individual headers (Similar to your interests / Videos you might like) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SECOND_ROW_PODCASTS.map((item) => (
                  <div key={item.id} className="flex flex-col">
                    <h3 className="text-sm font-bold text-zinc-300 mb-3 px-1">
                      {item.columnTitle}
                    </h3>
                    <PodcastCard
                      episode={item.episode}
                      onOpenVideo={(episode) => setSelectedVideoPodcast(episode)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW: FOLLOWING                                           */}
          {/* ========================================================= */}
          {activeTab === "Following" && <FollowingSection />}

          {/* ========================================================= */}
          {/* VIEW: ALL (Combines Quick Access, Made For, Podcasts & Hits)*/}
          {/* ========================================================= */}
          {activeTab === "All" && (
            <div className="space-y-9 animate-in fade-in duration-200">
              {/* Quick Access Grid */}
              <QuickAccessGrid />

              {/* Section: Made For [Raj Poriya] */}
              <section>
                <div className="flex items-end justify-between mb-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-0.5">
                      Made For
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight hover:underline cursor-pointer">
                      {userName}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("Music")}
                    className="text-xs sm:text-sm font-bold text-zinc-400 hover:text-white hover:underline transition-colors cursor-pointer"
                  >
                    Show all
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {DAILY_MIX_ITEMS.map((mix) => (
                    <DailyMixCard key={mix.id} item={mix} />
                  ))}
                </div>
              </section>

              {/* Section: Episodes to try (Podcasts Showcase) */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight hover:underline cursor-pointer">
                    Episodes to try
                  </h2>
                  <button
                    type="button"
                    onClick={() => setActiveTab("Podcasts")}
                    className="text-xs sm:text-sm font-bold text-zinc-400 hover:text-white hover:underline transition-colors cursor-pointer"
                  >
                    Show all
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {PODCAST_EPISODES.map((ep) => (
                    <PodcastCard
                      key={ep.id}
                      episode={ep}
                      onOpenVideo={(episode) => setSelectedVideoPodcast(episode)}
                    />
                  ))}
                </div>
              </section>

              {/* Section: Trending songs */}
              <SectionGrid
                title="Trending songs"
                songs={displayTrendingSongs}
                isLoading={isLoading && !displayTrendingSongs.length}
              />

              {/* Section: Popular artists */}
              <PopularArtists artists={SPOTIFY_POPULAR_ARTISTS} />

              {/* Section: Popular albums and singles */}
              <SectionGrid
                title="Popular albums and singles"
                songs={displayAlbums}
                isLoading={isLoading && !displayAlbums.length}
              />
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Video Modal Player for Podcasts */}
      <PodcastVideoModal
        episode={selectedVideoPodcast}
        onClose={() => setSelectedVideoPodcast(null)}
      />
    </main>
  );
};

// Sub-component for individual card in "More like The Rish Mix"
import PlayButton from "./home/componants/PlayButton";
import { getFallbackArtwork } from "@/lib/songArtwork";
import type { Song } from "@/types";

function SectionGridItem({ song }: { song: Song }) {
  const { currentSong, setCurrentSong, togglePlay } = usePlayStore();
  const isCurrent = currentSong?._id === song._id;

  const handleCardClick = () => {
    if (isCurrent) {
      togglePlay();
    } else {
      setCurrentSong(song);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative p-3 sm:p-3.5 rounded-lg bg-[#181818]/60 hover:bg-[#222222] transition-all duration-200 cursor-pointer flex flex-col"
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

      <p className="mt-1 text-xs sm:text-sm text-zinc-400 truncate leading-snug" title={song.artist}>
        {song.artist}
      </p>
    </div>
  );
}

export default HomePage;