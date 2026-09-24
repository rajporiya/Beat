import type { Song } from "@/types";

export interface QuickAccessItem {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
  isEqualizerActive?: boolean;
}

export interface DailyMixItem {
  id: string;
  mixNumber: number;
  title: string;
  subtitle: string;
  badgeText: string;
  badgeNumber: string;
  badgeColor: string;
  imageUrl: string;
  audioUrl: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  showName: string;
  subtitle: string; // e.g. "▶ Video • David Speech"
  publishDate: string;
  duration: string;
  description: string;
  cardTheme: "blue" | "purple" | "green" | "dark" | "cobalt";
  showAvatarUrl: string;
  videoThumbnailUrl: string;
  videoUrl?: string;
  audioUrl: string;
}

export interface PodcastSectionItem {
  id: string;
  columnTitle: string;
  episode: PodcastEpisode;
}

// 8 Quick Access Items shown at top of Music view (Matching Image 2)
export const QUICK_ACCESS_ITEMS: QuickAccessItem[] = [
  {
    id: "qa-1",
    title: 'Sitaare (From "Ikkis")',
    artist: "Arijit Singh, Sachin-Jigar",
    imageUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=300&q=80",
    audioUrl: "/songs/aashiqui_2.wav",
  },
  {
    id: "qa-2",
    title: 'Tera Mera Rishta - New Version (From "Awarapan...")',
    artist: "Mustafa Zahid, Roxen",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=300&q=80",
    audioUrl: "/songs/alfaaz.wav",
  },
  {
    id: "qa-3",
    title: "The Arijit Singh Collection",
    artist: "Arijit Singh",
    imageUrl: "/artists/arijit_singh.jpg",
    audioUrl: "/songs/samjho_na.wav",
  },
  {
    id: "qa-4",
    title: "#GRWM Hindi",
    artist: "Various Artists",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=300&q=80",
    audioUrl: "/songs/yeh_prem_mol_liya.wav",
  },
  {
    id: "qa-5",
    title: "The Rish Mix",
    artist: "The Rish, Pritam",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80",
    audioUrl: "/songs/casa_tupka.wav",
  },
  {
    id: "qa-6",
    title: "Desi Pop",
    artist: "Badshah, Neha Kakkar, Diljit",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80",
    audioUrl: "/songs/bari.wav",
  },
  {
    id: "qa-7",
    title: "Dhurandhar - All Songs 🔥",
    artist: "Ranveer Singh, Vishal Dadlani",
    imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=300&q=80",
    audioUrl: "/songs/animal.wav",
  },
  {
    id: "qa-8",
    title: "Trending Valentine's Hits",
    artist: "Pritam, Arijit Singh, Shreya Ghoshal",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=300&q=80",
    audioUrl: "/songs/rockstar.wav",
    isEqualizerActive: true,
  },
];

// Made For You: Daily Mixes 01 to 05 + Discover Weekly (Matching Image 2)
export const DAILY_MIX_ITEMS: DailyMixItem[] = [
  {
    id: "dm-1",
    mixNumber: 1,
    title: "Daily Mix 01",
    subtitle: "The Rish, Pritam, Shashwat Sachdev and...",
    badgeText: "Daily Mix",
    badgeNumber: "01",
    badgeColor: "#00d2c4", // teal / cyan
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
    audioUrl: "/songs/casa_tupka.wav",
  },
  {
    id: "dm-2",
    mixNumber: 2,
    title: "Daily Mix 02",
    subtitle: "Rito Riba, Maninder Buttar, Aroob Khan and...",
    badgeText: "Daily Mix",
    badgeNumber: "02",
    badgeColor: "#f7d100", // bright yellow
    imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=400&q=80",
    audioUrl: "/songs/bari.wav",
  },
  {
    id: "dm-3",
    mixNumber: 3,
    title: "Daily Mix 03",
    subtitle: "Shiva, Banjaare, Mitta Ror and more",
    badgeText: "Daily Mix",
    badgeNumber: "03",
    badgeColor: "#ff4d2e", // vibrant orange/red
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80",
    audioUrl: "/songs/ghostface_killah.wav",
  },
  {
    id: "dm-4",
    mixNumber: 4,
    title: "Daily Mix 04",
    subtitle: "Pritam, Atif Aslam, Sachin-Jigar and more",
    badgeText: "Daily Mix",
    badgeNumber: "04",
    badgeColor: "#ff3e83", // magenta pink
    imageUrl: "/artists/pritam.jpg",
    audioUrl: "/songs/yjhd.wav",
  },
  {
    id: "dm-5",
    mixNumber: 5,
    title: "Daily Mix 05",
    subtitle: "ARJN and KDS",
    badgeText: "Daily Mix",
    badgeNumber: "05",
    badgeColor: "#7be028", // bright lime green
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    audioUrl: "/songs/young_stunners.wav",
  },
  {
    id: "dm-6",
    mixNumber: 6,
    title: "Discover Weekly",
    subtitle: "Your shortcut to hidden gems, deep cuts, and...",
    badgeText: "DISCOVER",
    badgeNumber: "WEEKLY",
    badgeColor: "#6c5ce7",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
    audioUrl: "/songs/finding_her.wav",
  },
];

