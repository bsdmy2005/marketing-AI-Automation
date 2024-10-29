import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CampaignsList } from "../../components/campaigns/campaigns-list";
import { Plus } from "lucide-react";

export default function CampaignsPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="space-y-1">
          <h3 className="text-2xl font-medium">All Campaigns</h3>
          <p className="text-sm text-muted-foreground">
            Manage and monitor your marketing campaigns
          </p>
        </div>
        <Link href="/campaigns/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
        </Link>
      </div>
      <CampaignsList />
    </div>
  );
}