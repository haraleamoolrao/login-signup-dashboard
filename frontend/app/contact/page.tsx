import DashboardHeader from "../../components/dashboard-header";
import { requireSessionUser } from "../../lib/auth-session";

const contacts = [
  { team: "Support", email: "support@nova.app", phone: "+1 (800) 555-0142" },
  { team: "Sales", email: "sales@nova.app", phone: "+1 (800) 555-0169" },
  { team: "Partnerships", email: "partners@nova.app", phone: "+1 (800) 555-0191" },
];

export default async function ContactPage() {
  const user = await requireSessionUser();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_8%_8%,#dceeff_0%,#f4f8fb_34%,#f5efe7_100%)] p-5 lg:p-8">
      <section className="mx-auto w-full max-w-6xl rounded-[28px] border border-[#0d3b661f] bg-white/80 p-6 shadow-[0_24px_50px_rgba(13,59,102,0.14)] backdrop-blur-md lg:p-10">
        <DashboardHeader activeTab="contact" />

        <div className="mt-6">
          <p className="font-grotesk text-xs tracking-[0.12em] text-[#0d3b66]">CONTACT</p>
          <h1 className="mt-2 font-grotesk text-3xl text-[#112f4e]">Contact our team</h1>
          <p className="mt-3 max-w-3xl text-[#5f7185]">
            Reach out anytime. We will respond to {user.email} with updates and next steps.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {contacts.map((item) => (
            <article key={item.team} className="rounded-2xl border border-[#0d3b661f] bg-white p-5">
              <h2 className="font-grotesk text-lg text-[#112f4e]">{item.team}</h2>
              <p className="mt-2 text-sm text-[#5f7185]">{item.email}</p>
              <p className="mt-1 text-sm font-semibold text-[#0d3b66]">{item.phone}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
