import React from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserProfileStore } from "@/stores/useUserProfileStore";

export const AboutPage: React.FC = () => {
  const { user } = useUser();
  const { profile } = useUserProfileStore();

  const avatarUrl = profile?.imageUrl || user?.imageUrl;
  const displayName = profile?.fullName || user?.fullName || user?.firstName || "U";
  const initials =
    displayName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U";

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col">
      {/* Top Black Header (Matching Screenshot) */}
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
            className="text-white hover:text-[#863bff] transition-colors hidden sm:inline"
          >
            Premium plans
          </Link>
          <Link
            to="/info/support"
            className="text-white hover:text-[#863bff] transition-colors"
          >
            Support
          </Link>
          <Link
            to="/info/download"
            className="text-white hover:text-[#863bff] transition-colors hidden md:inline"
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
              className="text-white hover:text-[#863bff] transition-colors"
            >
              Log in
            </Link>
          </SignedOut>

          <SignedIn>
            <Link
              to="/profile"
              className="flex items-center gap-2 text-white hover:text-[#863bff] transition-colors"
              title="Your Profile"
            >
              <Avatar className="size-8 ring-2 ring-[#863bff]/60">
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

      {/* Main Content Area (2 Columns) */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 sm:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column (About Us + Customer Service) */}
          <section className="lg:col-span-7 space-y-10">
            {/* About Us Header & Paragraphs */}
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-8">
                About Us
              </h1>

              <div className="space-y-5 text-[15px] sm:text-[16px] leading-[1.65] text-zinc-800 font-normal">
                <p>
                  With BeatMusic, it’s easy to find the right music or podcast for every moment — on your phone,
                  your computer, your tablet and more.
                </p>

                <p>
                  There are millions of tracks and episodes on BeatMusic. So whether you’re behind the wheel,
                  working out, partying or relaxing, the right music or podcast is always at your fingertips.
                  Choose what you want to listen to, or let BeatMusic surprise you.
                </p>

                <p>
                  You can also browse through the collections of friends, artists, and celebrities, or create a
                  radio station and just sit back.
                </p>

                <p>Soundtrack your life with BeatMusic. Subscribe or listen for free.</p>
              </div>
            </div>

            {/* Customer Service and Support */}
            <div className="pt-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight mb-6">
                Customer Service and Support
              </h2>

              <ol className="space-y-6 text-[15px] text-zinc-800 leading-relaxed list-none pl-0">
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-black shrink-0">1.</span>
                  <div>
                    <Link
                      to="/info/support"
                      className="font-bold text-[#1db954] hover:underline"
                    >
                      Help site
                    </Link>
                    . Check out our help site for answers to your questions and to learn how to get the most out of BeatMusic and your music.
                  </div>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-black shrink-0">2.</span>
                  <div>
                    <Link
                      to="/info/for-creators"
                      className="font-bold text-[#1db954] hover:underline"
                    >
                      Community
                    </Link>
                    . Get fast support from expert BeatMusic users. If there isn’t already an answer there to your question, post it and someone will quickly answer. You can also suggest and vote on new ideas for BeatMusic or simply discuss music with other fans.
                  </div>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-black shrink-0">3.</span>
                  <div>
                    <a
                      href="mailto:support@beatmusic.com"
                      className="font-bold text-[#1db954] hover:underline"
                    >
                      Contact us
                    </a>
                    . Contact our Customer Support if you don’t find a solution on our support site or Community.
                  </div>
                </li>
              </ol>
            </div>

            {/* Or pick a topic */}
            <div className="pt-4 border-t border-zinc-200">
              <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight mb-4">
                Or pick a topic:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <Link
                  to="/info/for-artists"
                  className="p-3.5 rounded-lg border border-zinc-200 hover:border-black font-semibold text-zinc-800 hover:text-black hover:bg-zinc-50 transition-colors"
                >
                  Looking for artist help? →
                </Link>
                <Link
                  to="/info/advertising"
                  className="p-3.5 rounded-lg border border-zinc-200 hover:border-black font-semibold text-zinc-800 hover:text-black hover:bg-zinc-50 transition-colors"
                >
                  Advertisers & Brands →
                </Link>
                <Link
                  to="/info/for-developers"
                  className="p-3.5 rounded-lg border border-zinc-200 hover:border-black font-semibold text-zinc-800 hover:text-black hover:bg-zinc-50 transition-colors"
                >
                  Developers & Web API →
                </Link>
                <Link
                  to="/info/newsroom"
                  className="p-3.5 rounded-lg border border-zinc-200 hover:border-black font-semibold text-zinc-800 hover:text-black hover:bg-zinc-50 transition-colors"
                >
                  Press inquiries & Newsroom →
                </Link>
                <Link
                  to="/info/jobs"
                  className="p-3.5 rounded-lg border border-zinc-200 hover:border-black font-semibold text-zinc-800 hover:text-black hover:bg-zinc-50 transition-colors"
                >
                  Jobs & Careers at BeatMusic →
                </Link>
                <Link
                  to="/info/investors"
                  className="p-3.5 rounded-lg border border-zinc-200 hover:border-black font-semibold text-zinc-800 hover:text-black hover:bg-zinc-50 transition-colors"
                >
                  Investor relations →
                </Link>
              </div>
            </div>
          </section>

          {/* Right Column (HQ + Around the World) */}
          <section className="lg:col-span-5 space-y-12 lg:pl-4">
            {/* BeatMusic HQ */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight mb-4">
                BeatMusic HQ
              </h2>
              <div className="text-[14px] leading-relaxed text-zinc-800 font-normal space-y-1">
                <p className="font-bold text-black">BeatMusic AB</p>
                <p>Regeringsgatan 19</p>
                <p>SE-111 53 Stockholm</p>
                <p>Sweden</p>
                <p className="pt-1 text-zinc-600">Reg no: 556703-7486</p>
                <a
                  href="mailto:office@beatmusic.com"
                  className="inline-block text-[#1db954] hover:underline font-medium"
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
                {/* Belgium */}
                <div className="space-y-0.5">
                  <p className="font-bold text-black text-sm">BeatMusic Belgium</p>
                  <p>Square de Meeûs 37</p>
                  <p>4th floor</p>
                  <p>1000 Brussels</p>
                  <p>Belgium</p>
                  <a href="mailto:office@beatmusic.com" className="text-[#1db954] hover:underline block pt-1">
                    office@beatmusic.com
                  </a>
                </div>

                {/* India */}
                <div className="space-y-0.5">
                  <p className="font-bold text-black text-sm">BeatMusic India LLP</p>
                  <p>Jet Airways - Godrej BKC</p>
                  <p>1st Floor, Unit 1 and 2,</p>
                  <p>Plot C-68, G Block,</p>
                  <p>Bandra Kurla Complex, Bandra East,</p>
                  <p>Mumbai Suburban 400051</p>
                  <p>Maharashtra, India</p>
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

                {/* Italy */}
                <div className="space-y-0.5">
                  <p className="font-bold text-black text-sm">BeatMusic Italy S.r.l.</p>
                  <p>Via Joe Colombo 4</p>
                  <p>20124 Milano</p>
                  <p>Italy</p>
                  <a href="mailto:office@beatmusic.com" className="text-[#1db954] hover:underline block pt-1">
                    office@beatmusic.com
                  </a>
                </div>

                {/* Canada */}
                <div className="space-y-0.5">
                  <p className="font-bold text-black text-sm">BeatMusic Canada Inc.</p>
                  <p>220 Adelaide Street West</p>
                  <p>M5H 1W7 Toronto</p>
                  <p>Ontario, Canada</p>
                  <a href="mailto:office@beatmusic.com" className="text-[#1db954] hover:underline block pt-1">
                    office@beatmusic.com
                  </a>
                </div>

                {/* USA */}
                <div className="space-y-0.5">
                  <p className="font-bold text-black text-sm">BeatMusic USA Inc.</p>
                  <p>4 World Trade Center</p>
                  <p>150 Greenwich St, 62nd Floor</p>
                  <p>New York, NY 10007</p>
                  <p>USA</p>
                  <a href="mailto:office@beatmusic.com" className="text-[#1db954] hover:underline block pt-1">
                    office@beatmusic.com
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer Bottom Bar (Dark Spotify style) */}
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

export default AboutPage;
