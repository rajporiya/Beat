import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
};

const Modal = ({ open, onClose, title, children, className }: ModalProps) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className={cn("w-full max-w-md rounded-2xl bg-[#181818] p-6 shadow-2xl", className)}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button
            aria-label="Close"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-full text-zinc-400 hover:bg-white/10 hover:text-white"
          >
            <X className="size-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;