import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Topbar } from "@/components/c/Topbar";
import { axiosInstance } from "@/lib/axios";
import { useAuthStro } from "@/stores/useAuthStro";

type Stats = { totalSongs: number; totalAlbums: number; totalUsers: number; totalArtists: number };

const AdminPage = () => {
  const { isAdmin } = useAuthStro();
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin) return;
    axiosInstance.get<Stats>("/stats")
      .then(({ data }) => setStats(data))
      .catch((requestError) => setError(requestError.response?.data?.message || "Unable to load dashboard statistics."));
  }, [isAdmin]);

  if (!isAdmin) return <Navigate to="/" replace />;

  const cards = [["Songs", stats?.totalSongs], ["Albums", stats?.totalAlbums], ["Users", stats?.totalUsers], ["Artists", stats?.totalArtists]];
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Topbar />
      <main className="p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="mt-1 text-zinc-400">Overview of your Beat Music library.</p>
        {error && <p className="mt-6 text-red-400">{error}</p>}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(([label, value]) => <section key={String(label)} className="rounded-lg border border-zinc-800 bg-zinc-900 p-5"><p className="text-sm text-zinc-400">{label}</p><p className="mt-2 text-3xl font-semibold">{value ?? "—"}</p></section>)}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
