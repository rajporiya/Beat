import BeatMusicLogo from "@/components/c/BeatMusicLogo";
import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const HeaderAdimn = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 mb-8 ">
        <Link to="/" className="rounded-lg">
          <BeatMusicLogo className="size-10 text-black" />
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-zinc-400">Music Manager</h1>
          <p className="text-zinc-400 mt-1">Manage your music catalog</p>
        </div>
      </div>

      <UserButton />
    </div>
  );
};

export default HeaderAdimn;