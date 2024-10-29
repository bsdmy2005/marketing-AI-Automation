"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const recentCampaigns = [
  {
    name: "Summer Sale Newsletter",
    status: "Active",
    sent: "2.4k",
    openRate: "45%",
    date: "2024-01-15",
  },
  {
    name: "Product Launch",
    status: "Scheduled",
    sent: "-",
    openRate: "-",
    date: "2024-01-20",
  },
  {
    name: "Weekly Newsletter",
    status: "Draft",
    sent: "-",
    openRate: "-",
    date: "2024-01-22",
  },
];

export function RecentCampaigns() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Recent Campaigns</CardTitle>
        <CardDescription>Your latest campaign activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentCampaigns.map((campaign, index) => (
            <Link
              key={index}
              href={`/campaigns/${index}`}
              className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">{campaign.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {campaign.date}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge
                  variant={
                    campaign.status === "Active"
                      ? "default"
                      : campaign.status === "Scheduled"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {campaign.status}
                </Badge>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}