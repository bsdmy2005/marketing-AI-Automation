import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to Wavelength! Here's an overview of your marketing performance.
        </p>
      </div>
      <Link href="/campaigns/create">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </Link>
    </div>
  );
}