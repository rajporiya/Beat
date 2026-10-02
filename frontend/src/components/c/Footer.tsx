import React from "react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Company",
    links: [
      { label: "About BeatMusic", href: "/about" },
      { label: "Jobs", href: "/info/jobs" },
      { label: "For the Record", href: "/info/newsroom" },
    ],
  },
  {
    title: "Communities",
    links: [
      { label: "For Artists", href: "/info/for-artists" },
      { label: "For Creators", href: "/info/for-creators" },
      { label: "For Podcasters", href: "/info/for-podcasters" },
      { label: "For Developers", href: "/info/for-developers" },
      { label: "Advertising", href: "/info/advertising" },
      { label: "Investors", href: "/info/investors" },
      { label: "Vendors", href: "/info/vendors" },
    ],
  },
  {
    title: "Useful links",
    links: [
      { label: "Support", href: "/info/support" },
      { label: "Free Mobile App", href: "/info/download" },
      { label: "Popular by Country", href: "/info/charts" },
      { label: "Top Song Lyrics", href: "/info/lyrics" },
      { label: "Import your music", href: "/info/import" },
    ],
  },
  {
    title: "BeatMusic Plans",
    links: [
      { label: "Premium Standard", href: "/info/premium" },
      { label: "Premium Platinum", href: "/info/premium-platinum" },
      { label: "Premium Student", href: "/info/premium-student" },
      { label: "BeatMusic Free", href: "/info/free" },
    ],
  },
];

const BOTTOM_LINKS: FooterLink[] = [
  { label: "Legal", href: "/info/legal" },
  { label: "Safety & Privacy Center", href: "/info/safety" },
  { label: "Privacy Policy", href: "/info/privacy" },
  { label: "Cookies", href: "/info/cookies" },
  { label: "About Ads", href: "/info/ads" },
  { label: "Accessibility", href: "/info/accessibility" },
];

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 pt-10 pb-16 border-t border-zinc-800/80 text-zinc-400 select-none">

      {/* Brand Logo + Name */}
      <div className="flex items-center gap-3 mb-10">
        <img
          src="/Animation/title.svg"
          alt="BeatMusic Logo"
          className="size-12 shrink-0"
        />
        <span className="text-white font-bold text-xl tracking-tight">
          Beat<span className="text-[#863bff]">Music</span>
        </span>
      </div>

      {/* Top Section: Links columns + Social Buttons */}
      <div className="flex flex-col lg:flex-row justify-between gap-10">

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 flex-1">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col space-y-3">
              <h3 className="font-bold text-white text-base tracking-tight mb-1">
                {section.title}
              </h3>
              {section.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-400 hover:text-white hover:underline transition-colors w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Social Media Buttons (Top Right) */}
        <div className="flex items-start gap-4 shrink-0">
          {/* Instagram */}
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="size-10 rounded-full bg-[#292929] hover:bg-[#727272] text-white flex items-center justify-center transition-colors shadow-md group"
          >
            <svg className="size-5 fill-current transition-transform group-hover:scale-105" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          {/* X (Twitter) */}
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="size-10 rounded-full bg-[#292929] hover:bg-[#727272] text-white flex items-center justify-center transition-colors shadow-md group"
          >
            <svg className="size-4 fill-current transition-transform group-hover:scale-105" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="size-10 rounded-full bg-[#292929] hover:bg-[#727272] text-white flex items-center justify-center transition-colors shadow-md group"
          >
            <svg className="size-5 fill-current transition-transform group-hover:scale-105" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom Horizontal Bar */}
      <div className="border-t border-zinc-800/80 mt-10 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-zinc-400">
        {/* Legal Links - Left */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {BOTTOM_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:underline transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Copyright - Right */}
        <div className="text-zinc-500 whitespace-nowrap shrink-0">
          {`© ${new Date().getFullYear()} BeatMusic`}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
