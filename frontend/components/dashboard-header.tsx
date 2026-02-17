import Link from "next/link";

type HeaderTab = "about" | "services" | "contact" | "home";

type DashboardHeaderProps = {
  activeTab?: HeaderTab;
};

const baseLinkClass =
  "rounded-lg px-3 py-2 text-sm font-semibold text-[#0d3b66] transition hover:bg-[#0d3b6612]";

function getLinkClass(isActive: boolean) {
  if (!isActive) {
    return baseLinkClass;
  }

  return `${baseLinkClass} bg-[#0d3b6614]`;
}

export default function DashboardHeader({ activeTab = "home" }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-[#0d3b661f] pb-5 sm:flex-row sm:items-center sm:justify-between">
      <Link href="/home" className="font-grotesk text-lg font-bold tracking-[0.08em] text-[#0d3b66]">
        NOVA
      </Link>
      <nav className="flex flex-wrap items-center gap-2 sm:gap-3">
        <Link href="/about" className={getLinkClass(activeTab === "about")}>
          About
        </Link>
        <Link href="/services" className={getLinkClass(activeTab === "services")}>
          Services
        </Link>
        <Link href="/contact" className={getLinkClass(activeTab === "contact")}>
          Contact
        </Link>
        <Link
          href="/logout"
          className="rounded-xl bg-gradient-to-br from-[#eb5e28] to-[#ff8f5d] px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-px"
        >
          Logout
        </Link>
      </nav>
    </header>
  );
}
