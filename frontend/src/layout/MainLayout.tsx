import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Outlet } from 'react-router-dom'
import LeftSideBar from './componants/LeftSideBar';
import FreiendActivity from './componants/FreiendActivity';
import AudioPlayer from './AudioPlayer';

const MainLayout = () => {
  const isMobile = false;
  
  return (
    <div className='h-screen bg-black text-white flex flex-col'>
      <ResizablePanelGroup orientation='horizontal' className='h-full flex flex-1 overflow-hidden p-2'>
        <AudioPlayer />
        <ResizablePanel defaultSize={200}  minSize={isMobile ? 0 : 10} maxSize={300}>
          {/* left */}
          <LeftSideBar />
        </ResizablePanel>
        {/* Main content */}

        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <div className='h-full bg-zinc-900 rounded-lg overflow-hidden'>
            <Outlet />
          </div>
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        {/* right */}
        <ResizablePanel defaultSize={20} minSize={0} maxSize={250} collapsedSize={0}>
          <FreiendActivity />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default MainLayout
