import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardHeader from "../../components/dashboard-header";
import { normalizeEmail, readUsers } from "../../lib/user-store";

const services = [
  {
    title: "Workflow Automation",
    description: "Build rule-based automations to reduce repetitive manual operations.",
  },
  {
    title: "Team Analytics",
    description: "Track delivery speed, bottlenecks, and sprint trends with live metrics.",
  },
  {
    title: "Access Management",
    description: "Control user roles and project visibility across your organization.",
  },
];

export default async function ServicesPage() {
  const cookieStore = await cookies();
  const userEmail = cookieStore.get("auth_user")?.value;

  if (!userEmail) {
    redirect("/login");
  }

  const users = await readUsers();
  const user = users.find((item) => item.email === normalizeEmail(userEmail));

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_8%_8%,#dceeff_0%,#f4f8fb_34%,#f5efe7_100%)] p-5 lg:p-8">
      <section className="mx-auto w-full max-w-6xl rounded-[28px] border border-[#0d3b661f] bg-white/80 p-6 shadow-[0_24px_50px_rgba(13,59,102,0.14)] backdrop-blur-md lg:p-10">
        <DashboardHeader activeTab="services" />

        <div className="mt-6">
          <p className="font-grotesk text-xs tracking-[0.12em] text-[#0d3b66]">SERVICES</p>
          <h1 className="mt-2 font-grotesk text-3xl text-[#112f4e]">Services for {user.name}</h1>
          <p className="mt-3 max-w-3xl text-[#5f7185]">
            Choose a service module to optimize operations, visibility, and delivery quality.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="rounded-2xl border border-[#0d3b661f] bg-white p-5">
              <h2 className="font-grotesk text-lg text-[#112f4e]">{service.title}</h2>
              <p className="mt-2 text-sm text-[#5f7185]">{service.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
