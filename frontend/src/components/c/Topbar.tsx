import {
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";
import { ChevronLeft, ChevronRight, LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStro } from "@/stores/useAuthStro";
import BeatMusicLogo from "./BeatMusicLogo";

export const Topbar = () => {
  const { isAdmin, checkAdminStatus } = useAuthStro();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      checkAdminStatus();
    }
  }, [isSignedIn, checkAdminStatus]);

  return (
    <div className="flex items-center justify-between gap-3 p-4 top-0 bg-[#121212]/80 backdrop-blur-md z-10">
      <div className="flex gap-2 items-center min-w-0">
        <div className="hidden sm:flex gap-2"><button aria-label="Back" className="grid size-8 place-items-center rounded-full bg-black/70 text-zinc-300"><ChevronLeft className="size-5" /></button><button aria-label="Forward" className="grid size-8 place-items-center rounded-full bg-black/70 text-zinc-500"><ChevronRight className="size-5" /></button></div>
        <BeatMusicLogo className="size-8 sm:hidden" />
        <span className="font-bold tracking-tight sm:hidden">BEAT</span>
        {isAdmin && (
          <Link to="/admin" className="ml-1 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-black hover:bg-zinc-200">
            <LayoutDashboardIcon className="size-4" />
            Admin Panel
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* User is logged in */}
        <SignedIn>
          <SignOutButton>
            <button className="hidden sm:block px-4 py-2 rounded-full bg-zinc-800 text-white text-sm font-semibold">
              Sign Out
            </button>
          </SignOutButton>
        </SignedIn>

        <SignedIn><UserButton /></SignedIn>

        {/* User is logged out */}
        <SignedOut>
          <Link to="/login" className="px-4 py-2 rounded-full bg-[#22c55e] text-black text-sm font-bold hover:bg-[#3be477]">
            Log In
          </Link>
        </SignedOut>
      </div>
    </div>
  );
};
