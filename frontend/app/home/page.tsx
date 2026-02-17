import DashboardHeader from "../../components/dashboard-header";
import { requireSessionUser } from "../../lib/auth-session";

export default async function HomePage() {
  const user = await requireSessionUser();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_8%_8%,#dceeff_0%,#f4f8fb_34%,#f5efe7_100%)] p-5 lg:p-8">
      <section className="mx-auto w-full max-w-6xl rounded-[28px] border border-[#0d3b661f] bg-white/80 p-6 shadow-[0_24px_50px_rgba(13,59,102,0.14)] backdrop-blur-md lg:p-10">
        <DashboardHeader activeTab="home" />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-grotesk text-xs tracking-[0.12em] text-[#0d3b66]">NOVA DASHBOARD</p>
            <h1 className="mt-2 font-grotesk text-3xl text-[#112f4e]">
              Welcome, {user.name}
            </h1>
            <p className="mt-2 text-[#5f7185]">You are logged in with {user.email}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-[#0d3b661f] bg-white p-5">
            <h2 className="font-grotesk text-lg text-[#112f4e]">Open Tasks</h2>
            <p className="mt-2 text-3xl font-bold text-[#0d3b66]">14</p>
            <p className="mt-1 text-sm text-[#5f7185]">3 high priority items</p>
          </article>
          <article className="rounded-2xl border border-[#0d3b661f] bg-white p-5">
            <h2 className="font-grotesk text-lg text-[#112f4e]">Team Progress</h2>
            <p className="mt-2 text-3xl font-bold text-[#0d3b66]">78%</p>
            <p className="mt-1 text-sm text-[#5f7185]">Sprint completion status</p>
          </article>
          <article className="rounded-2xl border border-[#0d3b661f] bg-white p-5">
            <h2 className="font-grotesk text-lg text-[#112f4e]">Automations</h2>
            <p className="mt-2 text-3xl font-bold text-[#0d3b66]">6</p>
            <p className="mt-1 text-sm text-[#5f7185]">Running workflow rules</p>
          </article>
        </div>
      </section>
    </main>
  );
}
