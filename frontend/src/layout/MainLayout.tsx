import { Outlet } from "react-router-dom";
import LeftSideBar from "./componants/LeftSideBar";
import NowPlayingSidebar from "./componants/NowPlayingSidebar";
import AudioPlayer from "./AudioPlayer";
import PlayBackControl from "./componants/PlayBackControl";
import { useEffect, useState } from "react";
import MobileNav from "./componants/MobileNav";

import { ChevronLeft } from "lucide-react";

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [leftWidth, setLeftWidth] = useState(280);
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isDraggingLeft) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Clamped between 200px and 450px
      const newWidth = Math.min(Math.max(e.clientX - 8, 200), 450);
      setLeftWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsDraggingLeft(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingLeft]);

  return (
    <div className="h-screen bg-black text-white flex flex-col selection:bg-[#1ed760] selection:text-black">
      <AudioPlayer />

      <div className="h-full flex flex-1 overflow-hidden gap-2 p-2 md:pb-2">
        {/* Left Sidebar - width is fixed/dragged and NEVER decreases when right panel opens/closes */}
        {!isMobile && (
          <>
            <aside
              style={{ width: `${leftWidth}px` }}
              className={`h-full shrink-0 overflow-hidden flex flex-col ${
                isDraggingLeft ? "select-none" : "transition-[width] duration-150"
              }`}
            >
              <LeftSideBar />
            </aside>

            {/* Draggable handle to resize left sidebar */}
            <div
              onMouseDown={() => setIsDraggingLeft(true)}
              className="w-1 bg-black hover:bg-zinc-700 active:bg-[#1ed760] transition-colors cursor-col-resize rounded-lg shrink-0"
              title="Drag to resize sidebar"
            />
          </>
        )}

        {/* Middle Main Content - Flex-1 so only middle content increases/decreases when sidebars open/close */}
        <main className="relative h-full flex-1 min-w-0 bg-[#121212] rounded-lg overflow-hidden flex flex-col">
          <Outlet />
        </main>

        {/* Right side panel - Now Playing view */}
        {!isMobile && !isPanelCollapsed && (
          <NowPlayingSidebar onCollapse={() => setIsPanelCollapsed(true)} />
        )}
        {!isMobile && isPanelCollapsed && (
          <button
            type="button"
            onClick={() => setIsPanelCollapsed(false)}
            title="Expand Now Playing"
            className="h-full w-8 bg-[#121212] hover:bg-[#181818] rounded-lg flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0 border border-transparent hover:border-zinc-800"
          >
            <ChevronLeft className="size-4" />
          </button>
        )}
      </div>

      <PlayBackControl />
      <MobileNav />
    </div>
  );
};

export default MainLayout;
