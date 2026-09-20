import MediaCard from "@/components/music/MediaCard";
import CreateUserAlbumModal from "@/components/CreateUserAlbumModal";
import { getFallbackArtwork } from "@/lib/songArtwork";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SignedIn } from "@clerk/clerk-react";
import { useMusicStore } from "@/stores/useMusicStore";
import { Disc3, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Tab = "Playlists" | "Songs" | "Albums" | "Artists";

export default function LibraryPage() {
  const [tab, setTab] = useState<Tab>("Playlists");
  const { songs, albums, fetchSongs, fetchAlbums } = useMusicStore();
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);

  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, [fetchSongs, fetchAlbums]);

  return (
    <ScrollArea className="h-full">
      <main className="min-h-full bg-[#121212] p-5 sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-3xl font-bold">Your Library</h1>
          <SignedIn>
            <button
              onClick={() => setIsAlbumModalOpen(true)}
              className="flex items-center gap-2 rounded-full bg-[#22c55e] px-4 py-2 text-sm font-bold text-black hover:bg-[#3be477]"
            >
              <Plus className="size-4" />
              Create album
            </button>
          </SignedIn>
        </div>

        <div className="my-6 flex gap-2 overflow-x-auto">
          {(["Playlists", "Songs", "Albums", "Artists"] as Tab[]).map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`rounded-full px-4 py-2 text-sm ${tab === item ? "bg-white text-black" : "bg-[#242424] hover:bg-[#333]"}`}
            >
              {item}
            </button>
          ))}
        </div>

        {tab === "Albums" && (
          <div className="mb-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {albums.map((album) => (
              <Link
                key={album._id}
                to={`/album/${album._id}`}
                className="group rounded-lg bg-[#181818] p-3 transition-colors hover:bg-[#282828]"
              >
                {album.imageUrl ? (
                  <img
                    src={album.imageUrl}
                    onError={(event) => { event.currentTarget.src = getFallbackArtwork(album.title) }}
                    alt={album.title}
                    className="aspect-square w-full rounded-md object-cover shadow-lg"
                  />
                ) : (
                  <div className="grid aspect-square w-full place-items-center rounded-md bg-[#242424] shadow-lg">
                    <Disc3 className="size-12 text-zinc-500" />
                  </div>
                )}
                <p className="mt-3 truncate font-bold">{album.title}</p>
                <p className="mt-1 truncate text-sm text-zinc-400">{album.artist} • {album.releaseYear}</p>
              </Link>
            ))}
            {!albums.length && (
              <div className="col-span-full py-14 text-center text-zinc-400">
                No albums yet. Create your own album to start collecting your music.
              </div>
            )}
          </div>
        )}

        {tab === "Songs" && (
          <>
            <div className="mb-5 text-sm text-zinc-400">
              Recently added <span className="ml-2">⌄</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {songs.map((song) => (
                <MediaCard key={song._id} song={song} />
              ))}
            </div>
            {!songs.length && <p className="py-16 text-center text-zinc-400">Your library is ready for music.</p>}
          </>
        )}

        {tab !== "Songs" && tab !== "Albums" && (
          <p className="py-16 text-center text-zinc-400">Coming soon.</p>
        )}
      </main>
      <CreateUserAlbumModal open={isAlbumModalOpen} onClose={() => setIsAlbumModalOpen(false)} />
    </ScrollArea>
  );
}