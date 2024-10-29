"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "Jan 10", opens: 2400, clicks: 1200 },
  { date: "Jan 11", opens: 1398, clicks: 900 },
  { date: "Jan 12", opens: 9800, clicks: 2800 },
  { date: "Jan 13", opens: 3908, clicks: 1800 },
  { date: "Jan 14", opens: 4800, clicks: 2200 },
  { date: "Jan 15", opens: 3800, clicks: 1700 },
  { date: "Jan 16", opens: 4300, clicks: 2100 },
];

export function CampaignPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Campaign Performance
        </CardTitle>
        <CardDescription>
          Email opens and clicks over the last 7 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="opens"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="hsl(var(--secondary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}