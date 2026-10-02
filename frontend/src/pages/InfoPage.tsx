import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Building2,
  Briefcase,
  Newspaper,
  Mic2,
  Sparkles,
  Radio,
  Code2,
  Megaphone,
  TrendingUp,
  Store,
  HelpCircle,
  Smartphone,
  Globe2,
  Music,
  FolderInput,
  Crown,
  ShieldCheck,
  GraduationCap,
  Music2,
  Scale,
  ShieldAlert,
  Cookie,
  EyeOff,
  Accessibility as AccessibilityIcon,
  ExternalLink,
  CheckCircle2,
  Search,
  ArrowRight,
  Zap,
} from "lucide-react";

interface MenuItem {
  slug: string;
  label: string;
  category: string;
  icon: React.ElementType;
  badge?: string;
}

export const MENU_CATEGORIES = [
  { id: "company", title: "Company" },
  { id: "communities", title: "Communities" },
  { id: "useful", title: "Useful Links" },
  { id: "plans", title: "BeatMusic Plans" },
  { id: "legal", title: "Legal & Privacy" },
];

export const ALL_MENU_ITEMS: MenuItem[] = [
  // Company
  { slug: "about", label: "About BeatMusic", category: "company", icon: Building2 },
  { slug: "jobs", label: "Jobs & Careers", category: "company", icon: Briefcase, badge: "We're Hiring" },
  { slug: "newsroom", label: "For the Record", category: "company", icon: Newspaper },

  // Communities
  { slug: "for-artists", label: "For Artists", category: "communities", icon: Mic2 },
  { slug: "for-creators", label: "For Creators", category: "communities", icon: Sparkles },
  { slug: "for-podcasters", label: "For Podcasters", category: "communities", icon: Radio },
  { slug: "for-developers", label: "For Developers", category: "communities", icon: Code2, badge: "API v2" },
  { slug: "advertising", label: "Advertising", category: "communities", icon: Megaphone },
  { slug: "investors", label: "Investors", category: "communities", icon: TrendingUp },
  { slug: "vendors", label: "Vendors", category: "communities", icon: Store },

  // Useful links
  { slug: "support", label: "Support & Help", category: "useful", icon: HelpCircle },
  { slug: "download", label: "Free Mobile App", category: "useful", icon: Smartphone },
  { slug: "charts", label: "Popular by Country", category: "useful", icon: Globe2 },
  { slug: "lyrics", label: "Top Song Lyrics", category: "useful", icon: Music },
  { slug: "import", label: "Import your music", category: "useful", icon: FolderInput },

  // Plans
  { slug: "premium", label: "Premium Standard", category: "plans", icon: Crown, badge: "Popular" },
  { slug: "premium-platinum", label: "Premium Platinum", category: "plans", icon: Zap, badge: "Hi-Fi" },
  { slug: "premium-student", label: "Premium Student", category: "plans", icon: GraduationCap, badge: "50% Off" },
  { slug: "free", label: "BeatMusic Free", category: "plans", icon: Music2 },

  // Legal
  { slug: "legal", label: "Legal", category: "legal", icon: Scale },
  { slug: "safety", label: "Safety & Privacy Center", category: "legal", icon: ShieldAlert },
  { slug: "privacy", label: "Privacy Policy", category: "legal", icon: ShieldCheck },
  { slug: "cookies", label: "Cookie Policy", category: "legal", icon: Cookie },
  { slug: "ads", label: "About Ads", category: "legal", icon: EyeOff },
  { slug: "accessibility", label: "Accessibility", category: "legal", icon: AccessibilityIcon },
];

