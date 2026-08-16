import {
  SignedIn,
  SignedOut,
  SignOutButton,
} from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButton from "@/components/SignInOAuthButton";

export const Topbar = () => {
  const isAdmin = false;

  return (
    <div className="flex items-center justify-between p-4 top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      <div className="flex gap-2 items-center">
        Beat Music
      </div>

      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to="/admin" className="flex items-center">
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin Dashboard
          </Link>
        )}

        {/* User is logged in */}
        <SignedIn>
          <SignOutButton>
            <button className="px-4 py-2 rounded-md bg-zinc-800 text-white">
              Sign Out
            </button>
          </SignOutButton>
        </SignedIn>

        {/* User is logged out */}
        <SignedOut>
          <SignInOAuthButton />
        </SignedOut>
      </div>
    </div>
  );
};