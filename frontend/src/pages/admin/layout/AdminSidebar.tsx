import { Album, ArrowLeft, BarChart3, LayoutDashboard, ListMusic, Mic2, ShieldCheck, Users } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/useMusicStore";

type MenuItem = {
  to: string;
  label: string;
  icon: typeof ListMusic;
  end?: boolean;
  badge?: "songs" | "albums" | "artists" | "users";
};

const menus: MenuItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/songs", label: "Songs", icon: ListMusic, badge: "songs" },
  { to: "/admin/albums", label: "Albums", icon: Album, badge: "albums" },
  { to: "/admin/artists", label: "Artists", icon: Mic2, badge: "artists" },
  { to: "/admin/users", label: "Users", icon: Users, badge: "users" },
];

const AdminSidebar = ({ onNavigate }: { onNavigate?: () => void }) => {
  const { stats } = useMusicStore();
  const location = useLocation();

  const badgeValue = (badge?: MenuItem["badge"]) => {
    if (!badge) return null;
    if (badge === "users") return stats.totalUsers;
    if (badge === "artists") return stats.totalArtists;
    if (badge === "albums") return stats.totalAlbums;
    return stats.totalSongs;
  };

  return (
    <div className="flex h-full w-64 shrink-0 flex-col bg-[#0b0b0b] border-r border-white/5">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/5">
        <div className="grid size-9 place-items-center rounded-full bg-[#1ed760]">
          <ShieldCheck className="size-5 text-black" />
        </div>
        <div>
          <p className="text-sm font-bold text-white">Admin Panel</p>
          <p className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">BeatMusic</p>
        </div>
      </div>

      {/* Menus */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        <p className="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-500">Manage</p>
        {menus.map((menu) => (
          <NavLink
            key={menu.to}
            to={menu.to}
            end={menu.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive ? "bg-[#1ed760] text-black" : "text-zinc-300 hover:bg-[#1c1c1c] hover:text-white",
              )
            }
          >
            <menu.icon className="size-5 shrink-0" />
            <span className="flex-1">{menu.label}</span>
            {(() => {
              const value = badgeValue(menu.badge);
              return value != null ? (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] font-bold",
                    location.pathname === menu.to ? "bg-black/15 text-black" : "bg-white/10 text-zinc-300",
                  )}
                >
                  {value}
                </span>
              ) : null;
            })()}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/5 p-3">
        <Link
          to="/home"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 hover:bg-[#1c1c1c] hover:text-white"
        >
          <ArrowLeft className="size-5" />
          Back to music
        </Link>
        <Link
          to="/profile"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 hover:bg-[#1c1c1c] hover:text-white"
        >
          <BarChart3 className="size-5" />
          My profile
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
