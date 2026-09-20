import MediaCard from "@/components/music/MediaCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState(""); const [filter, setFilter] = useState("All");
  const { songs, albums, fetchSongs, fetchAlbums } = useMusicStore();
  useEffect(() => { fetchSongs(); fetchAlbums(); }, [fetchSongs, fetchAlbums]);
  const results = useMemo(() => songs.filter(song => `${song.title} ${song.artist}`.toLowerCase().includes(query.toLowerCase())), [songs, query]);
  return <ScrollArea className="h-full"><main className="min-h-full bg-[#121212] p-5 sm:p-8"><h1 className="mb-6 text-3xl font-bold">Search</h1><label className="flex max-w-xl items-center gap-3 rounded-full bg-white px-4 py-3 text-black shadow-lg"><Search className="size-5" /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="What do you want to play?" className="w-full bg-transparent text-sm font-medium outline-none" /></label><div className="my-7 flex gap-2 overflow-x-auto">{["All", "Songs", "Albums", "Artists", "Playlists"].map(item => <button key={item} onClick={() => setFilter(item)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${filter === item ? "bg-white text-black" : "bg-[#242424] text-white hover:bg-[#333]"}`}>{item}</button>)}</div>{query ? <section><h2 className="mb-4 text-2xl font-bold">Results for “{query}”</h2><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">{results.map(song => <MediaCard key={song._id} song={song} />)}</div>{!results.length && <p className="py-16 text-center text-zinc-400">No music found. Try another search.</p>}</section> : <section><h2 className="mb-4 text-2xl font-bold">Browse all</h2><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{albums.slice(0, 8).map(album => <div key={album._id} className="relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-fuchsia-600 to-violet-900 p-4"><p className="text-xl font-bold">{album.title}</p><img src={album.imageUrl} alt="" className="absolute -bottom-4 -right-4 size-28 rotate-24 rounded-md object-cover shadow-xl" /></div>)}</div></section>}</main></ScrollArea>;
}
