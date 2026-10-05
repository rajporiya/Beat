import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FOOTER_SECTIONS, BOTTOM_LINKS } from "@/data/footerMenuData";

/**
 * MenuPage — standalone page that renders ONLY the footer menu data.
 * Opened in a new tab from the footer's "Menu" link (/menu).
 */
export const MenuPage: React.FC = () => {
  useEffect(() => {
    document.title = "Menu — BeatMusic";
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      {/* Slim top bar */}
      <header className="border-b border-zinc-800/80 px-6 sm:px-12 lg:px-20 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/Animation/title.svg"
            alt="BeatMusic Logo"
            className="size-8"
          />
          <span className="font-bold text-lg tracking-tight">
            Beat<span className="text-[#1db954]">Music</span>
          </span>
        </div>
        <Link
          to="/home"
          className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors"
        >
          Web Player
        </Link>
      </header>

      {/* Menu content — only menu data */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 sm:px-12 py-12">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">
          Menu
        </h1>
        <p className="text-zinc-400 text-sm mb-10">
          All BeatMusic pages and resources in one place.
        </p>

        {/* Sections grid — the exact menu data from the footer */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col space-y-3">
              <h2 className="font-bold text-white text-base tracking-tight mb-1">
                {section.title}
              </h2>
              {section.links.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-sm text-zinc-400 hover:text-white hover:underline transition-colors w-fit"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-400 hover:text-white hover:underline transition-colors w-fit"
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>
          ))}
        </div>

        {/* Bottom (legal) links */}
        <div className="border-t border-zinc-800/80 mt-12 pt-8">
          <h2 className="font-bold text-white text-base tracking-tight mb-4">
            Legal & More
          </h2>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {BOTTOM_LINKS.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm text-zinc-400 hover:text-white hover:underline transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-400 hover:text-white hover:underline transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
          </div>
        </div>
      </main>

      {/* Slim bottom bar */}
      <footer className="border-t border-zinc-800/80 py-6 px-6 sm:px-12 lg:px-20 text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span>{`© ${new Date().getFullYear()} BeatMusic`}</span>
        <span className="text-zinc-600">Menu data sourced from the site footer.</span>
      </footer>
    </div>
  );
};

export default MenuPage;
