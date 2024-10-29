"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Users, MousePointerClick, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Campaigns",
    value: "12",
    description: "Active campaigns this month",
    icon: Mail,
    trend: "+2.5%",
  },
  {
    title: "Total Subscribers",
    value: "24.4k",
    description: "Active subscribers",
    icon: Users,
    trend: "+12.3%",
  },
  {
    title: "Average Click Rate",
    value: "3.2%",
    description: "Last 30 days",
    icon: MousePointerClick,
    trend: "+0.5%",
  },
  {
    title: "Conversion Rate",
    value: "1.8%",
    description: "Last 30 days",
    icon: TrendingUp,
    trend: "+0.2%",
  },
];

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span className="text-green-500 mr-1">{stat.trend}</span>
                {stat.description}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}