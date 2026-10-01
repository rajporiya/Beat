import {
  SignedIn,
  SignedOut,
  useAuth,
  useUser,
} from "@clerk/clerk-react";
import {
  Bell,
  Home,
  LayoutDashboardIcon,
  ListMusic,
  Search,
  Users,
  Download,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStro } from "@/stores/useAuthStro";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Topbar = () => {
  const { isAdmin, checkAdminStatus } = useAuthStro();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (isSignedIn) {
      checkAdminStatus();
    }
  }, [isSignedIn, checkAdminStatus]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  // Initials avatar fallback
  const initials =
    (user?.fullName || user?.firstName || "U")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U";

  return (
    <div className="flex items-center justify-between gap-2 px-4 py-2.5 top-0 bg-[#121212] z-10 shrink-0 border-b border-white/5">

      {/* LEFT: Logo */}
      <div className="flex items-center gap-3 shrink-0">
        <Link to="/home" aria-label="BeatMusic Home">
          <div className="size-9 rounded-full bg-white flex items-center justify-center overflow-hidden hover:scale-105 transition-transform shrink-0">
            <img
              src="/Animation/title.svg"
              alt="BeatMusic"
              className="w-full h-full object-contain scale-75"
            />
          </div>
        </Link>
        {isAdmin && (
          <Link
            to="/admin"
            className="ml-1 hidden sm:inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-black hover:bg-zinc-200"
          >
            <LayoutDashboardIcon className="size-3.5" />
            Admin
          </Link>
        )}
      </div>

      {/* CENTER: Home + Search + Queue */}
      <div className="flex items-center gap-2 flex-1 max-w-[560px] mx-2">
        {/* Home button */}
        <Link
          to="/home"
          aria-label="Home"
          className="size-10 shrink-0 rounded-full bg-[#242424] hover:bg-[#2a2a2a] text-white flex items-center justify-center transition-colors"
        >
          <Home className="size-5" />
        </Link>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex-1 relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 group-focus-within:text-white transition-colors pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to play?"
            className="w-full h-10 bg-[#2a2a2a] hover:bg-[#3a3a3a] focus:bg-[#3a3a3a] text-white placeholder:text-zinc-400 text-sm rounded-full pl-10 pr-10 outline-none border-2 border-transparent focus:border-white/20 transition-all"
          />
          {/* Browse / grid icon on right */}
          <Link
            to="/search"
            aria-label="Browse"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
            tabIndex={-1}
          >
            <ListMusic className="size-4" />
          </Link>
        </form>

        {/* Queue button */}
        <Link
          to="/library"
          aria-label="Your Library"
          className="size-10 shrink-0 rounded-full bg-[#242424] hover:bg-[#2a2a2a] text-zinc-400 hover:text-white flex items-center justify-center transition-colors hidden md:flex"
        >
          <ListMusic className="size-5" />
        </Link>
      </div>

      {/* RIGHT: Premium, Install, Bell, Friends, Avatar */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Explore Premium */}
        <SignedIn>
          <a
            href="#premium"
            className="hidden lg:flex items-center gap-1.5 rounded-full border border-zinc-400 px-3.5 py-1.5 text-xs font-bold text-white hover:border-white hover:scale-105 transition-all whitespace-nowrap"
          >
            Explore Premium
          </a>
        </SignedIn>

        <SignedOut>
          <Link
            to="/login"
            className="hidden sm:flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-black hover:scale-105 transition-all whitespace-nowrap"
          >
            Log In
          </Link>
        </SignedOut>

        {/* Install App */}
        <button
          aria-label="Install App"
          className="hidden lg:flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-[#2a2a2a] transition-all whitespace-nowrap"
        >
          <Download className="size-3.5" />
          Install App
        </button>

        {/* Bell / Notifications */}
        <SignedIn>
          <button
            aria-label="Notifications"
            className="size-8 rounded-full text-zinc-400 hover:text-white hover:bg-[#2a2a2a] flex items-center justify-center transition-colors"
          >
            <Bell className="size-4" />
          </button>
        </SignedIn>

        {/* Friends / People */}
        <SignedIn>
          <button
            aria-label="Friends activity"
            className="size-8 rounded-full text-zinc-400 hover:text-white hover:bg-[#2a2a2a] flex items-center justify-center transition-colors"
          >
            <Users className="size-4" />
          </button>
        </SignedIn>

        {/* Avatar / Profile link */}
        <SignedIn>
          <button
            type="button"
            onClick={() => navigate("/profile")}
            aria-label="Open your profile"
            title="Your profile"
            className="rounded-full focus:outline-none"
          >
            <Avatar className="size-8 ring-2 ring-[#863bff]/60 transition-all hover:ring-[#863bff]">
              {user?.imageUrl ? <AvatarImage src={user.imageUrl} alt={user.fullName ?? "Profile"} /> : null}
              <AvatarFallback className="bg-[#242424] text-xs font-bold text-white">{initials}</AvatarFallback>
            </Avatar>
          </button>
        </SignedIn>
      </div>
    </div>
  );
};
