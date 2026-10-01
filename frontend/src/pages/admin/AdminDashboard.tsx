import { Album, ListMusic, Mic2, Play, Plus, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import StatsCard from "./componants/StatsCard";
import { useMusicStore } from "@/stores/useMusicStore";

const AdminDashboard = () => {
  const { stats, songs, albums } = useMusicStore();

  const statsData = [
    { to: "/admin/songs", icon: ListMusic, label: "Total Songs", value: stats.totalSongs.toString(), bgColor: "bg-emerald-500/10", iconColor: "text-emerald-500" },
    { to: "/admin/albums", icon: Album, label: "Total Albums", value: stats.totalAlbums.toString(), bgColor: "bg-violet-500/10", iconColor: "text-violet-500" },
    { to: "/admin/artists", icon: Mic2, label: "Total Artists", value: stats.totalArtists.toString(), bgColor: "bg-orange-500/10", iconColor: "text-orange-500" },
    { to: "/admin/users", icon: Users, label: "Total Users", value: stats.totalUsers.toString(), bgColor: "bg-blue-500/10", iconColor: "text-blue-500" },
  ];

  const quickActions = [
    { to: "/admin/songs", label: "Add song", icon: Plus },
    { to: "/admin/albums", label: "Add album", icon: Album },
    { to: "/admin/users", label: "View users", icon: Users },
  ];

  const recentSongs = songs.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard overview</h1>
        <p className="mt-1 text-zinc-400">Here&apos;s what&apos;s happening across your music catalog.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => (
          <Link key={stat.label} to={stat.to}>
            <StatsCard icon={stat.icon} label={stat.label} value={stat.value} bgColor={stat.bgColor} iconColor={stat.iconColor} />
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent songs */}
        <section className="rounded-xl bg-[#181818] p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <TrendingUp className="size-5 text-[#1ed760]" />
              Latest songs
            </h2>
            <Link to="/admin/songs" className="text-sm font-semibold text-zinc-400 hover:text-white">
              View all
            </Link>
          </div>
          {recentSongs.length ? (
            <ul className="divide-y divide-white/5">
              {recentSongs.map((song) => (
                <li key={song._id} className="flex items-center gap-3 py-3">
                  {song.imageUrl ? (
                    <img src={song.imageUrl} alt={song.title} className="size-11 rounded-md object-cover" />
                  ) : (
                    <div className="grid size-11 place-items-center rounded-md bg-[#242424]">
                      <ListMusic className="size-5 text-zinc-500" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{song.title}</p>
                    <p className="truncate text-sm text-zinc-400">{song.artist}</p>
                  </div>
                  <span className="text-sm text-zinc-500">{song.duration ? `${Math.floor(song.duration / 60)}:${String(Math.floor(song.duration % 60)).padStart(2, "0")}` : "-"}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-8 text-center text-zinc-500">No songs in the catalog yet.</p>
          )}
        </section>

        {/* Quick actions */}
        <section className="rounded-xl bg-[#181818] p-5">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <Play className="size-5 text-[#1ed760]" />
            Quick actions
          </h2>
          <div className="space-y-2">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.to}
                className="flex items-center gap-3 rounded-lg bg-[#242424] px-4 py-3 text-sm font-medium transition-colors hover:bg-[#2f2f2f]"
              >
                <action.icon className="size-4 text-[#1ed760]" />
                {action.label}
              </Link>
            ))}
          </div>
          <div className="mt-6 rounded-lg bg-[#242424] p-4">
            <p className="text-sm font-bold">{albums.length} albums published</p>
            <p className="mt-1 text-xs text-zinc-400">Organize collections in the Albums section.</p>
            <Link to="/admin/albums" className="mt-3 inline-block rounded-full bg-white px-3 py-1.5 text-xs font-bold text-black hover:scale-[1.02]">
              Manage albums
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
