import MediaCard from "@/components/music/MediaCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { Clock3, Heart } from "lucide-react";
import { useEffect } from "react";

export default function CollectionPage({ type }: { type: "liked" | "recent" }) {
  const { songs, fetchSongs } = useMusicStore(); useEffect(() => { fetchSongs(); }, [fetchSongs]);
  const liked = type === "liked";
  return <ScrollArea className="h-full"><main className="min-h-full bg-gradient-to-b from-[#33205c] via-[#121212] to-[#121212] p-5 sm:p-8"><div className="flex items-end gap-5 py-8"><div className="grid size-36 place-items-center rounded-md bg-gradient-to-br from-violet-500 to-blue-300 shadow-xl sm:size-52">{liked ? <Heart className="size-16 fill-white text-white" /> : <Clock3 className="size-16" />}</div><div><p className="text-sm font-bold">PLAYLIST</p><h1 className="mt-2 text-4xl font-black sm:text-6xl">{liked ? "Liked Songs" : "Recently Played"}</h1><p className="mt-4 text-sm text-zinc-300">{songs.length} songs</p></div></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">{songs.map(song => <MediaCard key={song._id} song={song} />)}</div></main></ScrollArea>;
}
