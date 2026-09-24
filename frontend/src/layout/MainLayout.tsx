import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSideBar from "./componants/LeftSideBar";
import FreiendActivity from "./componants/FreiendActivity";
import AudioPlayer from "./AudioPlayer";
import PlayBackControl from "./componants/PlayBackControl";
import { useEffect, useState } from "react";
import MobileNav from "./componants/MobileNav";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(false);

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
      <ResizablePanelGroup
        orientation="horizontal"
        className="h-full flex flex-1 overflow-hidden gap-2 p-2 md:pb-2"
      >
        <AudioPlayer />

        {/* Left Sidebar */}
        <ResizablePanel defaultSize={240} minSize={isMobile ? 0 : 180} maxSize={340}>
          <LeftSideBar />
        </ResizablePanel>

        <ResizableHandle className="w-1 bg-black rounded-lg transition-colors hover:bg-zinc-800" />

        {/* Main content right panel */}
        <ResizablePanel
          defaultSize={isMobile ? "100%" : showRightPanel ? "72%" : "100%"}
          minSize={320}
        >
          <div className="relative h-full bg-[#121212] rounded-lg overflow-hidden flex flex-col">
            <Outlet />

            {/* Right sidebar toggle button (Spotify style on right edge) */}
            {!isMobile && (
              <button
                type="button"
                onClick={() => setShowRightPanel((prev) => !prev)}
                title={showRightPanel ? "Collapse Friend Activity" : "Show Friend Activity"}
                aria-label="Toggle Friend Activity"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-4 h-12 bg-black/60 hover:bg-zinc-800/90 text-zinc-400 hover:text-white rounded-l-md border-l border-y border-zinc-800/50 transition-colors shadow-md group cursor-pointer"
              >
                {showRightPanel ? (
                  <ChevronRight className="size-3.5 group-hover:scale-110 transition-transform" />
                ) : (
                  <ChevronLeft className="size-3.5 group-hover:scale-110 transition-transform" />
                )}
              </button>
            )}
          </div>
        </ResizablePanel>

        {/* Optional Right Panel (Friend Activity) */}
        {!isMobile && showRightPanel && (
          <>
            <ResizableHandle className="w-1 bg-black rounded-lg transition-colors hover:bg-zinc-800" />
            <ResizablePanel defaultSize={280} minSize={240} maxSize={360}>
              <div className="h-full relative">
                <FreiendActivity />
                <button
                  type="button"
                  onClick={() => setShowRightPanel(false)}
                  title="Close Friend Activity"
                  className="absolute top-3.5 right-3 p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
                >
                  <Users className="size-4" />
                </button>
              </div>
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>

      <PlayBackControl />
      <MobileNav />
    </div>
  );
};

export default MainLayout;