export const InfoPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const currentSlug = slug || "about";
  const currentItem = ALL_MENU_ITEMS.find((item) => item.slug === currentSlug) || ALL_MENU_ITEMS[0];
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentSlug]);

  const handleSelectSlug = (newSlug: string) => {
    navigate(`/info/${newSlug}`);
  };

  const filteredItems = ALL_MENU_ITEMS.filter((item) =>
    item.label.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#181226] via-[#121212] to-[#0a0a0a] text-zinc-100 p-4 sm:p-6 lg:p-8">
      {/* Header Banner */}
      <div className="mx-auto max-w-7xl mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-xl bg-gradient-to-tr from-[#863bff] to-[#ec4899] flex items-center justify-center shadow-lg shadow-purple-500/20">
              <currentItem.icon className="size-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#a855f7]">
                  BeatMusic Portal
                </span>
                {currentItem.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#863bff]/30 text-purple-300 border border-[#863bff]/50">
                    {currentItem.badge}
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {currentItem.label}
              </h1>
            </div>
          </div>

          <Link
            to="/home"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-semibold text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors w-fit"
          >
            <span>Open BeatMusic Web Player</span>
            <ExternalLink className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Grid: Left Navigation Menu + Right Content */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side Menu */}
        <aside className="lg:col-span-4 xl:col-span-3 sticky top-4 bg-[#181818]/90 backdrop-blur-md rounded-2xl border border-white/10 p-4 shadow-xl">
          {/* Quick Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-2.5 size-4 text-zinc-400" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search topics..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#242424] border border-white/5 text-white placeholder-zinc-500 focus:outline-none focus:border-[#863bff]"
            />
          </div>

          <div className="max-h-[calc(100vh-220px)] overflow-y-auto space-y-5 pr-1">
            {MENU_CATEGORIES.map((cat) => {
              const itemsInCat = filteredItems.filter((i) => i.category === cat.id);
              if (itemsInCat.length === 0) return null;

              return (
                <div key={cat.id}>
                  <p className="px-2 mb-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    {cat.title}
                  </p>
                  <div className="space-y-1">
                    {itemsInCat.map((item) => {
                      const isActive = item.slug === currentSlug;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.slug}
                          onClick={() => handleSelectSlug(item.slug)}
                          className={`w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all ${
                            isActive
                              ? "bg-gradient-to-r from-[#863bff] to-[#6d28d9] text-white shadow-md shadow-purple-900/30 font-bold"
                              : "text-zinc-300 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Icon className={`size-4 shrink-0 ${isActive ? "text-white" : "text-zinc-400"}`} />
                            <span className="truncate">{item.label}</span>
                          </div>
                          {item.badge && (
                            <span
                              className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold shrink-0 ${
                                isActive ? "bg-white/20 text-white" : "bg-zinc-800 text-purple-300"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Right Main Content Panel */}
        <main className="lg:col-span-8 xl:col-span-9 bg-[#181818]/70 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-8 shadow-2xl">
          {renderContent(currentSlug)}
        </main>
      </div>
    </div>
  );
};

