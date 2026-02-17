"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        setError(payload.message ?? "Unable to login.");
        return;
      }

      router.push("/home");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative grid min-h-screen grid-cols-1 gap-7 overflow-hidden p-5 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
      <div className="pointer-events-none absolute -left-[120px] -top-[120px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,143,93,0.35),rgba(255,143,93,0))] blur-lg animate-drift" />

      <section className="relative z-10 flex flex-col justify-center rounded-[28px] bg-gradient-to-br from-[#0d3b66] to-[#1d3557] px-[22px] py-7 text-[#f8fbff] shadow-[0_28px_60px_rgba(13,59,102,0.26)] lg:px-10 lg:py-[60px]">
        <p className="font-grotesk text-xs tracking-[0.12em] text-[#8ecae6]">NOVA DESK</p>
        <h1 className="font-grotesk mt-3 text-[clamp(1.6rem,7vw,2.4rem)] leading-[1.12] lg:text-[clamp(1.8rem,4vw,3rem)]">
          Manage your workspace from one clean dashboard
        </h1>
        <p className="mt-3 max-w-[42ch] leading-[1.65] text-[#d8e9f5]">
          Track projects, collaborate with your team, and move work forward with less friction.
        </p>
        <div className="mt-7 flex flex-wrap gap-2.5">
          <span className="rounded-full border border-white/25 px-3.5 py-2 text-[0.84rem] text-[#e6f4ff]">
            Productivity
          </span>
          <span className="rounded-full border border-white/25 px-3.5 py-2 text-[0.84rem] text-[#e6f4ff]">
            Security
          </span>
          <span className="rounded-full border border-white/25 px-3.5 py-2 text-[0.84rem] text-[#e6f4ff]">
            Automation
          </span>
        </div>
      </section>

      <section className="relative z-10 flex flex-col justify-center rounded-[28px] border border-[#0d3b661f] bg-white/75 px-[22px] py-7 backdrop-blur-md shadow-[0_24px_50px_rgba(13,59,102,0.14)] lg:px-[34px] lg:py-10">
        <div>
          <h2 className="font-grotesk text-[1.9rem] text-[#112f4e]">Welcome back</h2>
          <p className="mt-2 text-[#5f7185]">Sign in to continue</p>
        </div>

        <form className="mt-[26px] flex flex-col gap-[18px]" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2">
            <span className="text-[0.92rem] font-semibold text-[#2a3f57]">Email</span>
            <input
              type="email"
              placeholder="you@company.com"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="rounded-xl border border-[#c4d5e0] bg-[#fbfdff] px-3.5 py-[13px] text-[0.98rem] outline-none transition focus:border-[#0d3b66] focus:shadow-[0_0_0_4px_rgba(13,59,102,0.14)]"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[0.92rem] font-semibold text-[#2a3f57]">Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-xl border border-[#c4d5e0] bg-[#fbfdff] px-3.5 py-[13px] text-[0.98rem] outline-none transition focus:border-[#0d3b66] focus:shadow-[0_0_0_4px_rgba(13,59,102,0.14)]"
            />
          </label>

          <div className="flex items-center justify-between gap-3">
            <label className="inline-flex items-center gap-2 text-[0.92rem] text-[#516172]">
              <input type="checkbox" className="accent-[#0d3b66]" />
              <span>Remember me</span>
            </label>
            <Link href="#" className="font-semibold text-[#0d3b66] hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-0.5 rounded-xl bg-gradient-to-br from-[#ff8f5d] to-[#eb5e28] px-3.5 py-[13px] text-[0.98rem] font-bold text-white transition hover:-translate-y-px hover:shadow-[0_14px_26px_rgba(235,94,40,0.34)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
          {error ? <p className="text-center text-sm font-medium text-red-600">{error}</p> : null}

          <p className="mt-1 text-center text-[0.93rem] text-[#5f7185]">
            New here?{" "}
            <Link href="/create-account" className="font-semibold text-[#0d3b66] hover:underline">
              Create an account
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
