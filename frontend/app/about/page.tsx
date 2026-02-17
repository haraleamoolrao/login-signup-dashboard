import DashboardHeader from "../../components/dashboard-header";
import { requireSessionUser } from "../../lib/auth-session";

const highlights = [
  { label: "Active Users", value: "2,340" },
  { label: "Projects Delivered", value: "186" },
  { label: "Avg. Response Time", value: "12 min" },
];

export default async function AboutPage() {
  const user = await requireSessionUser();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_8%_8%,#dceeff_0%,#f4f8fb_34%,#f5efe7_100%)] p-5 lg:p-8">
      <section className="mx-auto w-full max-w-6xl rounded-[28px] border border-[#0d3b661f] bg-white/80 p-6 shadow-[0_24px_50px_rgba(13,59,102,0.14)] backdrop-blur-md lg:p-10">
        <DashboardHeader activeTab="about" />

        <div className="mt-6">
          <p className="font-grotesk text-xs tracking-[0.12em] text-[#0d3b66]">ABOUT US</p>
          <h1 className="mt-2 font-grotesk text-3xl text-[#112f4e]">Hi {user.name}, this is who we are</h1>
          <p className="mt-3 max-w-3xl text-[#5f7185]">
            NOVA helps teams manage work, automate routine tasks, and keep collaboration transparent
            across departments.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <article key={item.label} className="rounded-2xl border border-[#0d3b661f] bg-white p-5">
              <h2 className="font-grotesk text-lg text-[#112f4e]">{item.label}</h2>
              <p className="mt-2 text-3xl font-bold text-[#0d3b66]">{item.value}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