/* ---------------- Render Content helper for each slug ---------------- */
function renderContent(slug: string) {
  switch (slug) {
    /* ================= COMPANY ================= */
    case "about":
      return (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Powering the soundtrack to your life
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              With BeatMusic, it’s easy to find the right music or podcast for every moment — on your phone,
              your computer, your tablet and more. There are millions of tracks and episodes on BeatMusic.
              So whether you’re behind the wheel, working out, partying or relaxing, the right audio is always
              at your fingertips.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-900/30 to-zinc-900 border border-purple-500/20">
              <span className="text-3xl font-black text-white">100M+</span>
              <p className="text-xs text-zinc-400 mt-1">High fidelity tracks available globally</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-900/30 to-zinc-900 border border-purple-500/20">
              <span className="text-3xl font-black text-white">180+</span>
              <p className="text-xs text-zinc-400 mt-1">Countries and territories covered</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-900/30 to-zinc-900 border border-purple-500/20">
              <span className="text-3xl font-black text-white">500M+</span>
              <p className="text-xs text-zinc-400 mt-1">Active music lovers tuning in each month</p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/5">
            <h3 className="text-lg font-bold text-white">Our Core Mission</h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              To unlock the potential of human creativity by giving millions of creative artists the opportunity to live
              off their art and billions of fans the opportunity to enjoy and be inspired by it.
            </p>
          </div>
        </div>
      );

    case "jobs":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Join Our Team at BeatMusic</h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              We are sound architects, engineers, designers, and music storytellers shaping the future of global audio streaming.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { role: "Senior Audio Streaming Engineer", dept: "Engineering", loc: "Remote / New York" },
              { role: "Product Designer, Design Systems", dept: "Product", loc: "Remote / London" },
              { role: "Music Curation Specialist", dept: "Editorial", loc: "Mumbai / Hybrid" },
              { role: "Cloud Infrastructure Architect", dept: "DevOps", loc: "San Francisco" },
            ].map((job) => (
              <div
                key={job.role}
                className="p-5 rounded-xl bg-zinc-900 border border-white/10 hover:border-[#863bff] transition-all flex flex-col justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-purple-400 font-semibold mb-1">
                    <span>{job.dept}</span>
                    <span className="text-zinc-400">{job.loc}</span>
                  </div>
                  <h4 className="font-bold text-white text-sm group-hover:text-purple-300 transition-colors">
                    {job.role}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => alert(`Applied for ${job.role}`)}
                  className="mt-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 w-fit"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="size-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      );

    case "newsroom":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">For the Record: News & Press</h2>
            <p className="text-zinc-300 text-sm">Official company statements, product announcements, and updates.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                date: "October 2026",
                title: "BeatMusic Unveils AI-Powered Next-Gen Spatial Sound Engine",
                desc: "Bringing studio-quality immersion to every pair of headphones with lossless dynamic calibration.",
              },
              {
                date: "September 2026",
                title: "Empowering 50,000 Indie Artists with Direct Micro-Tipping",
                desc: "Fans can now support their favorite musicians in real-time right from the playback view.",
              },
              {
                date: "August 2026",
                title: "Global Reach Expands Across 25 New Streaming Markets",
                desc: "Localized music catalogs, regional charts, and podcasts now live for over 100M new listeners.",
              },
            ].map((news) => (
              <div key={news.title} className="p-4 rounded-xl bg-zinc-900 border border-white/5 space-y-1">
                <span className="text-[11px] font-bold text-[#863bff] uppercase tracking-wider">{news.date}</span>
                <h3 className="font-bold text-white text-base">{news.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{news.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );

    /* ================= COMMUNITIES ================= */
    case "for-artists":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">BeatMusic for Artists</h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Claim your official artist profile, reach millions of fans worldwide, pitch directly to our editorial playlist curators, and track real-time stream stats.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-zinc-900 border border-white/10 space-y-2">
              <h3 className="text-white font-bold text-sm flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-400" />
                Artist Verification & Badge
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Get the blue verified checkmark on your artist page to show listeners your music is official.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-zinc-900 border border-white/10 space-y-2">
              <h3 className="text-white font-bold text-sm flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-400" />
                Real-Time Audience Analytics
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                See who is listening right now, where your biggest listener base lives, and which songs are trending.
              </p>
            </div>
          </div>
        </div>
      );

    case "for-creators":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">BeatMusic for Creators</h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Integrate licensed soundtrack music into your streams, videos, and podcasts with 100% copyright clearance and zero strikes.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-purple-950/30 border border-purple-500/30">
            <h3 className="text-white font-bold text-sm mb-2">Creator Royalty Share Program</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Earn affiliate royalties whenever your subscribers listen to your curated playlists on BeatMusic.
            </p>
          </div>
        </div>
      );

    case "for-podcasters":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">BeatMusic for Podcasters</h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Distribute your episodes via RSS, upload full video podcasts in 4K, and monetize with dynamic audio ads.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900 border border-white/10">
              <h4 className="font-bold text-white text-sm">Video Podcast Support</h4>
              <p className="text-xs text-zinc-400 mt-1">Direct upload with automatic chapter markers and synchronized captions.</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900 border border-white/10">
              <h4 className="font-bold text-white text-sm">Interactive Polls & Q&A</h4>
              <p className="text-xs text-zinc-400 mt-1">Engage your audience directly during podcast playback.</p>
            </div>
          </div>
        </div>
      );

    case "for-developers":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">BeatMusic Developer Platform & Web API</h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Build audio experiences, smart speaker integrations, and playlist automation using our modern REST API and Web Playback SDK.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
            <p className="text-zinc-500">// Example: Fetch Trending Songs</p>
            <p className="text-purple-400">curl -X GET https://api.beatmusic.com/v1/songs/trending \</p>
            <p className="pl-4 text-emerald-400">-H "Authorization: Bearer YOUR_API_TOKEN"</p>
          </div>
        </div>
      );

    case "advertising":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Advertising on BeatMusic</h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Connect with engaged listeners when their attention is at its peak. Audio ads, sponsored playlists, and video takeovers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 text-center">
              <h4 className="font-bold text-white text-sm">Audio Ads</h4>
              <p className="text-xs text-zinc-400 mt-1">Between-song immersive audio storytelling.</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 text-center">
              <h4 className="font-bold text-white text-sm">Sponsored Sessions</h4>
              <p className="text-xs text-zinc-400 mt-1">Provide 30 minutes of ad-free listening.</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 text-center">
              <h4 className="font-bold text-white text-sm">Homepage Takeover</h4>
              <p className="text-xs text-zinc-400 mt-1">Maximum visibility on prime real estate.</p>
            </div>
          </div>
        </div>
      );

    case "investors":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Investor Relations</h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Financial results, annual reports, shareholder information, and corporate governance for BeatMusic.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-zinc-900 border border-white/10 space-y-3">
            <h4 className="font-bold text-white text-sm">Quarterly Earnings & Presentations</h4>
            <p className="text-xs text-zinc-400">
              Q3 2026 Earnings Release: Streaming revenue up 34% YoY, global paying subscriber count surpasses 150 Million.
            </p>
          </div>
        </div>
      );

    case "vendors":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Vendor & Supplier Portal</h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Guidelines, code of conduct, procurement standards, and invoicing portal for external partners and suppliers.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-zinc-900 border border-white/10">
            <h4 className="font-bold text-white text-sm">Supplier Code of Conduct</h4>
            <p className="text-xs text-zinc-400 mt-1">
              We uphold the highest ethical, social, and environmental standards across all supplier relationships.
            </p>
          </div>
        </div>
      );

    /* ================= USEFUL LINKS ================= */
    case "support":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">BeatMusic Help & Customer Support</h2>
            <p className="text-zinc-300 text-sm">Find quick answers, contact customer care, or troubleshoot your playback.</p>
          </div>

          <div className="space-y-3">
            {[
              { q: "How do I download music for offline listening?", a: "With Premium, click the download icon next to any song or album to listen offline anywhere." },
              { q: "How do I upgrade to Premium Platinum?", a: "Visit your Account Settings or the BeatMusic Plans page and choose Platinum for lossless Hi-Fi audio." },
              { q: "Can I transfer playlists from Spotify or Apple Music?", a: "Yes! Use our 'Import your music' tool in the Useful Links section to sync your playlists in 1 click." },
              { q: "How do I update my profile picture or account name?", a: "Go to your Profile page by clicking your avatar in the top-right corner to manage your details." },
            ].map((faq) => (
              <div key={faq.q} className="p-4 rounded-xl bg-zinc-900 border border-white/5 space-y-1">
                <h4 className="font-bold text-white text-sm">{faq.q}</h4>
                <p className="text-xs text-zinc-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case "download":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Download the BeatMusic Mobile App</h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Take your music anywhere. Seamless playback on iOS, Android, macOS, Windows, and smartwatch devices.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 flex items-center gap-3">
              <Smartphone className="size-8 text-purple-400" />
              <div>
                <p className="text-xs text-zinc-400">Download for</p>
                <p className="font-bold text-white text-sm">iOS (App Store)</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 flex items-center gap-3">
              <Smartphone className="size-8 text-emerald-400" />
              <div>
                <p className="text-xs text-zinc-400">Download for</p>
                <p className="font-bold text-white text-sm">Android (Google Play)</p>
              </div>
            </div>
          </div>
        </div>
      );

    case "charts":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Popular by Country & Global Charts</h2>
            <p className="text-zinc-300 text-sm">Explore what's topping the charts across 180+ countries right now.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["United States", "United Kingdom", "India", "Germany", "Japan", "Brazil", "Canada", "Australia"].map((c) => (
              <div key={c} className="p-3 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-between">
                <span className="text-xs font-semibold text-white">{c}</span>
                <span className="text-[10px] text-purple-400 font-bold">Top 50</span>
              </div>
            ))}
          </div>
        </div>
      );

    case "lyrics":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Top Song Lyrics & Sing-Along Mode</h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Read and sing along with real-time synchronized lyrics on every track. Verified by official publishers and artist communities.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-zinc-900 border border-white/10 space-y-2">
            <h4 className="font-bold text-white text-sm">Interactive Karaoke Mode</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Adjust vocal levels on supported tracks and follow the word-by-word highlighted playback on any device.
            </p>
          </div>
        </div>
      );

    case "import":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Import Your Music & Playlists</h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Seamlessly bring your existing favorites from Spotify, Apple Music, YouTube Music, or Amazon Music to BeatMusic in minutes.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/30 to-zinc-900 border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-white text-base">One-Click Playlist Sync</h4>
              <p className="text-xs text-zinc-300 mt-1">Upload a .csv, .m3u, or connect your streaming account.</p>
            </div>
            <button
              type="button"
              onClick={() => alert("Playlist import tool initiated!")}
              className="px-5 py-2.5 rounded-full bg-[#863bff] hover:bg-[#722ed1] text-white text-xs font-bold transition-all whitespace-nowrap shadow-lg shadow-purple-600/30"
            >
              Start Import
            </button>
          </div>
        </div>
      );

    /* ================= PLANS ================= */
    case "premium":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">BeatMusic Premium Standard</h2>
            <p className="text-zinc-300 text-sm">Ad-free music listening, offline downloads, and unlimited skips.</p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/40 via-zinc-900 to-black border-2 border-[#863bff] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300">Individual Plan</span>
                <h3 className="text-2xl font-black text-white">$9.99 / month</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#863bff] text-white text-xs font-bold">1 Month Free</span>
            </div>
            <ul className="space-y-2 text-xs text-zinc-300 pt-2 border-t border-white/10">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-400" />
                Ad-free music listening on all devices
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-400" />
                Download to listen offline anywhere
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-400" />
                Play any song on demand with unlimited skips
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-400" />
                High audio quality (320kbps AAC)
              </li>
            </ul>
            <button
              type="button"
              onClick={() => alert("Subscribed to Premium Standard!")}
              className="w-full py-3 rounded-full bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-colors shadow-lg"
            >
              Get Premium Standard
            </button>
          </div>
        </div>
      );

    case "premium-platinum":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">BeatMusic Premium Platinum (Hi-Fi)</h2>
            <p className="text-zinc-300 text-sm">24-bit / 192kHz Lossless FLAC, Spatial Audio, and up to 6 family accounts.</p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/40 via-zinc-900 to-black border-2 border-amber-500/60 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Hi-Fi Audiophile Tier</span>
                <h3 className="text-2xl font-black text-white">$14.99 / month</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500 text-black text-xs font-black">Ultra HD</span>
            </div>
            <ul className="space-y-2 text-xs text-zinc-300 pt-2 border-t border-white/10">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-amber-400" />
                Pure Studio Master Lossless FLAC (up to 24-bit, 192 kHz)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-amber-400" />
                Dolby Atmos & 3D Spatial Audio soundscapes
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-amber-400" />
                6 Separate Premium accounts for family members
              </li>
            </ul>
            <button
              type="button"
              onClick={() => alert("Subscribed to Platinum!")}
              className="w-full py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-xs hover:opacity-95 transition-opacity shadow-lg"
            >
              Get Premium Platinum
            </button>
          </div>
        </div>
      );

    case "premium-student":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">BeatMusic Premium Student</h2>
            <p className="text-zinc-300 text-sm">50% discount for eligible university and college students.</p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-zinc-900 to-black border border-emerald-500/40 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Student Discount</span>
                <h3 className="text-2xl font-black text-white">$4.99 / month</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500 text-black text-xs font-bold">50% OFF</span>
            </div>
            <p className="text-xs text-zinc-400">All the full features of Premium Standard at half the price.</p>
            <button
              type="button"
              onClick={() => alert("Verify student status")}
              className="w-full py-3 rounded-full bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-colors"
            >
              Verify Student Status & Subscribe
            </button>
          </div>
        </div>
      );

    case "free":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">BeatMusic Free Plan</h2>
            <p className="text-zinc-300 text-sm">Stream millions of tracks on shuffle with occasional ad breaks.</p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Free Tier</span>
                <h3 className="text-2xl font-black text-white">$0.00 / forever</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-bold">Current Plan</span>
            </div>
            <ul className="space-y-2 text-xs text-zinc-300 pt-2 border-t border-white/10">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-zinc-400" />
                Access to over 100M+ songs and podcast episodes
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-zinc-400" />
                Create and share custom playlists
              </li>
            </ul>
          </div>
        </div>
      );

    /* ================= LEGAL ================= */
    case "legal":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">BeatMusic Terms and Conditions of Use</h2>
            <p className="text-xs text-zinc-400">Last updated: October 2026</p>
          </div>
          <div className="space-y-4 text-xs text-zinc-300 leading-relaxed">
            <p>
              Welcome to BeatMusic. By signing up, accessing, or using the BeatMusic service, websites, or software applications,
              you enter into a binding contract with BeatMusic Inc.
            </p>
            <h4 className="font-bold text-white text-sm">1. Service Limitations and Modifications</h4>
            <p>
              We will make reasonable efforts to keep the BeatMusic service operational. However, technical difficulties or maintenance
              may occasionally cause temporary interruptions.
            </p>
            <h4 className="font-bold text-white text-sm">2. User Guidelines</h4>
            <p>
              BeatMusic respects intellectual property rights and expects you to do the same. You may not copy, redistribute, reproduce,
              or record any audio content made available via the platform.
            </p>
          </div>
        </div>
      );

    case "safety":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Safety & Privacy Center</h2>
            <p className="text-zinc-300 text-sm">Your security, account safety, and privacy controls in one place.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900 border border-white/10">
              <h4 className="font-bold text-white text-sm">Two-Factor Authentication (2FA)</h4>
              <p className="text-xs text-zinc-400 mt-1">Protect your account from unauthorized logins with 2FA verification.</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900 border border-white/10">
              <h4 className="font-bold text-white text-sm">Report Inappropriate Content</h4>
              <p className="text-xs text-zinc-400 mt-1">Flag any offensive, abusive, or copyright-infringing material instantly.</p>
            </div>
          </div>
        </div>
      );

    case "privacy":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">BeatMusic Privacy Policy</h2>
            <p className="text-xs text-zinc-400">Commitment to transparency and data privacy</p>
          </div>
          <div className="space-y-3 text-xs text-zinc-300 leading-relaxed">
            <p>
              This Privacy Policy explains how we collect, store, share, and protect your personal data when you interact with our audio streaming service.
            </p>
            <h4 className="font-bold text-white text-sm">Information We Collect</h4>
            <p>
              We collect information you provide directly to us (such as email, name, and playlist selections), as well as automated device telemetry and playback history.
            </p>
          </div>
        </div>
      );

    case "cookies":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Cookie & Tracking Policy</h2>
            <p className="text-zinc-300 text-sm">How we use cookies to deliver and improve your music experience.</p>
          </div>
          <div className="space-y-3 text-xs text-zinc-300 leading-relaxed">
            <p>
              Cookies are small text files stored on your device that help remember your volume settings, active device playback session, and authentication tokens.
            </p>
            <div className="p-4 rounded-xl bg-zinc-900 border border-white/10">
              <h4 className="font-bold text-white text-sm">Essential Cookies</h4>
              <p className="text-xs text-zinc-400 mt-1">Required for authentication, security, and continuous playback.</p>
            </div>
          </div>
        </div>
      );

    case "ads":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">About Ads on BeatMusic</h2>
            <p className="text-zinc-300 text-sm">Learn how tailored advertising helps support free music streaming.</p>
          </div>
          <div className="space-y-3 text-xs text-zinc-300 leading-relaxed">
            <p>
              Our free listening experience is supported by advertising partners. You can adjust your personalization preferences at any time in Account Settings.
            </p>
          </div>
        </div>
      );

    case "accessibility":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Accessibility at BeatMusic</h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              We believe music is for everyone. We design our platforms to be accessible to people of all abilities.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900 border border-white/10">
              <h4 className="font-bold text-white text-sm">Screen Reader Support</h4>
              <p className="text-xs text-zinc-400 mt-1">Full semantic ARIA labels on all playback controls and navigation menus.</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900 border border-white/10">
              <h4 className="font-bold text-white text-sm">Keyboard Navigation</h4>
              <p className="text-xs text-zinc-400 mt-1">Full keyboard shortcut coverage for play, pause, skip, and volume control.</p>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Topic Not Found</h2>
          <p className="text-sm text-zinc-400">Please choose a topic from the menu on the left.</p>
        </div>
      );
  }
}

export default InfoPage;
