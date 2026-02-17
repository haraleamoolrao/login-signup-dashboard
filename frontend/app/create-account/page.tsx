"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export default function CreateAccountPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        setError(payload.message ?? "Unable to create account.");
        return;
      }

      setShowSuccessPopup(true);
      setTimeout(() => {
        router.push("/login");
        router.refresh();
      }, 1400);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative grid h-screen grid-cols-1 gap-4 overflow-hidden p-4 lg:grid-cols-[0.95fr_1.05fr] lg:gap-5 lg:p-5">
      {showSuccessPopup ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-5">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
            <h2 className="font-grotesk text-2xl text-[#112f4e]">Account created</h2>
            <p className="mt-2 text-sm text-[#5f7185]">
              Your account was created successfully. Redirecting to login...
            </p>
            <button
              type="button"
              onClick={() => {
                router.push("/login");
                router.refresh();
              }}
              className="mt-5 rounded-xl bg-gradient-to-br from-[#0d3b66] to-[#1d3557] px-4 py-2.5 text-sm font-semibold text-white"
            >
              Go to login
            </button>
          </div>
        </div>
      ) : null}

      <div className="pointer-events-none absolute -right-[120px] -top-[110px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(13,59,102,0.18),rgba(13,59,102,0))] blur-lg animate-drift" />

      <section className="relative z-10 flex h-full flex-col justify-center rounded-[28px] border border-[#0d3b661f] bg-white/75 px-5 py-4 backdrop-blur-md shadow-[0_24px_50px_rgba(13,59,102,0.14)] lg:px-7 lg:py-5">
        <div>
          <h1 className="font-grotesk text-[1.65rem] text-[#112f4e]">Create account</h1>
          <p className="mt-1 text-sm text-[#5f7185]">Start your workspace in under a minute</p>
        </div>

        <form className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-[#2a3f57]">Full name</span>
            <input
              type="text"
              placeholder="John Carter"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="rounded-xl border border-[#c4d5e0] bg-[#fbfdff] px-3 py-2.5 text-sm outline-none transition focus:border-[#0d3b66] focus:shadow-[0_0_0_4px_rgba(13,59,102,0.14)]"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-[#2a3f57]">Email</span>
            <input
              type="email"
              placeholder="you@company.com"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="rounded-xl border border-[#c4d5e0] bg-[#fbfdff] px-3 py-2.5 text-sm outline-none transition focus:border-[#0d3b66] focus:shadow-[0_0_0_4px_rgba(13,59,102,0.14)]"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-[#2a3f57]">Password</span>
            <input
              type="password"
              placeholder="Create a strong password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-xl border border-[#c4d5e0] bg-[#fbfdff] px-3 py-2.5 text-sm outline-none transition focus:border-[#0d3b66] focus:shadow-[0_0_0_4px_rgba(13,59,102,0.14)]"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-[#2a3f57]">Confirm password</span>
            <input
              type="password"
              placeholder="Repeat your password"
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="rounded-xl border border-[#c4d5e0] bg-[#fbfdff] px-3 py-2.5 text-sm outline-none transition focus:border-[#0d3b66] focus:shadow-[0_0_0_4px_rgba(13,59,102,0.14)]"
            />
          </label>

          <label className="inline-flex items-start gap-2 text-xs text-[#516172] lg:col-span-2">
            <input type="checkbox" required className="mt-1 accent-[#0d3b66]" />
            <span>
              I agree to the{" "}
              <Link href="#" className="font-semibold text-[#0d3b66] hover:underline">
                terms
              </Link>{" "}
              and{" "}
              <Link href="#" className="font-semibold text-[#0d3b66] hover:underline">
                privacy policy
              </Link>
              .
            </span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-0.5 rounded-xl bg-gradient-to-br from-[#0d3b66] to-[#1d3557] px-3.5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-px hover:shadow-[0_14px_26px_rgba(13,59,102,0.3)] disabled:cursor-not-allowed disabled:opacity-70 lg:col-span-2"
          >
            {isSubmitting ? "Creating..." : "Create account"}
          </button>
          {error ? (
            <p className="text-center text-sm font-medium text-red-600 lg:col-span-2">{error}</p>
          ) : null}

          <p className="text-center text-sm text-[#5f7185] lg:col-span-2">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[#0d3b66] hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </section>

      <section className="relative z-10 flex h-full flex-col justify-center rounded-[28px] bg-gradient-to-br from-[#eb5e28] to-[#ff8f5d] px-5 py-4 text-[#fff8f4] shadow-[0_28px_60px_rgba(235,94,40,0.28)] lg:px-8 lg:py-5">
        <p className="font-grotesk text-xs tracking-[0.12em] text-[#ffe3d7]">JOIN NOVA DESK</p>
        <h2 className="font-grotesk mt-2 text-[clamp(1.35rem,3vw,2.2rem)] leading-[1.12]">
          Build faster with a workspace your team enjoys using
        </h2>
        <p className="mt-2 max-w-[42ch] text-sm leading-[1.5] text-[#fff0e7]">
          Create tasks, assign owners, and track progress in one place with clear visibility at every step.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/35 px-3 py-1.5 text-xs text-[#fff4ef]">
            Team boards
          </span>
          <span className="rounded-full border border-white/35 px-3 py-1.5 text-xs text-[#fff4ef]">
            Smart reports
          </span>
          <span className="rounded-full border border-white/35 px-3 py-1.5 text-xs text-[#fff4ef]">
            Workflow rules
          </span>
        </div>
      </section>
    </main>
  );
}
