"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  segment: z.string(),
  filters: z.array(z.string()),
});

const segments = [
  { value: "all", label: "All Subscribers" },
  { value: "new", label: "New Customers" },
  { value: "returning", label: "Returning Customers" },
  { value: "inactive", label: "Inactive Customers" },
];

const filters = [
  { id: "purchased_last_30", label: "Purchased in last 30 days" },
  { id: "opened_last_email", label: "Opened last email" },
  { id: "clicked_last_email", label: "Clicked in last email" },
];

export default function AudienceSelection({ data, onUpdate }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      segment: data.segment || "all",
      filters: data.filters || [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onUpdate({ ...data, ...values });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="segment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Audience Segment</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a segment" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {segments.map((segment) => (
                    <SelectItem key={segment.value} value={segment.value}>
                      {segment.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the main segment for your campaign.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="filters"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Additional Filters</FormLabel>
                <FormDescription>
                  Refine your audience with additional criteria.
                </FormDescription>
              </div>
              {filters.map((filter) => (
                <FormField
                  key={filter.id}
                  control={form.control}
                  name="filters"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={filter.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(filter.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, filter.id])
                                : field.onChange(
                                    field.value?.filter((value) => value !== filter.id)
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {filter.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Audience</Button>
      </form>
    </Form>
  );
}