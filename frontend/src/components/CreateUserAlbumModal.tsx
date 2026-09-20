import { Loader2, TriangleAlert } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import { axiosInstance } from "@/lib/axios";
import { useMusicStore } from "@/stores/useMusicStore";

type CreateUserAlbumModalProps = {
  open: boolean;
  onClose: () => void;
};

const inputClass =
  "mt-2 w-full rounded-md border border-zinc-600 bg-[#242424] p-3 text-sm text-white outline-none focus:border-[#22c55e]";
const labelClass = "block text-sm font-semibold text-white";

const CreateUserAlbumModal = ({ open, onClose }: CreateUserAlbumModalProps) => {
  const { fetchAlbums } = useMusicStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    const artist = String(formData.get("artist") ?? "").trim();

    if (!title) {
      setError("Please give your album a name.");
      setLoading(false);
      return;
    }

    try {
      await axiosInstance.post("/album", { title, artist });
      await fetchAlbums();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to create album");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Create your album">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className={labelClass}>
          Album name
          <input required name="title" placeholder="My album name" className={inputClass} />
        </label>
        <label className={labelClass}>
          Artist name (optional)
          <input name="artist" placeholder="Your name" className={inputClass} />
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
          Create album
        </button>
      </form>
    </Modal>
  );
};

export default CreateUserAlbumModal;