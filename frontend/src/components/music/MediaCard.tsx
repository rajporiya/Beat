import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { usePlayStore } from "@/stores/usePlayerStore";
import type { Song } from "@/types";
import { getFallbackArtwork } from "@/lib/songArtwork";

type MediaCardProps = { song: Song; kind?: "song" | "album" };

export default function MediaCard({ song, kind = "song" }: MediaCardProps) {
  const { setCurrentSong } = usePlayStore();
  const target = kind === "album" && song.albumId ? `/album/${song.albumId}` : undefined;
  const content = <>
    <img className="aspect-square w-full rounded-md object-cover shadow-lg" src={song.imageUrl} onError={(event) => { event.currentTarget.src = getFallbackArtwork(song.title); }} alt={`${song.title} artwork`} />
    <button aria-label={`Play ${song.title}`} onClick={(event) => { event.preventDefault(); setCurrentSong(song); }} className="absolute bottom-14 right-5 grid size-12 translate-y-2 place-items-center rounded-full bg-[#22c55e] text-black opacity-0 shadow-xl transition-all hover:scale-105 group-hover:translate-y-0 group-hover:opacity-100">
      <Play className="ml-0.5 size-5 fill-current" />
    </button>
    <p className="mt-3 truncate font-bold">{song.title}</p>
    <p className="mt-1 truncate text-sm text-zinc-400">{song.artist}</p>
  </>;

  const className = "group relative block rounded-lg bg-[#181818] p-3 transition-colors hover:bg-[#282828] sm:p-4";
  return target ? <Link to={target} className={className}>{content}</Link> : <div className={className}>{content}</div>;
}
