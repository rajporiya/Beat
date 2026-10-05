import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { SignedIn, SignedOut, useUser } from "@/providers/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserProfileStore } from "@/stores/useUserProfileStore";
import { AboutPage } from "./AboutPage";
import { ArrowRight, Laptop, Smartphone } from "lucide-react";

export const InfoPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const { user } = useUser();
  const { profile } = useUserProfileStore();

  const currentSlug = slug || "jobs";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentSlug]);

  if (currentSlug === "about") {
    return <AboutPage />;
  }

  const avatarUrl = profile?.imageUrl || user?.imageUrl;
  const displayName = profile?.fullName || user?.fullName || user?.firstName || "U";
  const initials =
    displayName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part: string) => part[0]?.toUpperCase())
      .join("") || "U";

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col">
      {/* Top Black Header (Identical to AboutPage) */}
      <header className="bg-black text-white px-6 sm:px-12 lg:px-20 h-20 flex items-center justify-between sticky top-0 z-50">
        {/* Left: Spotify / BeatMusic Logo */}
        <Link to="/home" className="flex items-center gap-2 group cursor-pointer">
          <img
            src="/Animation/title.svg"
            alt="Spotify Logo"
            className="size-9 transition-transform group-hover:scale-105"
          />
          <span className="font-bold text-2xl tracking-tight text-white">
            Beat<span className="text-[#1db954]">Music</span>
          </span>
        </Link>

        {/* Right Nav Links */}
        <nav className="flex items-center gap-5 sm:gap-7 text-sm font-bold tracking-tight">
          <Link
            to="/info/premium"
            className="text-white hover:text-[#1db954] transition-colors hidden sm:inline"
          >
            Premium plans
          </Link>
          <Link
            to="/info/support"
            className="text-white hover:text-[#1db954] transition-colors"
          >
            Support
          </Link>
          <Link
            to="/info/download"
            className="text-white hover:text-[#1db954] transition-colors hidden md:inline"
          >
            Download
          </Link>

          <span className="text-zinc-600 hidden sm:inline select-none">|</span>

          <SignedOut>
            <Link
              to="/register"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Sign up
            </Link>
            <Link
              to="/login"
              className="text-white hover:text-[#1db954] transition-colors"
            >
              Log in
            </Link>
          </SignedOut>

          <SignedIn>
            <Link
              to="/profile"
              className="flex items-center gap-2 text-white hover:text-[#1db954] transition-colors"
              title="Your Profile"
            >
              <Avatar className="size-8 ring-2 ring-[#1db954]/60">
                {avatarUrl ? <AvatarImage src={avatarUrl} alt={displayName} /> : null}
                <AvatarFallback className="bg-zinc-800 text-xs font-bold text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="hidden lg:inline text-xs font-semibold">{displayName}</span>
            </Link>
            <Link
              to="/home"
              className="px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors shadow-sm"
            >
              Web Player
            </Link>
          </SignedIn>
        </nav>
      </header>

      {/* Main Content Area (2 Columns - Identical to AboutPage) */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 sm:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column (Selected Menu Topic Content) */}
          <section className="lg:col-span-7 space-y-10">
            {renderTopicContent(currentSlug)}

            {/* Topic Navigation Quick Links */}
            <div className="pt-8 border-t border-zinc-200">
              <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight mb-4">
                Explore more topics:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <Link
                  to="/info/jobs"
                  className="p-3.5 rounded-lg border border-zinc-200 hover:border-black font-semibold text-zinc-800 hover:text-black hover:bg-zinc-50 transition-colors"
                >
                  Jobs & Careers →
                </Link>
                <Link
                  to="/info/for-artists"
                  className="p-3.5 rounded-lg border border-zinc-200 hover:border-black font-semibold text-zinc-800 hover:text-black hover:bg-zinc-50 transition-colors"
                >
                  For Artists →
                </Link>
                <Link
                  to="/info/for-developers"
                  className="p-3.5 rounded-lg border border-zinc-200 hover:border-black font-semibold text-zinc-800 hover:text-black hover:bg-zinc-50 transition-colors"
                >
                  Developer Platform →
                </Link>
                <Link
                  to="/info/support"
                  className="p-3.5 rounded-lg border border-zinc-200 hover:border-black font-semibold text-zinc-800 hover:text-black hover:bg-zinc-50 transition-colors"
                >
                  Support & Help →
                </Link>
              </div>
            </div>
          </section>

          {/* Right Column (Offices & Contact Information - Identical to AboutPage) */}
          <section className="lg:col-span-5 space-y-10">
            {/* Headquarters Card */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight mb-6">
                Headquarters
              </h2>
              <div className="space-y-1 text-sm text-zinc-700 leading-relaxed">
                <p className="font-bold text-black text-base">BeatMusic AB</p>
                <p>Regeringsgatan 19</p>
                <p>SE-111 53 Stockholm</p>
                <p>Sweden</p>
                <p className="text-xs text-zinc-500 pt-1">Reg no: 556703-7485</p>
                <a
                  href="mailto:office@beatmusic.com"
                  className="inline-block text-[#1db954] hover:underline font-medium pt-2"
                >
                  office@beatmusic.com
                </a>
              </div>
            </div>

            {/* BeatMusic around the world */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight mb-6">
                BeatMusic around the world
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-[13px] leading-relaxed text-zinc-800">
                {/* USA */}
                <div className="space-y-0.5">
                  <p className="font-bold text-black text-sm">BeatMusic USA Inc.</p>
                  <p>4 World Trade Center</p>
                  <p>150 Greenwich St, 62nd Floor</p>
                  <p>New York, NY 10007, USA</p>
                  <a href="mailto:office@beatmusic.com" className="text-[#1db954] hover:underline block pt-1">
                    office@beatmusic.com
                  </a>
                </div>

                {/* UK */}
                <div className="space-y-0.5">
                  <p className="font-bold text-black text-sm">BeatMusic UK Ltd.</p>
                  <p>Adelphi Building, 1-11 John Adam St</p>
                  <p>London WC2N 6HT</p>
                  <p>United Kingdom</p>
                  <a href="mailto:office@beatmusic.com" className="text-[#1db954] hover:underline block pt-1">
                    office@beatmusic.com
                  </a>
                </div>

                {/* India */}
                <div className="space-y-0.5">
                  <p className="font-bold text-black text-sm">BeatMusic India LLP</p>
                  <p>Jet Airways - Godrej BKC</p>
                  <p>Bandra Kurla Complex, Bandra East</p>
                  <p>Mumbai 400051, India</p>
                  <a href="mailto:office@beatmusic.com" className="text-[#1db954] hover:underline block pt-1">
                    office@beatmusic.com
                  </a>
                </div>

                {/* Germany */}
                <div className="space-y-0.5">
                  <p className="font-bold text-black text-sm">BeatMusic GmbH</p>
                  <p>Unter den Linden 10</p>
                  <p>10117 Berlin</p>
                  <p>Germany</p>
                  <a href="mailto:office@beatmusic.com" className="text-[#1db954] hover:underline block pt-1">
                    office@beatmusic.com
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer Bottom Bar (Identical to AboutPage) */}
      <footer className="bg-black text-zinc-400 py-10 px-6 sm:px-12 lg:px-20 text-xs border-t border-zinc-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-5">
            <Link to="/info/legal" className="hover:text-white transition-colors">
              Legal
            </Link>
            <Link to="/info/safety" className="hover:text-white transition-colors">
              Safety & Privacy Center
            </Link>
            <Link to="/info/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/info/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
            <Link to="/info/about" className="hover:text-white transition-colors">
              About Ads
            </Link>
            <Link to="/info/accessibility" className="hover:text-white transition-colors">
              Accessibility
            </Link>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
              title="Spotify Web Player"
              className="size-8 rounded-full bg-[#292929] hover:bg-[#1db954] text-white flex items-center justify-center transition-all duration-200 shadow-md group hover:scale-105"
            >
              <svg className="size-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.306c-.218.358-.68.472-1.038.254-2.846-1.738-6.428-2.132-10.648-1.168-.41.094-.817-.16-.91-.568-.094-.41.16-.816.568-.91 4.622-1.055 8.583-.607 11.774 1.354.358.218.472.68.254 1.038zm1.469-3.266c-.274.446-.86.588-1.306.314-3.258-2.003-8.225-2.585-12.078-1.414-.498.152-1.026-.134-1.178-.632-.152-.498.134-1.026.632-1.178 4.408-1.338 9.89-.691 13.616 1.604.446.274.588.86.314 1.306zm.126-3.41c-3.908-2.32-10.354-2.533-14.076-1.402-.6.182-1.238-.16-1.42-.76-.182-.6.16-1.238.76-1.42 4.284-1.301 11.397-1.052 15.897 1.62.538.32.716 1.02.396 1.558-.32.538-1.02.716-1.557.396z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/spotify/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify on Instagram"
              title="Spotify on Instagram"
              className="size-8 rounded-full bg-[#292929] hover:bg-[#E1306C] text-white flex items-center justify-center transition-all duration-200 shadow-md group hover:scale-105"
            >
              <svg className="size-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://x.com/spotify"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify on X (Twitter)"
              title="Spotify on X (Twitter)"
              className="size-8 rounded-full bg-[#292929] hover:bg-black hover:border hover:border-zinc-700 text-white flex items-center justify-center transition-all duration-200 shadow-md group hover:scale-105"
            >
              <svg className="size-3.5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/Spotify"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify on Facebook"
              title="Spotify on Facebook"
              className="size-8 rounded-full bg-[#292929] hover:bg-[#1877F2] text-white flex items-center justify-center transition-all duration-200 shadow-md group hover:scale-105"
            >
              <svg className="size-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </a>
          </div>

          <div className="text-zinc-500 whitespace-nowrap">
            © {new Date().getFullYear()} BeatMusic AB
          </div>
        </div>
      </footer>
    </div>
  );
};

