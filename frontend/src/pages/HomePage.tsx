import { Topbar } from "@/components/c/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./home/componants/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./home/componants/SectionGrid";
import { usePlayStore } from "@/stores/usePlayerStore";

const HomePage = () => {
  const {  featureSong, fetchFeatureSong, fetchMadeForYouSong, fetchTrendingSong, isLoading, madeForYouSongs, trendingSong } = useMusicStore()
  useEffect(()=>{
    fetchFeatureSong(), fetchMadeForYouSong(),fetchTrendingSong()
  }, [fetchFeatureSong, fetchMadeForYouSong,fetchTrendingSong ])

  const { initalizeQueue} = usePlayStore()

  useEffect(()=>{
    if(madeForYouSongs.length > 0 && featureSong.length > 0 && trendingSong.length > 0){
      const allSongs = [...featureSong, ...madeForYouSongs, ...trendingSong]
      initalizeQueue(allSongs)
    }
  },[initalizeQueue,featureSong,madeForYouSongs,trendingSong])
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
