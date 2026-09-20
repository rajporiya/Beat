import { Heart, Home, Library, Search } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [{ to: "/home", label: "Home", icon: Home }, { to: "/search", label: "Search", icon: Search }, { to: "/library", label: "Library", icon: Library }, { to: "/liked", label: "Liked", icon: Heart }];

export default function MobileNav() {
  return <nav className="fixed bottom-0 left-0 z-30 flex h-16 w-full items-center justify-around border-t border-white/10 bg-[#121212]/95 px-2 backdrop-blur md:hidden">
    {links.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} className={({ isActive }) => `flex min-w-14 flex-col items-center gap-1 text-[10px] font-semibold ${isActive ? "text-white" : "text-zinc-500"}`}><Icon className="size-5" /><span>{label}</span></NavLink>)}
  </nav>;
}
