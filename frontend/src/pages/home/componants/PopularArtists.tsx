import { useMusicStore } from "@/stores/useMusicStore";

export default function PopularArtists() {
  const { trendingSong } = useMusicStore();
  const artists = Array.from(new Map(trendingSong.map(song => [song.artist, song])).values());
  if (!artists.length) return null;
  return <section className="mb-8"><h2 className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">Popular artists</h2><div className="flex gap-4 overflow-x-auto pb-2">{artists.map(song => <article key={song.artist} className="group w-36 shrink-0 rounded-lg p-3 transition-colors hover:bg-[#282828]"><img src={song.imageUrl} alt={song.artist} className="aspect-square w-full rounded-full object-cover shadow-lg transition-transform group-hover:scale-[1.02]" /><h3 className="mt-3 truncate font-bold">{song.artist}</h3><p className="mt-1 text-sm text-zinc-400">Artist</p></article>)}</div></section>;
}
