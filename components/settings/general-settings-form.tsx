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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const generalFormSchema = z.object({
  organizationName: z
    .string()
    .min(2, {
      message: "Organization name must be at least 2 characters.",
    })
    .max(30, {
      message: "Organization name must not be longer than 30 characters.",
    }),
  organizationEmail: z
    .string()
    .min(1, { message: "Organization email is required" })
    .email("This is not a valid email"),
  description: z.string().max(160).min(4),
  timezone: z.string({
    required_error: "Please select a timezone.",
  }),
});

type GeneralFormValues = z.infer<typeof generalFormSchema>;

const defaultValues: Partial<GeneralFormValues> = {
  organizationName: "Acme Inc",
  organizationEmail: "hello@acme.com",
  description: "AI-powered marketing automation platform",
  timezone: "UTC",
};

export function GeneralSettingsForm() {
  const form = useForm<GeneralFormValues>({
    resolver: zodResolver(generalFormSchema),
    defaultValues,
  });

  function onSubmit(data: GeneralFormValues) {
    toast.success("Settings updated successfully");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="organizationName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc" {...field} />
              </FormControl>
              <FormDescription>
                This is your organization&apos;s display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="organizationEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Email</FormLabel>
              <FormControl>
                <Input placeholder="hello@acme.com" {...field} />
              </FormControl>
              <FormDescription>
                This email will be used for important notifications.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief description of your organization"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This will be displayed on your organization&apos;s profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save changes</Button>
      </form>
    </Form>
  );
}