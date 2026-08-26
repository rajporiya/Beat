import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { Clock, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const formateDuration = (second : number) => {
  const minute = Math.floor(second / 60)
  const remaingSecond = second % 60;
  return `${minute} : ${remaingSecond.toString().padStart(2,"0")}`
}

const AlbumPage = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const { fetchAlbumId, curruntAlbum, isLoading, err } = useMusicStore();

  useEffect(() => {
    if (albumId) fetchAlbumId(albumId);
  }, [fetchAlbumId, albumId]);

  if (isLoading) {
    return (
      <div className="grid h-full place-items-center text-zinc-400">
        Loading album...
      </div>
    );
  }

  if (err || !curruntAlbum) {
    return (
      <div className="grid h-full place-items-center p-6 text-center">
        <div>
          <h1 className="text-xl font-semibold">Album not found</h1>
          <p className="mt-2 text-sm text-zinc-400">
            {err ?? "This album is unavailable."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <ScrollArea className="h-full rounded-md">
        <div className="relative  min-h-full">
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#123456] via-zinc-900 to-zinc-900 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <div className="flex flex-col gap-5 p-6 pb-8 sm:flex-row sm:items-end">
              <img
                src={curruntAlbum.imageUrl}
                alt={curruntAlbum.title}
                className="size-48 rounded shadow-xl object-cover sm:size-60"
              />
              <div>
                <p className="text-sm font-medium">Album</p>
                <h1 className="my-4 text-4xl font-bold sm:text-6xl">
                  {curruntAlbum.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">
                    {curruntAlbum.artist}
                  </span>
                  <span>{curruntAlbum.songs.length} songs</span>
                  <span>{curruntAlbum.releaseYear}</span>
                </div>
              </div>
            </div>
            {/* play button */}
            <div className="px-6 pb-4 flex items-center gap-6">
              <Button className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 transition-all hover:scale-125">
                <Play className="h-7 w-7 text-black" />
              </Button>
            </div>
            {/* table */}
            <div className="bg-black/20 backdrop-blur-2xl">
              <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-3 text-sm text-zinc-400 border-b border-white/5 ">
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>
                  <Clock className="h-4 w-4" />
                </div>
              </div>
            </div>
            {/* songs */}

            <div className="px-6 ">
              <div className="space-y-2 py-4">
                {curruntAlbum?.songs.map((song, index) => (
                  <div
                    key={song._id}
                    className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer`}
                  >
                    <div className="flex items-center justify-center">
                      <span className="group-hover:hidden">{index + 1}</span>
                      <Play className="h-4 w-4 hidden group-hover:block" />
                    </div>
                    <div className="flex items-center gap-3">
                      <img src={song.imageUrl} alt="" />
                      <div className={`font-medium text-white`}>
                        {song.title}
                      </div>
                      <div>{song.artist}</div>
                    </div>
                    <div className="flex items-center">{song.createdAt.split("T")[0]}</div>
                    <div className="flex items-center">{formateDuration(song.duration)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;
