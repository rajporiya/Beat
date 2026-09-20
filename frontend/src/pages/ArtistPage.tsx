import MediaCard from "@/components/music/MediaCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { BadgeCheck, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ArtistPage() {
  const { artistId } = useParams(); const { songs, fetchSongs } = useMusicStore();
  useEffect(() => { fetchSongs(); }, [fetchSongs]); const artist = songs.find(song => song.artist.toLowerCase().replaceAll(" ", "-") === artistId)?.artist ?? "Artist"; const artistSongs = songs.filter(song => song.artist === artist);
  return <ScrollArea className="h-full"><main className="min-h-full bg-gradient-to-b from-[#35566b] via-[#121212] to-[#121212]"><header className="flex min-h-80 items-end p-6 sm:p-9"><div><div className="flex items-center gap-1 text-sm font-bold"><BadgeCheck className="size-5 text-sky-400" /> Verified Artist</div><h1 className="mt-3 text-5xl font-black sm:text-7xl">{artist}</h1><p className="mt-4 text-sm font-semibold">1,240,000 monthly listeners</p></div></header><div className="p-6 sm:p-8"><div className="mb-8 flex items-center gap-5"><button aria-label="Play artist" className="grid size-14 place-items-center rounded-full bg-[#22c55e] text-black"><Play className="ml-1 fill-current" /></button><button className="rounded-full border border-zinc-500 px-4 py-2 text-sm font-bold hover:border-white">Follow</button></div><h2 className="mb-4 text-2xl font-bold">Popular</h2><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">{artistSongs.map(song => <MediaCard key={song._id} song={song} />)}</div></div></main></ScrollArea>;
}
