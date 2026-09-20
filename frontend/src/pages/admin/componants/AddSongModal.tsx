import { Loader2, TriangleAlert } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import { axiosInstance } from "@/lib/axios";
import { useMusicStore } from "@/stores/useMusicStore";
import type { Album } from "@/types";

type AddSongModalProps = {
  open: boolean;
  onClose: () => void;
  albums: Album[];
};

const inputClass =
  "mt-2 w-full rounded-md border border-zinc-600 bg-[#242424] p-3 text-sm text-white outline-none focus:border-[#22c55e]";
const labelClass = "block text-sm font-semibold text-white";

const AddSongModal = ({ open, onClose, albums }: AddSongModalProps) => {
  const { fetchSongs, fetchAlbums, fetchStats } = useMusicStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const audioFile = formData.get("audioFile") as File;
    const imageFile = formData.get("imageFile") as File;
    const title = String(formData.get("title") ?? "").trim();
    const artist = String(formData.get("artist") ?? "").trim();

    if (!title || !artist) {
      setError("Title and artist are required.");
      setLoading(false);
      return;
    }
    if (!audioFile?.size || !imageFile?.size) {
      setError("Please select both a song file and a cover image.");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("title", title);
    data.append("artist", artist);
    data.append("duration", String(formData.get("duration") ?? 0));
    data.append("albumId", String(formData.get("albumId") ?? ""));
    data.append("audioFile", audioFile);
    data.append("imageFile", imageFile);

    try {
      await axiosInstance.post("/admin/songs", data);
      await Promise.all([fetchSongs(), fetchAlbums(), fetchStats()]);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to create song");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Add song">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className={labelClass}>
          Song title
          <input required name="title" placeholder="Song title" className={inputClass} />
        </label>
        <label className={labelClass}>
          Artist
          <input required name="artist" placeholder="Artist name" className={inputClass} />
        </label>
        <label className={labelClass}>
          Album
          <select name="albumId" className={inputClass} defaultValue="">
            <option value="">No album</option>
            {albums.map((album) => (
              <option key={album._id} value={album._id}>
                {album.title}
              </option>
            ))}
          </select>
        </label>
        <label className={labelClass}>
          Duration (seconds)
          <input name="duration" type="number" min="0" placeholder="0" className={inputClass} />
        </label>
        <label className={labelClass}>
          Song file (mp3)
          <input
            required
            name="audioFile"
            type="file"
            accept="audio/*"
            className="mt-2 w-full text-sm text-zinc-300 file:mr-3 file:rounded-full file:border-0 file:bg-[#22c55e] file:px-4 file:py-2 file:text-black"
          />
        </label>
        <label className={labelClass}>
          Cover image
          <input
            required
            name="imageFile"
            type="file"
            accept="image/*"
            className="mt-2 w-full text-sm text-zinc-300 file:mr-3 file:rounded-full file:border-0 file:bg-[#22c55e] file:px-4 file:py-2 file:text-black"
          />
        </label>

        {error && (
          <div className="flex items-start gap-2 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-400">
            <TriangleAlert className="mt-0.5 size-4 shrink-0" />
            {error}
          </div>
        )}

        <button
          disabled={loading}
          className="flex w-full items-center justify-center rounded-full bg-[#22c55e] py-3 font-bold text-black hover:bg-[#3be477] disabled:opacity-60"
        >
          {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
          Add song
        </button>
      </form>
    </Modal>
  );
};

export default AddSongModal;