/* ---------------- Render Specific Topic Content ---------------- */
function renderTopicContent(slug: string) {
  switch (slug) {
    /* ================= JOBS & CAREERS ================= */
    case "jobs":
      return (
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4">
              Jobs & Careers
            </h1>
            <p className="text-zinc-700 text-[15px] sm:text-[16px] leading-[1.65]">
              We are sound architects, engineers, designers, and music storytellers shaping the future of global audio streaming.
              Explore our current open positions and build the world's most beloved music experience.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-black tracking-tight mb-5">
              Open Positions
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {[
                { role: "Senior Audio Streaming Engineer", dept: "Engineering", loc: "Remote / New York", type: "Full-Time" },
                { role: "Product Designer, Design Systems", dept: "Product", loc: "Remote / London", type: "Full-Time" },
                { role: "Music Curation Specialist", dept: "Editorial", loc: "Mumbai / Hybrid", type: "Full-Time" },
                { role: "Cloud Infrastructure Architect", dept: "DevOps", loc: "San Francisco", type: "Full-Time" },
              ].map((job) => (
                <div
                  key={job.role}
                  className="p-5 rounded-xl border border-zinc-200 hover:border-black transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-zinc-50"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold">
                      <span className="text-[#1db954]">{job.dept}</span>
                      <span className="text-zinc-400">•</span>
                      <span className="text-zinc-500">{job.loc}</span>
                      <span className="text-zinc-400">•</span>
                      <span className="text-zinc-500">{job.type}</span>
                    </div>
                    <h3 className="font-bold text-black text-lg group-hover:text-[#1db954] transition-colors">
                      {job.role}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert(`Thank you! Your application for "${job.role}" has been submitted.`)}
                    className="px-5 py-2.5 rounded-full bg-black text-white hover:bg-[#1db954] hover:text-black font-bold text-xs transition-colors shrink-0 flex items-center justify-center gap-1.5"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-200">
            <h2 className="text-2xl font-extrabold text-black tracking-tight mb-4">
              Life at BeatMusic
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                <h4 className="font-bold text-black text-base mb-1">Flexible Hybrid Model</h4>
                <p className="text-zinc-600 text-xs leading-relaxed">
                  Work from an office, from home, or anywhere that inspires your best creativity.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                <h4 className="font-bold text-black text-base mb-1">Health & Wellness</h4>
                <p className="text-zinc-600 text-xs leading-relaxed">
                  Comprehensive global medical, dental, and mental wellbeing care for you and your family.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                <h4 className="font-bold text-black text-base mb-1">Free Premium for Life</h4>
                <p className="text-zinc-600 text-xs leading-relaxed">
                  All employees and their loved ones enjoy ad-free lossless music and audiobooks for life.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                <h4 className="font-bold text-black text-base mb-1">Learning & Growth</h4>
                <p className="text-zinc-600 text-xs leading-relaxed">
                  Annual educational stipends, conference budgets, and mentorship from industry pioneers.
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    /* ================= NEWSROOM ================= */
    case "newsroom":
      return (
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4">
              For the Record: News & Press
            </h1>
            <p className="text-zinc-700 text-[15px] sm:text-[16px] leading-[1.65]">
              The official publication of BeatMusic, featuring the latest stories, company milestones, culture, and product innovations.
            </p>
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
                title: "Global Paying Subscribers Exceed 150 Million Milestone",
                desc: "Rapid international growth driven by mobile enhancements and local catalog expansions across 180+ regions.",
              },
              {
                date: "August 2026",
                title: "BeatMusic Partners with Indie Artists Alliance for Fair Royalties",
                desc: "Introducing transparent real-time revenue splitting and zero-fee community upload tools.",
              },
            ].map((article) => (
              <div key={article.title} className="p-5 rounded-xl border border-zinc-200 hover:border-black transition-colors group">
                <span className="text-xs font-bold text-[#1db954]">{article.date}</span>
                <h3 className="font-bold text-black text-lg mt-1 group-hover:text-[#1db954] transition-colors">{article.title}</h3>
                <p className="text-sm text-zinc-600 mt-2 leading-relaxed">{article.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );

    /* ================= COMMUNITIES ================= */
    case "for-artists":
      return (
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4">
              BeatMusic for Artists
            </h1>
            <p className="text-zinc-700 text-[15px] sm:text-[16px] leading-[1.65]">
              Everything you need to develop your fanbase, build a business, and create the world around your music.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-zinc-200 hover:border-black transition-colors">
              <h3 className="font-bold text-black text-lg mb-1">Claim Your Artist Profile</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Add your bio, tour dates, custom header images, and artist pick tracks visible to millions of fans.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-zinc-200 hover:border-black transition-colors">
              <h3 className="font-bold text-black text-lg mb-1">Real-Time Audience Analytics</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Track live listener counts, playlist inclusions, top demographics, and streaming royalties on desktop & mobile.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-zinc-200 hover:border-black transition-colors">
              <h3 className="font-bold text-black text-lg mb-1">Direct Playlist Pitching</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Submit unreleased tracks directly to our global editorial curation teams before release day.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-zinc-200 hover:border-black transition-colors">
              <h3 className="font-bold text-black text-lg mb-1">Canvas Video Loops</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Add short 8-second visual loops to replace album artwork on playback, boosting track shares by 145%.
              </p>
            </div>
          </div>
        </div>
      );

    case "for-creators":
      return (
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4">
              BeatMusic for Creators
            </h1>
            <p className="text-zinc-700 text-[15px] sm:text-[16px] leading-[1.65]">
              Tools and revenue models built specifically for audio producers, sound designers, and content creators.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-zinc-200">
              <h3 className="font-bold text-black text-base mb-1">BeatMaster Cloud Studio</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Collaborate remotely on multi-track audio stems with lossless real-time synchronization.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-zinc-200">
              <h3 className="font-bold text-black text-base mb-1">Stem Separation AI</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Extract vocals, drums, bass, and melody lines in seconds using our integrated neural audio isolation tool.
              </p>
            </div>
          </div>
        </div>
      );

    case "for-podcasters":
      return (
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4">
              BeatMusic for Podcasters
            </h1>
            <p className="text-zinc-700 text-[15px] sm:text-[16px] leading-[1.65]">
              Distribute your episodes via RSS, upload full video podcasts in 4K, and monetize with dynamic audio ads.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-zinc-200">
              <h3 className="font-bold text-black text-base mb-1">Video Podcast Support</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Direct upload with automatic chapter markers, thumbnail selection, and synchronized captions.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-zinc-200">
              <h3 className="font-bold text-black text-base mb-1">Interactive Polls & Q&A</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Engage your audience directly inside the playback window while episodes are streaming.
              </p>
            </div>
          </div>
        </div>
      );

    case "for-developers":
      return (
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4">
              Developer Platform & Web API
            </h1>
            <p className="text-zinc-700 text-[15px] sm:text-[16px] leading-[1.65]">
              Build rich audio applications, smart speaker integrations, and playlist automation tools using our REST API and Web Playback SDK.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900 text-zinc-100 font-mono text-xs overflow-x-auto space-y-1">
            <p className="text-zinc-400">// Example: Fetch Trending Songs via REST</p>
            <p className="text-emerald-400">curl -X GET https://api.beatmusic.com/v1/songs/trending \</p>
            <p className="pl-4 text-purple-300">-H "Authorization: Bearer YOUR_API_TOKEN"</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-zinc-200">
              <h3 className="font-bold text-black text-base mb-1">Web Playback SDK</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Control playback and stream full audio directly inside client-side web apps.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-zinc-200">
              <h3 className="font-bold text-black text-base mb-1">REST API v2</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Comprehensive endpoints for catalog search, playlist management, user library, and lyrics sync.
              </p>
            </div>
          </div>
        </div>
      );

    case "advertising":
      return (
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4">
              Advertising on BeatMusic
            </h1>
            <p className="text-zinc-700 text-[15px] sm:text-[16px] leading-[1.65]">
              Reach engaged listeners in screenless moments. Audio storytelling with guaranteed delivery and demographic precision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl border border-zinc-200 text-center">
              <h3 className="font-bold text-black text-base mb-1">Audio Ads</h3>
              <p className="text-xs text-zinc-600">30-second non-skippable audio spots between tracks.</p>
            </div>
            <div className="p-5 rounded-xl border border-zinc-200 text-center">
              <h3 className="font-bold text-black text-base mb-1">Sponsored Sessions</h3>
              <p className="text-xs text-zinc-600">Offer 30 minutes of ad-free listening sponsored by your brand.</p>
            </div>
            <div className="p-5 rounded-xl border border-zinc-200 text-center">
              <h3 className="font-bold text-black text-base mb-1">Display Takeover</h3>
              <p className="text-xs text-zinc-600">High-impact visual banners on desktop and mobile web player.</p>
            </div>
          </div>
        </div>
      );

    case "investors":
      return (
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4">
              Investor Relations
            </h1>
            <p className="text-zinc-700 text-[15px] sm:text-[16px] leading-[1.65]">
              Financial results, annual reports, shareholder information, and corporate governance for BeatMusic AB.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-zinc-200 space-y-2">
            <h3 className="font-bold text-black text-base">Q3 2026 Earnings Release</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Global revenue increased 34% year-over-year. Paying subscriber count surpasses 150 million globally.
            </p>
          </div>
        </div>
      );

    case "vendors":
      return (
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4">
              Vendor & Supplier Portal
            </h1>
            <p className="text-zinc-700 text-[15px] sm:text-[16px] leading-[1.65]">
              Procurement policies, ethical guidelines, and supplier registration for global BeatMusic partners.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-zinc-200">
            <h3 className="font-bold text-black text-base mb-1">Supplier Code of Conduct</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              We require all vendors and commercial partners to adhere strictly to our standards of sustainability and fair labor.
            </p>
          </div>
        </div>
      );

    /* ================= USEFUL LINKS ================= */
    case "support":
      return (
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4">
              Customer Service and Support
            </h1>
            <p className="text-zinc-700 text-[15px] sm:text-[16px] leading-[1.65]">
              Quick answers, billing support, and troubleshooting for your playback on all devices.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { q: "How do I download music for offline listening?", a: "With Premium, click the download icon next to any song, album, or playlist to listen offline." },
              { q: "How do I upgrade to Premium Platinum?", a: "Visit your Account Settings or the BeatMusic Plans page and choose Platinum for lossless 24-bit/192kHz Hi-Fi audio." },
              { q: "Can I transfer playlists from Spotify or Apple Music?", a: "Yes! Use our 'Import your music' tool in the Useful Links section to sync your playlists in 1 click." },
              { q: "How do I update my profile picture or account name?", a: "Click on your profile avatar in the navigation bar to update your display name and photo." },
            ].map((faq) => (
              <div key={faq.q} className="p-4 rounded-xl border border-zinc-200 space-y-1">
                <h4 className="font-bold text-black text-sm">{faq.q}</h4>
                <p className="text-xs text-zinc-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
            <h4 className="font-bold text-black text-sm mb-1">Still need help?</h4>
            <p className="text-xs text-zinc-600">
              Email our support team directly at{" "}
              <a href="mailto:support@beatmusic.com" className="text-[#1db954] font-bold hover:underline">
                support@beatmusic.com
              </a>
              . We respond within 24 hours.
            </p>
          </div>
        </div>
      );

    case "download":
      return (
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4">
              Download BeatMusic
            </h1>
            <p className="text-zinc-700 text-[15px] sm:text-[16px] leading-[1.65]">
              Play millions of songs and podcasts on your device. Free on iOS, Android, Mac, and Windows.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl border border-zinc-200 space-y-3">
              <Laptop className="size-8 text-[#1db954]" />
              <h3 className="font-bold text-black text-lg">Desktop App (Mac & Windows)</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Enjoy offline storage, keyboard hotkeys, and lossless audio streaming directly on your PC or Mac.
              </p>
              <button
                type="button"
                onClick={() => alert("Downloading BeatMusic Desktop Installer...")}
                className="px-5 py-2.5 rounded-full bg-black text-white hover:bg-[#1db954] hover:text-black font-bold text-xs transition-colors"
              >
                Download for Desktop
              </button>
            </div>

            <div className="p-6 rounded-2xl border border-zinc-200 space-y-3">
              <Smartphone className="size-8 text-[#1db954]" />
              <h3 className="font-bold text-black text-lg">Mobile App (iOS & Android)</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Stream on the go, download songs for the road, and connect to CarPlay and Bluetooth speakers.
              </p>
              <button
                type="button"
                onClick={() => alert("Opening App Store / Google Play...")}
                className="px-5 py-2.5 rounded-full bg-black text-white hover:bg-[#1db954] hover:text-black font-bold text-xs transition-colors"
              >
                Get Mobile App
              </button>
            </div>
          </div>
        </div>
      );

    case "charts":
      return (
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4">
              Popular by Country & Charts
            </h1>
            <p className="text-zinc-700 text-[15px] sm:text-[16px] leading-[1.65]">
              Discover what the world is listening to right now with daily updated charts across 180+ regions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-zinc-200">
              <h3 className="font-bold text-black text-base mb-1">Top 50 - Global</h3>
              <p className="text-xs text-zinc-600">The most played tracks in the world, updated every morning.</p>
            </div>
            <div className="p-5 rounded-xl border border-zinc-200">
              <h3 className="font-bold text-black text-base mb-1">Viral 50 - Global</h3>
              <p className="text-xs text-zinc-600">The most shared and trending new music right now.</p>
            </div>
          </div>
        </div>
      );

    case "lyrics":
      return (
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4">
              Top Song Lyrics
            </h1>
            <p className="text-zinc-700 text-[15px] sm:text-[16px] leading-[1.65]">
              Sing along with synchronized real-time lyrics on every track. Powered by Musixmatch.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200">
            <p className="text-sm text-zinc-700 leading-relaxed italic">
              "Lyrics scroll seamlessly with the music so you never miss a word. Available on desktop, mobile, and web."
            </p>
          </div>
        </div>
      );

    case "import":
      return (
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4">
              Import Your Music
            </h1>
            <p className="text-zinc-700 text-[15px] sm:text-[16px] leading-[1.65]">
              Seamlessly bring your existing favorites from Spotify, Apple Music, YouTube Music, or Amazon Music to BeatMusic in minutes.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-200 space-y-4">
            <h3 className="font-bold text-black text-lg">1-Click Playlist Migration</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Connect your external streaming account and our synchronization engine will automatically reconstruct your playlists and saved albums.
            </p>
            <button
              type="button"
              onClick={() => alert("Launching 1-Click Music Importer...")}
              className="px-5 py-2.5 rounded-full bg-[#1db954] text-black font-bold text-xs hover:scale-105 transition-transform"
            >
              Start Sync Now
            </button>
          </div>
        </div>
      );

    /* ================= PLANS ================= */
    case "premium":
    case "premium-platinum":
    case "premium-student":
    case "free":
      return (
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4">
              BeatMusic Plans & Pricing
            </h1>
            <p className="text-zinc-700 text-[15px] sm:text-[16px] leading-[1.65]">
              Choose the plan that fits your listening life. Ad-free music, offline listening, and uncompressed high-fidelity audio.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl border border-zinc-200 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1db954]">Free</span>
              <h3 className="font-bold text-black text-xl">$0 / month</h3>
              <p className="text-xs text-zinc-600">Shuffle play, ad-supported streaming, standard audio quality.</p>
            </div>
            <div className="p-6 rounded-2xl border-2 border-black space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1db954]">Premium Individual</span>
              <h3 className="font-bold text-black text-xl">$10.99 / month</h3>
              <p className="text-xs text-zinc-600">Ad-free music listening, offline downloads, unlimited skips, high quality audio.</p>
              <button
                type="button"
                onClick={() => alert("Redirecting to Premium Checkout...")}
                className="w-full py-2.5 rounded-full bg-black text-white hover:bg-[#1db954] hover:text-black font-bold text-xs transition-colors"
              >
                Get Premium
              </button>
            </div>
          </div>
        </div>
      );

    /* ================= LEGAL & PRIVACY ================= */
    case "legal":
    case "safety":
    case "privacy":
    case "cookies":
    case "ads":
    case "accessibility":
      return (
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4">
              {slug === "safety"
                ? "Safety & Privacy Center"
                : slug === "privacy"
                ? "Privacy Policy"
                : slug === "cookies"
                ? "Cookie Policy"
                : slug === "ads"
                ? "About Ads on BeatMusic"
                : slug === "accessibility"
                ? "Accessibility at BeatMusic"
                : "Legal Terms & Conditions"}
            </h1>
            <p className="text-zinc-700 text-[15px] sm:text-[16px] leading-[1.65]">
              Last updated: October 2026. These terms govern your use of the BeatMusic streaming platform and services.
            </p>
          </div>

          <div className="space-y-4 text-sm text-zinc-700 leading-relaxed">
            <p>
              At BeatMusic, we believe transparency and data protection are fundamental rights. We never sell your personal information to third parties.
            </p>
            <p>
              All audio streams are secured end-to-end, and your personal playback habits are encrypted with AES-256 standards.
            </p>
            <p>
              For legal inquiries, copyright notices (DMCA), or privacy inquiries, contact our Legal Department at{" "}
              <a href="mailto:legal@beatmusic.com" className="text-[#1db954] font-bold hover:underline">
                legal@beatmusic.com
              </a>
              .
            </p>
          </div>
        </div>
      );

    default:
      return (
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-black">Page Not Found</h1>
          <p className="text-zinc-600 text-sm">Please choose a topic from the footer or return home.</p>
          <Link to="/home" className="inline-block px-5 py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-[#1db954] hover:text-black transition-colors">
            Return to Home
          </Link>
        </div>
      );
  }
}

export default InfoPage;
