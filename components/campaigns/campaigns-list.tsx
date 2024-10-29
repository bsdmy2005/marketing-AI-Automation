"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2, BarChart2 } from "lucide-react";
import { format } from "date-fns";

// This will be replaced with actual data from your API
const campaigns = [
  {
    id: 1,
    name: "Summer Sale 2024",
    status: "scheduled",
    audience: "All Subscribers",
    sentAt: new Date("2024-06-01"),
    opens: 1250,
    clicks: 420,
  },
  {
    id: 2,
    name: "Welcome Series",
    status: "active",
    audience: "New Customers",
    sentAt: new Date("2024-03-15"),
    opens: 890,
    clicks: 234,
  },
  {
    id: 3,
    name: "Re-engagement Campaign",
    status: "draft",
    audience: "Inactive Customers",
    sentAt: null,
    opens: 0,
    clicks: 0,
  },
];

const statusColors = {
  draft: "bg-gray-500",
  scheduled: "bg-blue-500",
  active: "bg-green-500",
  completed: "bg-purple-500",
  failed: "bg-red-500",
};

export function CampaignsList() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Audience</TableHead>
            <TableHead>Sent</TableHead>
            <TableHead className="text-right">Opens</TableHead>
            <TableHead className="text-right">Clicks</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell className="font-medium">{campaign.name}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={`${statusColors[campaign.status]} text-white`}
                >
                  {campaign.status.charAt(0).toUpperCase() +
                    campaign.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{campaign.audience}</TableCell>
              <TableCell>
                {campaign.sentAt
                  ? format(campaign.sentAt, "MMM d, yyyy")
                  : "Not sent"}
              </TableCell>
              <TableCell className="text-right">{campaign.opens}</TableCell>
              <TableCell className="text-right">{campaign.clicks}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <BarChart2 className="mr-2 h-4 w-4" />
                      View Analytics
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}