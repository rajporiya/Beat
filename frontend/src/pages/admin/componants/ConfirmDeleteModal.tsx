import { Loader2, TriangleAlert } from "lucide-react";
import Modal from "@/components/ui/modal";

type ConfirmDeleteModalProps = {
  open: boolean;
  title: string;
  message: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmDeleteModal = ({ open, title, message, loading = false, onCancel, onConfirm }: ConfirmDeleteModalProps) => {
  return (
    <Modal open={open} onClose={onCancel} title="Confirm deletion">
      <div className="space-y-5">
        <div className="flex items-start gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-full bg-red-500/10">
            <TriangleAlert className="size-5 text-red-400" />
          </div>
          <div>
            <p className="font-bold text-white">{title}</p>
            <p className="mt-1 text-sm text-zinc-400">{message}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 rounded-full border border-zinc-600 py-2.5 font-bold text-white hover:bg-white/10 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex flex-1 items-center justify-center rounded-full bg-red-500 py-2.5 font-bold text-white hover:bg-red-600 disabled:opacity-50"
          >
            {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;