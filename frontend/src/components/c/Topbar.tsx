import {
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";
import { ChevronLeft, ChevronRight, LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButton from "@/components/SignInOAuthButton";
import { useAuthStro } from "@/stores/useAuthStro";
import BeatMusicLogo from "./BeatMusicLogo";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

export const Topbar = () => {
  const { isAdmin } = useAuthStro();

  return (
    <div className="flex items-center justify-between gap-3 p-4 top-0 bg-[#121212]/80 backdrop-blur-md z-10">
      <div className="flex gap-2 items-center min-w-0">
        <div className="hidden sm:flex gap-2"><button aria-label="Back" className="grid size-8 place-items-center rounded-full bg-black/70 text-zinc-300"><ChevronLeft className="size-5" /></button><button aria-label="Forward" className="grid size-8 place-items-center rounded-full bg-black/70 text-zinc-500"><ChevronRight className="size-5" /></button></div>
        <BeatMusicLogo className="size-8 sm:hidden" />
        <span className="font-bold tracking-tight sm:hidden">BEAT</span>
      </div>

      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to="/admin" className={cn(buttonVariants({ variant : "outline", className: "hidden sm:inline-flex border-0 bg-white text-black hover:bg-zinc-200"}))}>
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin Dashboard
          </Link>
        )}

        {/* User is logged in */}
        <SignedIn>
          <SignOutButton>
            <button className="hidden sm:block px-4 py-2 rounded-full bg-zinc-800 text-white text-sm font-semibold">
              Sign Out
            </button>
          </SignOutButton>
        </SignedIn>

        {/* User is logged out */}
        <SignedOut>
          <SignInOAuthButton />
        </SignedOut>
        <SignedIn><UserButton /></SignedIn>
      </div>
    </div>
  );
};
