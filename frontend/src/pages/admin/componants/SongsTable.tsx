import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";

const SongsTable = () => {
  const { songs, isLoading, err } = useMusicStore();
  const songList = Array.isArray(songs) ? songs : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-zinc-400">Loading songs...</div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-400">{err}</div>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead className="w-[50px]"> </TableHead>
          <TableHead>Title </TableHead>
          <TableHead>Artist </TableHead>
          <TableHead>Release Date </TableHead>
          <TableHead className="text-right">Actions </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {songList.map((song) => (
          <TableRow className="hover:bg-zinc-800/50" key={song._id}>
            <TableCell>
              <img src={song.imageUrl} alt={song.title} className="size-10 rounded object-cover" />
            </TableCell>
            <TableCell className="font-medium">{song.title}</TableCell>
            <TableCell className="font-medium">{song.artist || "Unknown Artist"}</TableCell>``
            <TableCell className="font-medium">{song.createdAt.split("t")[0]}</TableCell>
            <TableCell className="text-right">
              <button className="text-zinc-300 hover:text-white">Edit</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SongsTable;
