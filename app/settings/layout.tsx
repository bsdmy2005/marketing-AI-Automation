import { Metadata } from "next";
import { SidebarNav } from "@/components/settings/sidebar-nav";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account and integration settings.",
};

const sidebarNavItems = [
  {
    title: "General",
    href: "/settings",
  },
  {
    title: "CDP Integration",
    href: "/settings/cdp",
  },
  {
    title: "API Keys",
    href: "/settings/api-keys",
  },
  {
    title: "Team",
    href: "/settings/team",
  },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] py-8">
      <aside className="hidden w-[200px] flex-col md:flex">
        <SidebarNav items={sidebarNavItems} />
      </aside>
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}