import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { Topbar } from "@/components/c/Topbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayStore } from "@/stores/usePlayerStore";
import FeaturedSection from "./home/componants/FeaturedSection";
import PopularArtists from "./home/componants/PopularArtists";
import SectionGrid from "./home/componants/SectionGrid";

const HomePage = () => {
  const {
    featureSong,
    fetchFeatureSong,
    fetchMadeForYouSong,
    fetchTrendingSong,
    isLoading,
    madeForYouSongs,
    trendingSong,
    err,
  } = useMusicStore();

  useEffect(() => {
    fetchFeatureSong();
    fetchMadeForYouSong();
    fetchTrendingSong();
  }, [fetchFeatureSong, fetchMadeForYouSong, fetchTrendingSong]);

  const { initalizeQueue } = usePlayStore();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  useEffect(() => {
    if (madeForYouSongs.length > 0 && featureSong.length > 0 && trendingSong.length > 0) {
      initalizeQueue([...featureSong, ...madeForYouSongs, ...trendingSong]);
    }
  }, [initalizeQueue, featureSong, madeForYouSongs, trendingSong]);

  return (
    <main className="flex h-full flex-col overflow-hidden rounded-md bg-gradient-to-b from-[#242424] via-[#121212] to-[#121212]">
      <Topbar />

      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-9 p-5 sm:p-7">
          <header>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{greeting}</h1>
            <p className="mt-1 text-sm text-zinc-400">{today}</p>
          </header>

          {err && (
            <div className="flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <AlertTriangle className="size-4 shrink-0" />
              {err}
            </div>
          )}

          <FeaturedSection />
          <SectionGrid title="Trending songs" songs={trendingSong} isLoading={isLoading} />
          <PopularArtists />
          <SectionGrid title="Popular albums and singles" songs={madeForYouSongs} isLoading={isLoading} />
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;