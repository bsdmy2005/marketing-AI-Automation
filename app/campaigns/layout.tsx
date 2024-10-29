import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campaigns | Marketing Platform",
  description: "Manage your marketing campaigns",
};

export default function CampaignsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto py-6">
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Campaigns</h2>
        </div>
        {children}
      </div>
    </div>
  );
}