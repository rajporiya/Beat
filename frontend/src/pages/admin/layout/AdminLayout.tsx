import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuthStro } from "@/stores/useAuthStro";
import { useMusicStore } from "@/stores/useMusicStore";
import AdminSidebar from "./AdminSidebar";
import { UserButton } from "@/providers/AuthProvider";

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/songs": "Songs",
  "/admin/albums": "Albums",
  "/admin/artists": "Artists",
  "/admin/users": "Users",
};

const AdminLayout = () => {
  const { isAdmin, isLoading } = useAuthStro();
  const { fetchAlbums, fetchSongs, fetchStats, fetchArtists, fetchUsers } = useMusicStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetchAlbums();
    fetchSongs();
    fetchStats();
    fetchArtists();
    fetchUsers();
  }, [fetchAlbums, fetchSongs, fetchStats, fetchArtists, fetchUsers]);

  // Close mobile drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  if (!isAdmin && !isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#0b0b0b] text-white">
        <div className="text-center">
          <p className="text-2xl font-bold">Unauthorized</p>
          <p className="mt-2 text-sm text-zinc-400">You don&apos;t have access to the admin panel.</p>
        </div>
      </div>
    );
  }

  const title = pageTitles[location.pathname] ?? "Admin";

  return (
    <div className="flex min-h-screen bg-[#0b0b0b] text-white">
      {/* Desktop sidebar */}
      <div className="sticky top-0 hidden h-screen md:block">
        <AdminSidebar />
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setDrawerOpen(false)} />
          <div className="absolute left-0 top-0 h-full shadow-xl">
            <AdminSidebar onNavigate={() => setDrawerOpen(false)} />
          </div>
          <button
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
            className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-[#242424] text-white"
          >
            <X className="size-5" />
          </button>
        </div>
      )}

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-white/5 bg-[#0b0b0b]/90 px-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="grid size-9 place-items-center rounded-lg bg-[#242424] text-zinc-200 hover:bg-[#353535] md:hidden"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-lg font-bold">{title}</h2>
          </div>
          <UserButton />
        </header>

        {/* Routed page */}
        <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
