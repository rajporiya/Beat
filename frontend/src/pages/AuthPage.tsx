import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, TriangleAlert } from "lucide-react";
import BeatMusicLogo from "@/components/c/BeatMusicLogo";
import { useAuthStore } from "@/stores/useAuthStore";

const inputClass =
  "mt-2 w-full rounded-md border border-zinc-600 bg-[#242424] p-3 outline-none focus:border-[#22c55e]";
const labelClass = "block text-sm font-semibold";

export default function AuthPage({ mode }: { mode: "login" | "register" }) {
  const isLogin = mode === "login";
  const navigate = useNavigate();
  const { login, register, isLoading } = useAuthStore();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const name = String(formData.get("name") ?? "").trim();
    const confirm = String(formData.get("confirm") ?? "");

    try {
      if (isLogin) {
        await login({ email, password });
        navigate("/home");
      } else {
        if (password !== confirm) {
          setError("Passwords do not match.");
          return;
        }
        await register({ name, email, password, confirmPassword: confirm });
        navigate("/home");
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[#121212] p-5 text-white">
      <section className="w-full max-w-md rounded-2xl bg-[#181818] p-7 shadow-2xl sm:p-9">
        <div className="mb-8 flex flex-col items-center">
          <BeatMusicLogo className="size-12" />
          <h1 className="mt-4 text-center text-3xl font-black">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-center text-sm text-zinc-400">
            {isLogin
              ? "Log in to continue listening."
              : "Continue your sound journey with Beat Music."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <label className={labelClass}>
              Name
              <input
                required
                name="name"
                className={inputClass}
                placeholder="Your name"
              />
            </label>
          )}
          <label className={labelClass}>
            Email
            <input
              required
              type="email"
              name="email"
              className={inputClass}
              placeholder="name@example.com"
            />
          </label>
          <label className={labelClass}>
            Password
            <input
              required
              minLength={6}
              type="password"
              name="password"
              className={inputClass}
              placeholder="••••••••"
            />
          </label>
          {!isLogin && (
            <label className={labelClass}>
              Confirm password
              <input
                required
                minLength={6}
                type="password"
                name="confirm"
                className={inputClass}
                placeholder="••••••••"
              />
            </label>
          )}
          <button
            type="submit"
            disabled={loading || isLoading}
            className="flex w-full items-center justify-center rounded-full bg-[#22c55e] py-3 font-bold text-black hover:bg-[#3be477] disabled:opacity-60 cursor-pointer"
          >
            {(loading || isLoading) && <Loader2 className="size-4 animate-spin mr-2" />}
            {isLogin ? "Log in" : "Create account"}
          </button>
        </form>

        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-400">
            <TriangleAlert className="size-4 mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        <p className="mt-7 text-center text-sm text-zinc-400">
          {isLogin ? "New to Beat Music?" : "Already have an account?"}{" "}
          <Link className="font-bold text-white underline" to={isLogin ? "/register" : "/login"}>
            {isLogin ? "Create account" : "Log in"}
          </Link>
        </p>
      </section>
    </main>
  );
}