import { useAuthStro } from '@/stores/useAuthStro'
import { useEffect, useState } from 'react'
import HeaderAdimn from './componants/HeaderAdimn'
import DashboardStats from './DashboardStats'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Album, Music, Mic2, Users } from 'lucide-react'
import SongsTabContent from './componants/SongsTabContent '
import AlbumsTabContent from './componants/AlbumsTabContent'
import ArtistsTabContent from './componants/ArtistsTabContent'
import UsersTabContent from './componants/UsersTabContent'
import { useMusicStore } from '@/stores/useMusicStore'

const AdminPage = () => {
  const { isAdmin, isLoading} = useAuthStro()
   const { fetchAlbums, fetchSongs, fetchStats, fetchArtists, fetchUsers}= useMusicStore()
   const [activeTab, setActiveTab] = useState("songs")
  useEffect(()=>{
    fetchAlbums(),
    fetchSongs(),
    fetchStats(),
    fetchArtists(),
    fetchUsers()
  },[fetchAlbums,fetchSongs,fetchStats,fetchArtists,fetchUsers])
  if(!isAdmin && !isLoading) return <div>Unauthorized</div>

  return (
    <div className='min-h-screen bg-[#0b0b0b] text-white'>
      <div className='mx-auto max-w-7xl p-5 sm:p-8'>
      <HeaderAdimn />
      <DashboardStats activeTab={activeTab} onSelect={setActiveTab} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className='space-y-6 '>
        <TabsList className='h-11 p-1 bg-[#242424] rounded-full'>
          <TabsTrigger value='songs' className='rounded-full px-5 flex text-zinc-300 data-[state=active]:bg-white data-[state=active]:text-black'>
            <Music  className='mr-2 size-4 ' />Songs
          </TabsTrigger>
          <TabsTrigger value='albums' className='rounded-full px-5 flex text-zinc-300 data-[state=active]:bg-white data-[state=active]:text-black'>
            <Album  className='mr-2 size-4 ' />Albums
          </TabsTrigger>
          <TabsTrigger value='artists' className='rounded-full px-5 flex text-zinc-300 data-[state=active]:bg-white data-[state=active]:text-black'>
            <Mic2  className='mr-2 size-4 ' />Artists
          </TabsTrigger>
          <TabsTrigger value='users' className='rounded-full px-5 flex text-zinc-300 data-[state=active]:bg-white data-[state=active]:text-black'>
            <Users  className='mr-2 size-4 ' />Users
          </TabsTrigger>
        </TabsList>
        <TabsContent value='songs' className='text-white'>
          <SongsTabContent />
        </TabsContent>
        <TabsContent value='albums' className='text-white'>
          <AlbumsTabContent />
        </TabsContent>
        <TabsContent value='artists' className='text-white'>
          <ArtistsTabContent />
        </TabsContent>
        <TabsContent value='users' className='text-white'>
          <UsersTabContent />
        </TabsContent>
      </Tabs>
      </div>
    </div>
  )
}

export default AdminPage
