import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Loader2, LogOut, Mail, Save, TriangleAlert, User as UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserProfileStore } from "@/stores/useUserProfileStore";
import { useAuthStore } from "@/stores/useAuthStore";

const inputClass =
  "mt-2 w-full rounded-md border border-zinc-600 bg-[#242424] p-3 text-sm text-white outline-none focus:border-[#22c55e] disabled:opacity-60";
const labelClass = "block text-sm font-semibold text-white";

export default function ProfilePage() {
  const {
    profile,
    isProfileLoading,
    isUpdating,
    isUploadingAvatar, 
    error,
    fetchProfile,
    updateProfile,
    uploadAvatar,
    logout: profileLogout,
  } = useUserProfileStore();
  const { user, logout: authLogout, setUser } = useAuthStore();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      await fetchProfile();
      setLoaded(true);
    };
    void loadProfile();
  }, [fetchProfile]);

  // Prefill form when profile arrives
  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName ?? "");
      setEmail(profile.email ?? "");
    } else if (user) {
      setFullName(user.fullName ?? "");
      setEmail(user.email ?? "");
    }
  }, [profile, user]);

  const isDirty = profile
    ? fullName.trim() !== (profile.fullName ?? "") || email.trim() !== (profile.email ?? "")
    : false;

  const handleSelectAvatar = () => fileInputRef.current?.click();

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await authLogout();
      await profileLogout();
    } finally {
      navigate("/login");
    }
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFormError("Please choose an image file (PNG, JPG, etc.)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFormError("Image must be smaller than 5MB");
      return;
    }

    setFormError(null);
    setSuccess(null);
    const ok = await uploadAvatar(file);
    if (ok) {
      const updatedProfile = useUserProfileStore.getState().profile;
      if (updatedProfile && user) {
        setUser({ ...user, imageUrl: updatedProfile.imageUrl });
      }
      setSuccess("Profile photo updated");
    }
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setSuccess(null);

    const name = fullName.trim();
    const mail = email.trim();

    if (name.length < 2) {
      setFormError("Name must be at least 2 characters long");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
      setFormError("Please enter a valid email address");
      return;
    }

    const ok = await updateProfile({ fullName: name, email: mail });
    if (ok) {
      if (user) {
        setUser({ ...user, fullName: name, email: mail });
      }
      setSuccess("Profile updated successfully");
    }
  };

  if ((isProfileLoading || !loaded) && !profile) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-zinc-400">
        <Loader2 className="size-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
        <TriangleAlert className="size-8 text-red-400" />
        <p className="text-sm text-zinc-400">
          {error ?? "We couldn't load your profile. Please try signing in again."}
        </p>
        <button
          onClick={() => fetchProfile()}
          className="rounded-full bg-white px-4 py-2 text-sm font-bold text-black hover:bg-zinc-200"
        >
          Retry
        </button>
      </div>
    );
  }

  const initials =
    profile.fullName
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part: string) => part[0]?.toUpperCase())
      .join("") || "U";

  const avatarUrl = profile.imageUrl || user?.imageUrl;

  return (
    <div className="mx-auto w-full max-w-2xl overflow-y-auto p-5 sm:p-8">
      <h1 className="text-2xl font-black text-white sm:text-3xl">Account Overview</h1>
      <p className="mt-1 text-sm text-zinc-400">Manage your personal information and profile photo.</p>

      {error && !formError && (
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-400">
          <TriangleAlert className="mt-0.5 size-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Avatar section */}
      <section className="mt-6 rounded-2xl bg-[#181818] p-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
          <div className="relative">
            <Avatar className="size-24">
              {avatarUrl ? (
                <AvatarImage key={avatarUrl} src={avatarUrl} alt={profile.fullName} />
              ) : null}
              <AvatarFallback className="bg-[#242424] text-xl font-bold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>

            <button
              type="button"
              onClick={handleSelectAvatar}
              disabled={isUploadingAvatar}
              aria-label="Change profile photo"
              title="Change profile photo"
              className="absolute -right-1 -bottom-1 grid size-9 place-items-center rounded-full bg-[#22c55e] text-black shadow-lg transition-transform hover:scale-110 disabled:opacity-60"
            >
              {isUploadingAvatar ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Camera className="size-4" />
              )}
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          <div className="min-w-0 flex-1 text-center sm:text-left">
            <p className="truncate text-lg font-bold text-white">{profile.fullName}</p>
            <p className="truncate text-sm text-zinc-400">{profile.email}</p>
            <button
              type="button"
              onClick={handleSelectAvatar}
              disabled={isUploadingAvatar}
              className="mt-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 disabled:opacity-60"
            >
              {isUploadingAvatar ? "Uploading..." : "Upload new photo"}
            </button>
          </div>
        </div>
      </section>

      {/* Details form */}
      <section className="mt-4 rounded-2xl bg-[#181818] p-6">
        <h2 className="text-lg font-bold text-white">Profile details</h2>

        <form onSubmit={handleSave} className="mt-4 space-y-4">
          <label className={labelClass}>
            <span className="flex items-center gap-1.5">
              <UserIcon className="size-3.5 text-zinc-400" />
              Full name
            </span>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your name"
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            <span className="flex items-center gap-1.5">
              <Mail className="size-3.5 text-zinc-400" />
              Email
            </span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="name@example.com"
              className={inputClass}
            />
          </label>

          {formError && (
            <div className="flex items-start gap-2 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-400">
              <TriangleAlert className="mt-0.5 size-4 shrink-0" />
              {formError}
            </div>
          )}

          {success && (
            <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-emerald-400">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={isUpdating || !isDirty}
            className="flex items-center justify-center gap-2 rounded-full bg-[#22c55e] px-6 py-2.5 font-bold text-black transition-colors hover:bg-[#3be477] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUpdating ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            {isUpdating ? "Saving..." : "Save changes"}
          </button>
        </form>
      </section>

      {/* Logout */}
      <section className="mt-4 flex flex-col gap-3 rounded-2xl bg-[#181818] p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Log out</h2>
          <p className="mt-1 text-sm text-zinc-400">End your session on this device.</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center justify-center gap-2 rounded-full border border-red-500/50 bg-red-500/10 px-6 py-2.5 font-bold text-red-400 transition-colors hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoggingOut ? <Loader2 className="size-4 animate-spin" /> : <LogOut className="size-4" />}
          {isLoggingOut ? "Logging out..." : "Log out"}
        </button>
      </section>
    </div>
  );
}
