import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music } from "lucide-react";
import SongsTable from "./SongsTable";

const SongsTabContent = () => {
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
          <Button className="rounded-full bg-[#1ed760] font-bold text-black hover:bg-[#3be477]">+ Add song</Button>
        </div>
      </CardHeader>
      <CardContent>
        <SongsTable />
      </CardContent>
    </Card>
  );
};

export default SongsTabContent;
