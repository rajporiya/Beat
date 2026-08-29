import { Topbar } from "@/components/c/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./home/componants/FeaturedSection";

const HomePage = () => {
  const {fetchFeatureSong,fetchMadeForYouSong,fetchTrendingSong, isLoading,madeForYouSongs,featureSong,trendingSong } = useMusicStore()
  useEffect(()=>{
    fetchFeatureSong(), fetchMadeForYouSong(),fetchTrendingSong()
  }, [fetchFeatureSong, fetchMadeForYouSong,fetchTrendingSong ])

  return (
    <div className="rounded-md overflow-hidden">
      <Topbar />
      <FeaturedSection />
    </div>
  )
}

export default HomePage
