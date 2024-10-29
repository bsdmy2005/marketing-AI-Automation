import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { RecentCampaigns } from "@/components/dashboard/recent-campaigns";
import { CampaignPerformance } from "@/components/dashboard/campaign-performance";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <DashboardHeader />
      <DashboardStats />
      <div className="grid gap-8 md:grid-cols-2">
        <RecentCampaigns />
        <CampaignPerformance />
      </div>
    </div>
  );
}