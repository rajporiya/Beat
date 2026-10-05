import { useEffect, useState, type ReactNode } from "react";
import { Loader } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUserProfileStore } from "@/stores/useUserProfileStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

type AuthProviderProps = {
  children: ReactNode;
};

export const useUser = () => {
  const { user, isLoaded } = useAuthStore();
  return {
    user,
    isLoaded,
    isSignedIn: Boolean(user),
  };
};

export const useAuth = () => {
  const { user, isLoaded, token, logout } = useAuthStore();
  return {
    user,
    isLoaded,
    isSignedIn: Boolean(user),
    userId: user?._id || user?.id || null,
    getToken: async () => token,
    signOut: logout,
  };
};

export const SignedIn = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthStore();
  if (!user) return null;
  return <>{children}</>;
};

export const SignedOut = ({ children }: { children: ReactNode }) => {
  const { user, isLoaded } = useAuthStore();
  if (user || !isLoaded) return null;
  return <>{children}</>;
};

export const UserButton = () => {
  const { user, logout } = useAuthStore();
  const { profile } = useUserProfileStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user) return null;

  const displayName = profile?.fullName || user.fullName || "User";
  const avatarUrl = profile?.imageUrl || user.imageUrl;
  const initials =
    displayName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join("") || "U";

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full focus:outline-none"
        title={displayName}
      >
        <Avatar className="size-9 ring-2 ring-emerald-500/60 hover:ring-emerald-400 transition-all cursor-pointer">
          {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
          <AvatarFallback className="bg-[#282828] text-xs font-bold text-white">
            {initials}
          </AvatarFallback>
        </Avatar>
      </button>

      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#282828] p-1.5 shadow-2xl border border-white/10 z-50 text-sm">
            <div className="px-3 py-2 border-b border-white/10 mb-1">
              <p className="font-semibold text-white truncate">{displayName}</p>
              <p className="text-xs text-zinc-400 truncate">{user.email}</p>
            </div>
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/profile");
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-zinc-200 hover:bg-white/10 transition-colors"
            >
              Profile
            </button>
            {user.isAdmin && (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/admin");
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-zinc-200 hover:bg-white/10 transition-colors"
              >
                Admin Panel
              </button>
            )}
            <button
              onClick={async () => {
                setMenuOpen(false);
                await logout();
                navigate("/login");
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/15 transition-colors"
            >
              Log out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(true);
  const { checkAuth, checkAdminStatus, user } = useAuthStore();
  const { fetchProfile } = useUserProfileStore();

  useEffect(() => {
    const init = async () => {
      try {
        await checkAuth();
      } catch (err) {
        console.error("Auth initialization error:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [checkAuth]);

  useEffect(() => {
    if (user) {
      checkAdminStatus();
      fetchProfile();
    }
  }, [user, checkAdminStatus, fetchProfile]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#121212]">
        <Loader className="size-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
