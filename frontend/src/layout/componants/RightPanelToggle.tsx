import { ChevronLeft } from "lucide-react";

interface RightPanelToggleProps {
  onOpen: () => void;
}

const RightPanelToggle = ({ onOpen }: RightPanelToggleProps) => {
  return (
    <aside
      onClick={onOpen}
      className="h-full w-10 md:w-11 bg-[#121212] rounded-lg flex items-center justify-center hover:bg-[#181818] transition-colors cursor-pointer group shrink-0 select-none"
      title="Expand right panel"
      aria-label="Expand right panel"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
        className="text-zinc-400 group-hover:text-white group-hover:scale-125 transition-transform p-2 rounded-full focus:outline-hidden cursor-pointer"
        title="Expand right panel"
        aria-label="Expand right panel"
      >
        <ChevronLeft className="size-5" />
      </button>
    </aside>
  );
};

export default RightPanelToggle;