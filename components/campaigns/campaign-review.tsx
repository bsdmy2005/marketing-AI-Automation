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
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

const formSchema = z.object({
  schedule: z.date({
    required_error: "Please select a date and time for your campaign.",
  }),
});

export default function CampaignReview({ data, onUpdate }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schedule: data.schedule || new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onUpdate({ ...data, ...values });
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Campaign Details</h3>
          <dl className="grid grid-cols-1 gap-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Name</dt>
              <dd className="text-sm mt-1">{data.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Description
              </dt>
              <dd className="text-sm mt-1">{data.description}</dd>
            </div>
          </dl>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Audience</h3>
          <dl className="grid grid-cols-1 gap-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Segment
              </dt>
              <dd className="text-sm mt-1">{data.segment}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Filters
              </dt>
              <dd className="text-sm mt-1">
                {data.filters?.length
                  ? data.filters.join(", ")
                  : "No filters applied"}
              </dd>
            </div>
          </dl>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Messages</h3>
          <div className="grid gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Variant A
              </h4>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-medium">{data.subjectA}</p>
                <p className="text-sm mt-2">{data.messageA}</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Variant B
              </h4>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-medium">{data.subjectB}</p>
                <p className="text-sm mt-2">{data.messageB}</p>
              </div>
            </div>
          </div>
        </Card>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Schedule</h3>
              <FormField
                control={form.control}
                name="schedule"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Send Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Choose when to send your campaign.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-4">
                Schedule Campaign
              </Button>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}