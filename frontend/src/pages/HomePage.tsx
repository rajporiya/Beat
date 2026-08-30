import { Topbar } from "@/components/c/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./home/componants/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./home/componants/SectionGrid";

const HomePage = () => {
  const { fetchFeatureSong, fetchMadeForYouSong, fetchTrendingSong, isLoading, madeForYouSongs, trendingSong } = useMusicStore()
  useEffect(()=>{
    fetchFeatureSong(), fetchMadeForYouSong(),fetchTrendingSong()
  }, [fetchFeatureSong, fetchMadeForYouSong,fetchTrendingSong ])

  return (
    <main className="rounded-md overflow-hidden h-full ">
      <Topbar />
      <FeaturedSection />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="space-y-10 p-4">
          <h1 className="text-2xl font-bold">Good Afternoon</h1>
          <SectionGrid  title="Made for you" songs={madeForYouSongs} isLoading={isLoading}/>
          <SectionGrid  title="Trending" songs={trendingSong} isLoading={isLoading}/>
        </div>
      </ScrollArea>
    </main>
  )
}

export default HomePage
