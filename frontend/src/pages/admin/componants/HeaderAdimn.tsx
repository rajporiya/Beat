import { UserButton } from "@clerk/clerk-react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const HeaderAdimn = () => {
  return (
    <div className="flex items-start justify-between mb-10">
      <div className="flex items-center gap-4">
        <Link to="/" aria-label="Return to music" className="grid size-10 place-items-center rounded-full bg-[#242424] text-zinc-200 hover:bg-[#353535]">
          <ArrowLeft className="size-5" />
        </Link>

        <div>
          <div className="flex items-center gap-2 text-[#1ed760] text-xs font-bold uppercase tracking-[0.16em]"><ShieldCheck className="size-4" /> Admin workspace</div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">Music manager</h1>
          <p className="text-zinc-400 mt-1">Manage your catalog and publishing library.</p>
        </div>
      </div>

      <UserButton />
    </div>
  );
};

export default HeaderAdimn;
