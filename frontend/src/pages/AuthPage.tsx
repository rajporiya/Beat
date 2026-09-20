import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, TriangleAlert } from "lucide-react";
import BeatMusicLogo from "@/components/c/BeatMusicLogo";
import SignInOAuthButton from "@/components/SignInOAuthButton";
import { useSignIn, useSignUp } from "@clerk/clerk-react";

const inputClass =
  "mt-2 w-full rounded-md border border-zinc-600 bg-[#242424] p-3 outline-none focus:border-[#22c55e]";
const labelClass = "block text-sm font-semibold";

const extractError = (err: unknown): string => {
  const anyErr = err as {
    errors?: { longMessage?: string; message?: string; code?: string }[];
    message?: string;
  };
  const first = anyErr?.errors?.[0];
  if (first?.code === "form_password_incorrect") return "Incorrect email or password. Please try again.";
  return (
    first?.longMessage ||
    first?.message ||
    anyErr?.message ||
    "Something went wrong. Please try again."
  );
};

export default function AuthPage({ mode }: { mode: "login" | "register" }) {
  const isLogin = mode === "login";
  const navigate = useNavigate();
  const { signIn, setActive: setActiveSignIn, isLoaded: signInLoaded } = useSignIn();
  const { signUp, setActive: setActiveSignUp, isLoaded: signUpLoaded } = useSignUp();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);

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
        if (!signIn) {
          setError("Authentication is still loading. Please try again.");
          return;
        }
        const result = await signIn.create({ identifier: email, password });
        if (result.status === "complete") {
          await setActiveSignIn({ session: result.createdSessionId });
          navigate("/home");
        }
      } else {
        if (!signUp) {
          setError("Authentication is still loading. Please try again.");
          return;
        }
        if (password !== confirm) {
          setError("Passwords do not match.");
          return;
        }
        const result = await signUp.create({
          firstName: name,
          emailAddress: email,
          password,
        });
        if (result.status === "complete") {
          await setActiveSignUp({ session: result.createdSessionId });
          navigate("/home");
        } else if (result.status === "missing_requirements") {
          setPendingVerification(true);
        }
      }
    } catch (err) {
      setError(extractError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const code = String(formData.get("code") ?? "");

    if (!signUp) {
      setError("Authentication is still loading. Please try again.");
      setLoading(false);
      return;
    }

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });
      if (result.status === "complete") {
        await setActiveSignUp({ session: result.createdSessionId });
        navigate("/home");
      }
    } catch (err) {
      setError(extractError(err));
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
            {pendingVerification
              ? "Verify your email"
              : isLogin
                ? "Welcome back"
                : "Create your account"}
          </h1>
          <p className="mt-2 text-center text-sm text-zinc-400">
            {pendingVerification
              ? "We sent a verification code to your email."
              : "Continue your sound journey with Beat Music."}
          </p>
        </div>

        {pendingVerification ? (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <label className={labelClass}>
              Verification code
              <input
                required
                name="code"
                className={inputClass}
                placeholder="6-digit code"
              />
            </label>
            <button
              disabled={loading || (isLogin ? !signInLoaded : !signUpLoaded)}
              className="flex w-full items-center justify-center rounded-full bg-[#22c55e] py-3 font-bold text-black hover:bg-[#3be477] disabled:opacity-60"
            >
              {loading && <Loader2 className="size-4 animate-spin mr-2" />}
              Verify email
            </button>
          </form>
        ) : (
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
              disabled={loading || (isLogin ? !signInLoaded : !signUpLoaded)}
              className="flex w-full items-center justify-center rounded-full bg-[#22c55e] py-3 font-bold text-black hover:bg-[#3be477] disabled:opacity-60"
            >
              {loading && <Loader2 className="size-4 animate-spin mr-2" />}
              {isLogin ? "Log in" : "Create account"}
            </button>
          </form>
        )}

        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-400">
            <TriangleAlert className="size-4 mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        {isLogin && !pendingVerification && (
          <button className="mt-4 text-sm text-zinc-300 underline">Forgot password?</button>
        )}

        {!pendingVerification && (
          <>
            <div className="my-6 flex items-center gap-3 text-xs text-zinc-500 before:h-px before:flex-1 before:bg-zinc-700 after:h-px after:flex-1 after:bg-zinc-700">
              OR
            </div>
            <div className="grid gap-3">
              <SignInOAuthButton />
            </div>
          </>
        )}

        {!pendingVerification && (
          <p className="mt-7 text-center text-sm text-zinc-400">
            {isLogin ? "New to Beat Music?" : "Already have an account?"}{" "}
            <Link className="font-bold text-white underline" to={isLogin ? "/register" : "/login"}>
              {isLogin ? "Create account" : "Log in"}
            </Link>
          </p>
        )}
      </section>
    </main>
  );
}