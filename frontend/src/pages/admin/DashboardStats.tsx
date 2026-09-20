import { useMusicStore } from '@/stores/useMusicStore'
import { Library, ListMusic, PlayCircle, Users2 } from 'lucide-react';
import StatsCard from './componants/StatsCard';

type DashboardStatsProps = {
  activeTab: string;
  onSelect: (tab: string) => void;
};

const DashboardStats = ({ activeTab, onSelect }: DashboardStatsProps) => {
  const { stats }= useMusicStore()
  const statsData = [
  {
    tab: "songs",
    icon: ListMusic,
    label: "Total Songs",
    value: stats.totalSongs.toString(),
    bgColor: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
  },
  {
    tab: "albums",
    icon: Library,
    label: "Total Albums",
    value: stats.totalAlbums.toString(),
    bgColor: "bg-violet-500/10",
    iconColor: "text-violet-500",
  },
  {
    tab: "artists",
    icon: Users2,
    label: "Total Artists",
    value: stats.totalArtists.toString(),
    bgColor: "bg-orange-500/10",
    iconColor: "text-orange-500",
  },
  {
    tab: "users",
    icon: PlayCircle,
    label: "Total Users",
    value: stats.totalUsers.toString(),
    bgColor: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
];
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8'>
      {statsData.map((stat)=>(
        <StatsCard
        key={stat.label}
        icon={stat.icon}
        label={stat.label}
        value={stat.value}
        bgColor={stat.bgColor}
        iconColor={stat.iconColor}
        active={activeTab === stat.tab}
        onClick={() => onSelect(stat.tab)}
        />
      ))}
    </div>
  )
}

export default DashboardStats
