"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function CustomerSearch() {
  return (
    <div className="flex gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, email, or location..."
          className="pl-9"
        />
      </div>
      <Select defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Subscription" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Plans</SelectItem>
          <SelectItem value="premium">Premium</SelectItem>
          <SelectItem value="compact_plus">Compact Plus</SelectItem>
          <SelectItem value="compact">Compact</SelectItem>
          <SelectItem value="family">Family</SelectItem>
        </SelectContent>
      </Select>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>View Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked>
            Active Subscribers
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Suspended</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Cancelled</DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Sort By</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked>
            Recent Activity
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Watch Time</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Subscription Date</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button>Search</Button>
    </div>
  );
}