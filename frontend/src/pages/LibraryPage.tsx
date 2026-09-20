import MediaCard from "@/components/music/MediaCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect, useState } from "react";

export default function LibraryPage() {
  const [tab, setTab] = useState("Playlists"); const { songs, fetchSongs } = useMusicStore();
  useEffect(() => { fetchSongs(); }, [fetchSongs]);
  return <ScrollArea className="h-full"><main className="min-h-full bg-[#121212] p-5 sm:p-8"><h1 className="text-3xl font-bold">Your Library</h1><div className="my-6 flex gap-2 overflow-x-auto">{["Playlists", "Songs", "Albums", "Artists"].map(item => <button key={item} onClick={() => setTab(item)} className={`rounded-full px-4 py-2 text-sm ${tab === item ? "bg-white text-black" : "bg-[#242424] hover:bg-[#333]"}`}>{item}</button>)}</div><div className="mb-5 text-sm text-zinc-400">Recently added <span className="ml-2">⌄</span></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">{songs.map(song => <MediaCard key={song._id} song={song} />)}</div>{!songs.length && <p className="py-16 text-center text-zinc-400">Your library is ready for music.</p>}</main></ScrollArea>;
}
