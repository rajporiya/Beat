import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSideBar from "./componants/LeftSideBar";
import NowPlayingSidebar from "./componants/NowPlayingSidebar";
import AudioPlayer from "./AudioPlayer";
import PlayBackControl from "./componants/PlayBackControl";
import { useEffect, useState } from "react";
import MobileNav from "./componants/MobileNav";

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="h-screen bg-black text-white flex flex-col selection:bg-[#1ed760] selection:text-black">
      <AudioPlayer />

      <div className="h-full flex flex-1 overflow-hidden gap-2 p-2 md:pb-2">
        <ResizablePanelGroup
          orientation="horizontal"
          className="h-full flex flex-1 overflow-hidden gap-2"
        >
          {/* Left Sidebar */}
          <ResizablePanel defaultSize={240} minSize={isMobile ? 0 : 180} maxSize={340}>
            <LeftSideBar />
          </ResizablePanel>

          <ResizableHandle className="w-1 bg-black rounded-lg transition-colors hover:bg-zinc-800" />

          {/* Main content */}
          <ResizablePanel defaultSize={100} minSize={320}>
            <div className="relative h-full bg-[#121212] rounded-lg overflow-hidden flex flex-col">
              <Outlet />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>

        {/* Right side panel - Now Playing view showing current song */}
        {!isMobile && (
          <NowPlayingSidebar
            isCollapsed={isRightPanelCollapsed}
            onToggleCollapse={() => setIsRightPanelCollapsed((prev) => !prev)}
          />
        )}
      </div>

      <PlayBackControl />
      <MobileNav />
    </div>
  );
};

export default MainLayout;
