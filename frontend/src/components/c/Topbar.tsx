import { SignedOut, SignIn, SignOutButton } from "@clerk/clerk-react";
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

      <div>
        {isAdmin && (
          <Link to="/admin" className="flex items-center">
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin Dashboard
          </Link>
        )}

        <SignIn>
          <SignOutButton />
        </SignIn>

        <SignedOut>
          <SignInOAuthButton />
        </SignedOut>
      </div>
    </div>
  );
};