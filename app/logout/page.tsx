"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export default function LogoutPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include"
      });
      if (!response.ok) {
        setError("Unable to logout. Please try again.");
        return;
      }

      router.push("/login");
      router.refresh();
    } catch {
      setError("Unable to logout. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_15%_15%,#f6d6c0_0%,#f5efe7_35%,#f2f7fa_100%)] p-5">
      <section className="w-full max-w-md rounded-[28px] border border-[#0d3b661f] bg-white/80 p-7 shadow-[0_24px_50px_rgba(13,59,102,0.14)] backdrop-blur-md">
        <h1 className="font-grotesk text-2xl text-[#112f4e]">Logout</h1>
        <p className="mt-2 text-[#5f7185]">Click below to securely end your current session.</p>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isSubmitting}
          className="mt-6 w-full rounded-xl bg-gradient-to-br from-[#eb5e28] to-[#ff8f5d] px-4 py-3 text-sm font-bold text-white transition hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Logging out..." : "Logout now"}
        </button>

        {error ? <p className="mt-3 text-center text-sm font-medium text-red-600">{error}</p> : null}

        <p className="mt-5 text-center text-sm text-[#5f7185]">
          Changed your mind?{" "}
          <Link href="/home" className="font-semibold text-[#0d3b66] hover:underline">
            Return to dashboard
          </Link>
        </p>
      </section>
    </main>
  );
}
