import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music } from "lucide-react";
import { useState } from "react";
import AddSongModal from "./AddSongModal";
import SongsTable from "./SongsTable";
import { useMusicStore } from "@/stores/useMusicStore";

const SongsTabContent = () => {
  const { albums } = useMusicStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card className="border-0 bg-[#181818] text-white shadow-none">
      <CardHeader className="border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Music className="size-5 text-emerald-500" />
              Song Library
            </CardTitle>
            <CardDescription className="text-zinc-400">All tracks available in your music catalog</CardDescription>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="rounded-full bg-[#1ed760] font-bold text-black hover:bg-[#3be477]">+ Add song</Button>
        </div>
      </CardHeader>
      <CardContent>
        <SongsTable />
      </CardContent>
      <AddSongModal open={isModalOpen} onClose={() => setIsModalOpen(false)} albums={albums} />
    </Card>
  );
};

export default SongsTabContent;