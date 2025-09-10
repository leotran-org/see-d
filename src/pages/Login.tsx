import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Github, Chrome, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { useDirectusAuth } from "@/hooks/use-login";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const { login, token,loading: login_loading, error: login_error } = useDirectusAuth("/cms-api/");
  const navigate = useNavigate();

  function validateEmail(email: string) {
    return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
  }


function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  if (!validateEmail(form.email)) {
    setError("Please enter a valid email address.");
    return;
  }

  setLoading(true);
  setError(null);
  setSuccess(null);

  login(form.email, form.password)
    .then(() => {
      setSuccess(`Login successful!`);
      navigate("/");
    })
    .catch((err: Error) => {
      setError(err.message === "Invalid input" ? "Invalid email or password" : err.message || "An unexpected error occurred.");
    })
    .finally(() => {
      setLoading(false);
    });
}

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background text-foreground">
      {/* Left / Brand Panel */}
      <div className="relative hidden lg:flex items-center justify-center p-12 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm border border-border bg-accent/40">
              <CheckCircle2 className="h-4 w-4" />
              Secure • SSO Ready
            </span>
          </div>
          <h1 className="text-5xl font-extrabold leading-tight hero-text-gradient mb-6">
            Welcome back to SEE‑D
          </h1>
          <p className="text-muted-foreground text-lg">
            Sign in to continue your work. Your data is protected with industry‑standard encryption and modern authentication.
          </p>
        </motion.div>

        {/* Glow + gradient deco */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl opacity-50 glow-effect" />
          <div className="absolute inset-0" style={{ background: "var(--section-gradient)" }} />
        </div>
      </div>

      {/* Right / Form Card */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div
            className="rounded-2xl border bg-card text-card-foreground shadow-xl card-hover"
            style={{ background: "var(--card-gradient)" }}
          >
            <div className="p-8">
              <div className="mb-6 text-center">
                <div className="mx-auto mb-3 h-12 w-12 rounded-2xl flex items-center justify-center"
                  style={{ background: "hsl(var(--primary-light))" }}>
                  <ArrowRight className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-semibold">Sign in</h2>
                <p className="text-sm text-muted-foreground mt-1">Use your email and password</p>
              </div>

              {error && (
                <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200/60 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
                  <AlertCircle className="mt-0.5 h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}
              {success && (
                <div className="mb-4 flex items-start gap-2 rounded-lg border border-emerald-200/60 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4" />
                  <span>{success}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="peer w-full rounded-xl border border-input bg-white/70 px-4 py-3 pr-10 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] dark:bg-card"
                      placeholder="name@company.com"
                    />
                    <Mail className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70 peer-focus:text-foreground" />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="peer w-full rounded-xl border border-input bg-white/70 px-4 py-3 pr-10 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] dark:bg-card"
                      placeholder="••••••••"
                      minLength={8}
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground/80 hover:text-foreground transition"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
                  </div>
                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <label className="flex items-center gap-2 text-sm select-none">
                    <input
                      type="checkbox"
                      checked={form.remember}
                      onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                      className="h-4 w-4 rounded border-input accent-[hsl(var(--primary))]"
                    />
                    Remember me
                  </label>
                  <a href="#" className="text-sm font-medium text-[hsl(var(--primary))] hover:underline">Forgot password?</a>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-3 text-sm font-semibold text-[hsl(var(--primary-foreground))] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] disabled:opacity-60"
                >
                  <span>Sign in</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>

                {/* Divider */}
                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-card px-2 text-xs text-muted-foreground">or continue with</span>
                  </div>
                </div>

                {/* Socials */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => alert("Hook this up to Google OAuth")}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white/70 px-3 py-2.5 text-sm transition hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] dark:bg-card"
                  >
                    <Chrome className="h-4 w-4" /> Google
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("Hook this up to GitHub OAuth")}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white/70 px-3 py-2.5 text-sm transition hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] dark:bg-card"
                  >
                    <Github className="h-4 w-4" /> GitHub
                  </button>
                </div>

                {/* Create account */}
                <p className="text-center text-sm text-muted-foreground pt-1">
                  New here? <a href="#" className="font-medium text-[hsl(var(--primary))] hover:underline">Create an account</a>
                </p>
              </form>
            </div>
          </div>

          {/* Footer note */}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            By continuing you agree to our <a href="#" className="underline hover:no-underline">Terms</a> and <a href="#" className="underline hover:no-underline">Privacy Policy</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

