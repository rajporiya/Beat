import { useAuthStro } from '@/stores/useAuthStro'
import React, { useEffect } from 'react'
import HeaderAdimn from './componants/HeaderAdimn'
import DashboardStats from './DashboardStats'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Album, Music } from 'lucide-react'
import SongsTabContent from './componants/SongsTabContent '
import AlbumsTabContent from './componants/AlbumsTabContent'
import { useMusicStore } from '@/stores/useMusicStore'

const AdminPage = () => {
  const { isAdmin, isLoading} = useAuthStro()
   const { fetchAlbums, fetchSongs, fetchStats}= useMusicStore()
  useEffect(()=>{
    fetchAlbums(),
    fetchSongs(),
    fetchStats()
  },[fetchAlbums,fetchSongs,fetchStats])
  if(!isAdmin && !isLoading) return <div>Unauthorized</div>

  return (
    <div className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-900 p-8'>
      <HeaderAdimn />
      <DashboardStats />

      <Tabs defaultValue='songs' className='space-y-6 '>
        <TabsList className='p-1 bg-zinc-800/50'> 
          <TabsTrigger value='songs' className='flex  data-[state=active]:bg-zinc-700'>
            <Music  className='mr-2 size-4 ' />Songs
          </TabsTrigger>
          <TabsTrigger value='albums' className='flex  data-[state=active]:bg-zinc-700'>
            <Album  className='mr-2 size-4 ' />Albums
          </TabsTrigger>
        </TabsList>
        <TabsContent value='songs' className='text-white'>
          <SongsTabContent />
        </TabsContent>
        <TabsContent value='albums' className='text-white'>
          <AlbumsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminPage