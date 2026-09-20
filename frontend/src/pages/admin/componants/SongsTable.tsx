import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";
import { axiosInstance } from "@/lib/axios";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import type { Song } from "@/types";

const SongsTable = () => {
  const { songs, isLoading, err, fetchSongs, fetchAlbums, fetchStats } = useMusicStore();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [songToDelete, setSongToDelete] = useState<Song | null>(null);
  const songList = Array.isArray(songs) ? songs : [];

  const confirmDelete = async () => {
    if (!songToDelete) return;
    setDeletingId(songToDelete._id);
    try {
      await axiosInstance.delete(`/admin/songs/${songToDelete._id}`);
      await Promise.all([fetchSongs(), fetchAlbums(), fetchStats()]);
      setSongToDelete(null);
    } catch (error) {
      console.error("Failed to delete song:", error);
    } finally {
      setDeletingId(null);
    }
  };

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
    <>
      <Table>
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead className="w-[50px]"> </TableHead>
          <TableHead>Title </TableHead>
          <TableHead>Artist </TableHead>
          <TableHead className="hidden md:table-cell">Added</TableHead>
          <TableHead className="text-right">Actions </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {songList.map((song) => (
          <TableRow className="hover:bg-zinc-800/50" key={song._id}>
            <TableCell>
              <img src={song.imageUrl} alt={song.title} className="size-10 rounded object-cover" />
            </TableCell>
            <TableCell className="font-medium text-white">{song.title}</TableCell>
            <TableCell className="text-zinc-400">{song.artist || "Unknown Artist"}</TableCell>
            <TableCell className="hidden md:table-cell text-zinc-400">{song.createdAt ? new Date(song.createdAt).toLocaleDateString() : "-"}</TableCell>
            <TableCell className="text-right">
              <button
                aria-label={`Delete ${song.title}`}
                onClick={() => setSongToDelete(song)}
                className="grid size-8 place-items-center rounded-full text-zinc-400 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                disabled={deletingId === song._id}
              >
                {deletingId === song._id ? <Loader2 className="size-5 animate-spin" /> : <Trash2 className="size-5" />}
              </button>
            </TableCell>
          </TableRow>
        ))}
        {!songList.length && (
          <TableRow><TableCell colSpan={5} className="py-12 text-center text-zinc-500">No songs have been added yet.</TableCell></TableRow>
        )}
      </TableBody>
    </Table>
      <ConfirmDeleteModal
        open={songToDelete !== null}
        title={`Delete "${songToDelete?.title}"?`}
        message="This will permanently remove the song from your music catalog."
        loading={deletingId !== null}
        onCancel={() => setSongToDelete(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default SongsTable;