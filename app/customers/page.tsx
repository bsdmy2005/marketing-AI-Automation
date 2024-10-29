import { CustomersList } from "@/components/customers/customers-list";
import { CustomerSearch } from "@/components/customers/customer-search";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers | PulseFlow",
  description: "View and manage your customer profiles",
};

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Customer Profiles</h1>
        <p className="text-muted-foreground">
          View and manage detailed customer data across all channels
        </p>
      </div>
      <CustomerSearch />
      <CustomersList />
    </div>
  );
}