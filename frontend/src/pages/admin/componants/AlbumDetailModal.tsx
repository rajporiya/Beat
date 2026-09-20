import { Loader2, Music2, Plus, Trash2, UserPlus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Modal from "@/components/ui/modal";
import { axiosInstance } from "@/lib/axios";
import { getFallbackArtwork } from "@/lib/songArtwork";
import { useMusicStore } from "@/stores/useMusicStore";
import type { Album, Song } from "@/types";
import AddSongModal from "./AddSongModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const inputClass =
  "mt-2 w-full rounded-md border border-zinc-600 bg-[#242424] p-3 text-sm text-white outline-none focus:border-[#22c55e]";
const labelClass = "block text-sm font-semibold text-white";

const formatDuration = (second: number) => {
  const minute = Math.floor(second / 60);
  const remainingSecond = second % 60;
  return `${minute}:${remainingSecond.toString().padStart(2, "0")}`;
};

type AlbumDetailModalProps = {
  open: boolean;
  onClose: () => void;
  album: Album | null;
};

const AlbumDetailModal = ({ open, onClose, album }: AlbumDetailModalProps) => {
  const { albums, songs: allSongs, fetchAlbums, fetchStats } = useMusicStore();

  const albumId = album?._id ?? null;

  const [title, setTitle] = useState(album?.title ?? "");
  const [artist, setArtist] = useState(album?.artist ?? "");
  const [releaseYear, setReleaseYear] = useState<number>(album?.releaseYear ?? new Date().getFullYear());
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(album?.imageUrl ?? "");

  const [albumSongs, setAlbumSongs] = useState<Song[]>(album?.songs ?? []);
  const [saving, setSaving] = useState(false);
  const [adding, setAdding] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCreateSongOpen, setIsCreateSongOpen] = useState(false);
  const [songToRemove, setSongToRemove] = useState<Song | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (open && album) {
      setTitle(album.title);
      setArtist(album.artist);
      setReleaseYear(album.releaseYear ?? new Date().getFullYear());
      setImageFile(null);
      setPreviewUrl(album.imageUrl || getFallbackArtwork(album.title));
      setAlbumSongs(album.songs ?? []);
      setSelectedIds([]);
      setSongToRemove(null);
      setIsAddModalOpen(false);
      setIsCreateSongOpen(false);
    }
  }, [open, album]);

  const availableSongs = useMemo(() => {
    const inAlbumIds = new Set(albumSongs.map((song) => song._id));
    return allSongs.filter((song) => !inAlbumIds.has(song._id));
  }, [allSongs, albumSongs]);

  if (!open) return null;

  const refetchAlbum = async () => {
    if (!albumId) return;
    const res = await axiosInstance.get(`/album/${albumId}`);
    setAlbumSongs(res.data.songs ?? []);
  };

  const refresh = async () => {
    await Promise.all([fetchAlbums(), fetchStats()]);
  };

  const handleUpdate = async () => {
    if (!albumId) return;
    setSaving(true);
    try {
      const data = new FormData();
      data.append("title", title.trim());
      data.append("artist", artist.trim());
      data.append("releaseYear", String(releaseYear));
      if (imageFile?.size) data.append("imageFile", imageFile);
      const res = await axiosInstance.put(`/admin/albums/${albumId}`, data);
      setAlbumSongs(res.data.songs ?? []);
      await refresh();
      onClose();
    } catch (error: any) {
      console.error("Failed to update album:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleAddSongs = async () => {
    if (!albumId || !selectedIds.length) return;
    setAdding(true);
    try {
      const res = await axiosInstance.post(`/admin/albums/${albumId}/songs`, { songIds: selectedIds });
      setAlbumSongs(res.data.songs ?? []);
      setSelectedIds([]);
      setIsAddModalOpen(false);
      await refresh();
    } catch (error) {
      console.error("Failed to add songs:", error);
    } finally {
      setAdding(false);
    }
  };

  const handleRemoveSong = async () => {
    if (!albumId || !songToRemove) return;
    setRemovingId(songToRemove._id);
    try {
      const res = await axiosInstance.delete(`/admin/albums/${albumId}/songs/${songToRemove._id}`);
      setAlbumSongs(res.data.songs ?? []);
      setSongToRemove(null);
      await refresh();
    } catch (error) {
      console.error("Failed to remove song:", error);
    } finally {
      setRemovingId(null);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const toggleSong = (songId: string) => {
    setSelectedIds((prev) =>
      prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]
    );
  };

  return (
    <>
      <Modal open={open} onClose={onClose} title="Manage album" className="max-w-2xl">
        <div className="max-h-[75vh] space-y-6 overflow-y-auto pr-1">
          <div className="flex gap-4">
            <div className="shrink-0">
              <img
                src={previewUrl}
                onError={(event) => { event.currentTarget.src = getFallbackArtwork(title) }}
                alt={title}
                className="size-28 rounded-md object-cover"
              />
              <label className="mt-2 flex cursor-pointer items-center justify-center rounded-full border border-zinc-600 py-1.5 text-xs font-bold text-white hover:bg-white/10">
                Change
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
            <div className="flex-1 space-y-3">
              <label className={labelClass}>
                Title
                <input value={title} onChange={(event) => setTitle(event.target.value)} className={inputClass} />
              </label>
              <label className={labelClass}>
                Artist
                <input value={artist} onChange={(event) => setArtist(event.target.value)} className={inputClass} />
              </label>
              <label className={labelClass}>
                Release year
                <input
                  type="number"
                  value={releaseYear}
                  onChange={(event) => setReleaseYear(Number(event.target.value))}
                  className={inputClass}
                />
              </label>
            </div>
          </div>

          <button
            onClick={handleUpdate}
            disabled={saving || !title.trim() || !artist.trim()}
            className="flex w-full items-center justify-center rounded-full bg-[#22c55e] py-3 font-bold text-black hover:bg-[#3be477] disabled:opacity-60"
          >
            {saving && <Loader2 className="mr-2 size-4 animate-spin" />}
            Save changes
          </button>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-bold text-white">Songs ({albumSongs.length})</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsCreateSongOpen(true)}
                  className="flex items-center gap-1 rounded-full bg-[#1ed760] px-3 py-1.5 text-xs font-bold text-black hover:bg-[#3be477]"
                >
                  <Plus className="size-4" /> Add song
                </button>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  disabled={!availableSongs.length}
                  className="flex items-center gap-1 rounded-full border border-zinc-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/10 disabled:opacity-50"
                >
                  <UserPlus className="size-4" /> From catalog
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {albumSongs.map((song, index) => (
                <div key={song._id} className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-[#242424]">
                  <span className="w-4 text-sm text-zinc-500">{index + 1}</span>
                  <img src={song.imageUrl} alt={song.title} className="size-10 rounded object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-white">{song.title}</p>
                    <p className="truncate text-sm text-zinc-400">{song.artist}</p>
                  </div>
                  <span className="text-sm text-zinc-400">{formatDuration(song.duration)}</span>
                  <button
                    aria-label={`Remove ${song.title} from album`}
                    onClick={() => setSongToRemove(song)}
                    className="grid size-8 place-items-center rounded-full text-zinc-400 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                    disabled={removingId === song._id}
                  >
                    {removingId === song._id ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                  </button>
                </div>
              ))}
              {!albumSongs.length && (
                <div className="rounded-md border border-dashed border-zinc-700 py-8 text-center text-sm text-zinc-500">
                  <Music2 className="mx-auto mb-2 size-6" />
                  No songs in this album yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>

      {isAddModalOpen && (
        <Modal open onClose={() => setIsAddModalOpen(false)} title="Add songs from catalog" className="max-w-xl">
          <div className="max-h-[50vh] space-y-2 overflow-y-auto pr-1">
            {availableSongs.map((song) => {
              const isSelected = selectedIds.includes(song._id);
              return (
                <label key={song._id} className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 hover:bg-[#242424]">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSong(song._id)}
                    className="size-4 accent-[#22c55e]"
                  />
                  <img src={song.imageUrl} alt={song.title} className="size-10 rounded object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-white">{song.title}</p>
                    <p className="truncate text-sm text-zinc-400">{song.artist}</p>
                  </div>
                </label>
              );
            })}
            {!availableSongs.length && <p className="py-8 text-center text-sm text-zinc-500">All songs are already in this album.</p>}
          </div>
          <button
            onClick={handleAddSongs}
            disabled={!selectedIds.length || adding}
            className="mt-5 flex w-full items-center justify-center rounded-full bg-[#22c55e] py-3 font-bold text-black hover:bg-[#3be477] disabled:opacity-60"
          >
            {adding && <Loader2 className="mr-2 size-4 animate-spin" />}
            Add {selectedIds.length > 0 ? `(${selectedIds.length})` : ""} song{selectedIds.length === 1 ? "" : "s"}
          </button>
        </Modal>
      )}

      <AddSongModal
        open={isCreateSongOpen}
        onClose={async () => {
          setIsCreateSongOpen(false);
          await refetchAlbum();
        }}
        albums={albums}
        defaultAlbumId={albumId ?? ""}
      />

      <ConfirmDeleteModal
        open={songToRemove !== null}
        title={`Remove "${songToRemove?.title}" from album?`}
        message="The song will stay in your music catalog but will no longer be part of this album."
        loading={removingId !== null}
        onCancel={() => setSongToRemove(null)}
        onConfirm={handleRemoveSong}
      />
    </>
  );
};

export default AlbumDetailModal;