// "More like The Rish Mix" (Matching Image 2)
export const MORE_LIKE_ITEMS: Song[] = [
  {
    _id: "ml-1",
    title: "Bollywood Mush",
    artist: "Romantic Bollywood Ballads & Melodies",
    albumId: "more-like-1",
    imageUrl: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=400&q=80",
    audioUrl: "/songs/samjho_na.wav",
    duration: 18,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "ml-2",
    title: "Hot Hits Hindi",
    artist: "Catch the hottest Hindi tracks of the week",
    albumId: "more-like-2",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80",
    audioUrl: "/songs/aaya_sher.wav",
    duration: 18,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "ml-3",
    title: "Animal - Power Hits",
    artist: "Manan Bhardwaj, Vishal Mishra, Jaani",
    albumId: "more-like-3",
    imageUrl: "/cover-images/animal.jpg",
    audioUrl: "/songs/animal.wav",
    duration: 18,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "ml-4",
    title: "Katrina Kaif Romance",
    artist: "A.R. Rahman, Pritam, Sachin-Jigar",
    albumId: "more-like-4",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    audioUrl: "/songs/aashiqui_2.wav",
    duration: 18,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "ml-5",
    title: "Ranbir Kapoor Melodies",
    artist: "Arijit Singh, Mohit Chauhan, Pritam",
    albumId: "more-like-5",
    imageUrl: "/cover-images/yjhd.jpg",
    audioUrl: "/songs/yjhd.wav",
    duration: 18,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "ml-6",
    title: "Winter of Love",
    artist: "Warm acoustic melodies for cozy nights",
    albumId: "more-like-6",
    imageUrl: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?auto=format&fit=crop&w=400&q=80",
    audioUrl: "/songs/rockstar.wav",
    duration: 18,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "ml-7",
    title: "Desi Hits Playlist",
    artist: "Diljit Dosanjh, Karan Aujla, AP Dhillon",
    albumId: "more-like-7",
    imageUrl: "/cover-images/ghost.jpg",
    audioUrl: "/songs/ghost.wav",
    duration: 18,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Podcasts Episodes (Matching Image 1)
export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: "pod-1",
    title: "David Goggins Motivation - Why 99% Of Men Are Lost I...",
    showName: "David Speech",
    subtitle: "▶ Video • David Speech",
    publishDate: "Sep 23",
    duration: "38 min 4 sec",
    description: "David Goggins Motivation - Why 99% Of Men Are Lost In 2026.",
    cardTheme: "blue",
    showAvatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    videoThumbnailUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    audioUrl: "/songs/casa_tupka.wav",
  },
  {
    id: "pod-2",
    title: "He Wanted Internet Fame... UNTIL",
    showName: "Ray William Johnson: True St...",
    subtitle: "▶ Video • Ray William Johnson: True St...",
    publishDate: "Sep 23",
    duration: "8 min 53 sec",
    description:
      "Tyler Barriss is a California man who was sentenced to 20 years in federal prison after orchestrating a deadly December 2017 swatting hoax that resulted in police killing an innocent man.",
    cardTheme: "purple",
    showAvatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    videoThumbnailUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    audioUrl: "/songs/ghostface_killah.wav",
  },
  {
    id: "pod-3",
    title: "Ask Jay: How Do I Find My Purpose?",
    showName: "On Purpose with Jay Shetty",
    subtitle: "▶ Video • On Purpose with Jay Shetty",
    publishDate: "Sep 23",
    duration: "25 min 3 sec",
    description:
      "Jay answers three listener calls about rebuilding when life doesn't go according to plan. He explores how to separate your authentic voice from old survival patterns, pursue a creative passion",
    cardTheme: "green",
    showAvatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    videoThumbnailUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80",
    audioUrl: "/songs/samjho_na.wav",
  },
];

// Row 2 of Podcasts View (Bottom of Image 1)
export const SECOND_ROW_PODCASTS: PodcastSectionItem[] = [
  {
    id: "pod-sec-1",
    columnTitle: "Similar to your interests",
    episode: {
      id: "pod-4",
      title: "Vaping Is Too Good To Be True",
      showName: "Kurzgesagt – In a Nutshell",
      subtitle: "▶ Video • Kurzgesagt – In a Nutshell",
      publishDate: "Sep 21",
      duration: "11 min 20 sec",
      description: "Electronic cigarettes were supposed to help smokers quit. But is vaping really safe?",
      cardTheme: "cobalt",
      showAvatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80",
      videoThumbnailUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      audioUrl: "/songs/alfaaz.wav",
    },
  },
  {
    id: "pod-sec-2",
    columnTitle: "Similar to your interests",
    episode: {
      id: "pod-5",
      title: "What Nobody Tells You About Your FIRST Time in...",
      showName: "JOURNEY WITH JOHNNY",
      subtitle: "▶ Video • JOURNEY WITH JOHNNY",
      publishDate: "Sep 19",
      duration: "19 min 42 sec",
      description: "Honest stories, practical lessons, and unfiltered reality about stepping outside your comfort zone.",
      cardTheme: "dark",
      showAvatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      videoThumbnailUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
      audioUrl: "/songs/finding_her.wav",
    },
  },
  {
    id: "pod-sec-3",
    columnTitle: "Videos you might like",
    episode: {
      id: "pod-6",
      title: "How Bentley Builds Fast & Luxury Cars For The Ultra...",
      showName: "Figuring Out with Raj Shamani",
      subtitle: "▶ Video • Figuring Out with Raj Shamani",
      publishDate: "Sep 18",
      duration: "45 min 10 sec",
      description: "An exclusive deep dive into craftsmanship, engineering, and luxury car heritage.",
      cardTheme: "dark",
      showAvatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      videoThumbnailUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
      audioUrl: "/songs/animal.wav",
    },
  },
];
