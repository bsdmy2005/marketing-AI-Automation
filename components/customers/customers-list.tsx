"use client";

import { useEffect, useState } from "react";
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
import { CustomerProfile } from "@/lib/mock-data";
import { mockCustomers } from "@/lib/mock-data";
import { format } from "date-fns";
import Link from "next/link";
import { ExternalLink, Activity, Monitor, Smartphone, Laptop, Tablet2 } from "lucide-react";

const getDeviceIcon = (type: string) => {
  switch (type) {
    case "Smart TV":
      return <Monitor className="h-4 w-4" />;
    case "Mobile":
      return <Smartphone className="h-4 w-4" />;
    case "Tablet":
      return <Tablet2 className="h-4 w-4" />;
    default:
      return <Laptop className="h-4 w-4" />;
  }
};

export function CustomersList() {
  const [customers, setCustomers] = useState<CustomerProfile[]>([]);

  useEffect(() => {
    setCustomers(mockCustomers.slice(0, 10));
  }, []);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Subscription</TableHead>
            <TableHead>Devices</TableHead>
            <TableHead>Engagement</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{customer.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {customer.email}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    customer.subscription.status === "Active"
                      ? "default"
                      : customer.subscription.status === "Suspended"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {customer.subscription.plan}
                </Badge>
                <div className="text-sm text-muted-foreground mt-1">
                  Since {format(new Date(customer.subscription.startDate), "MMM yyyy")}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {customer.devices.map((device, idx) => (
                    <div
                      key={idx}
                      className="tooltip"
                      data-tip={`${device.type} - ${device.usage}% usage`}
                    >
                      {getDeviceIcon(device.type)}
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div className="w-full">
                    <div className="text-sm font-medium">
                      {(customer.viewingHabits.completionRate * 100).toFixed(0)}% completion
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {customer.viewingHabits.avgWatchTimeDaily}h daily average
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-sm">{customer.location.city}</span>
                  <span className="text-sm text-muted-foreground">
                    {customer.location.country}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/customers/${customer.id}`}>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}