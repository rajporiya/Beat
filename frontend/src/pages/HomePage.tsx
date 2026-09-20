import { Topbar } from "@/components/c/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./home/componants/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./home/componants/SectionGrid";
import { usePlayStore } from "@/stores/usePlayerStore";
import PopularArtists from "./home/componants/PopularArtists";

const HomePage = () => {
  const {  featureSong, fetchFeatureSong, fetchMadeForYouSong, fetchTrendingSong, isLoading, madeForYouSongs, trendingSong } = useMusicStore()
  useEffect(()=>{
    fetchFeatureSong(), fetchMadeForYouSong(),fetchTrendingSong()
  }, [fetchFeatureSong, fetchMadeForYouSong,fetchTrendingSong ])

  const { initalizeQueue} = usePlayStore()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"

  useEffect(()=>{
    if(madeForYouSongs.length > 0 && featureSong.length > 0 && trendingSong.length > 0){
      const allSongs = [...featureSong, ...madeForYouSongs, ...trendingSong]
      initalizeQueue(allSongs)
    }
  },[initalizeQueue,featureSong,madeForYouSongs,trendingSong])
  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-[#242424] via-[#121212] to-[#121212]">
      <Topbar />
      <FeaturedSection />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="space-y-10 p-5 sm:p-7">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{greeting}</h1>
          <SectionGrid title="Trending songs" songs={trendingSong} isLoading={isLoading}/>
          <PopularArtists />
          <SectionGrid title="Popular albums and singles" songs={madeForYouSongs} isLoading={isLoading}/>
        </div>
      </ScrollArea>
    </main>
  )
}

export default HomePage
