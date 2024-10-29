"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wand2 } from "lucide-react";

const formSchema = z.object({
  subjectA: z.string().min(2, {
    message: "Subject line must be at least 2 characters.",
  }),
  messageA: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  subjectB: z.string().min(2, {
    message: "Subject line must be at least 2 characters.",
  }),
  messageB: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  tone: z.string(),
});

const tones = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "casual", label: "Casual" },
  { value: "formal", label: "Formal" },
  { value: "urgent", label: "Urgent" },
];

export default function MessageCreation({ data, onUpdate }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subjectA: data.subjectA || "",
      messageA: data.messageA || "",
      subjectB: data.subjectB || "",
      messageB: data.messageB || "",
      tone: data.tone || "professional",
    },
  });

  async function generateMessage(variant: "A" | "B") {
    setIsGenerating(true);
    // OpenAI integration will be implemented here
    setTimeout(() => {
      const generated = {
        subject: "🌟 Special Offer Just for You!",
        message: "We're excited to bring you our latest collection...",
      };
      form.setValue(`subject${variant}`, generated.subject);
      form.setValue(`message${variant}`, generated.message);
      setIsGenerating(false);
    }, 1000);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    onUpdate({ ...data, ...values });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="tone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message Tone</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tone" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {tones.map((tone) => (
                    <SelectItem key={tone.value} value={tone.value}>
                      {tone.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the tone for your message variants.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Tabs defaultValue="variantA" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="variantA">Variant A</TabsTrigger>
            <TabsTrigger value="variantB">Variant B</TabsTrigger>
          </TabsList>
          <TabsContent value="variantA">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Message Variant A</h3>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => generateMessage("A")}
                  disabled={isGenerating}
                >
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate
                </Button>
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="subjectA"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject Line</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="messageA"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message Content</FormLabel>
                      <FormControl>
                        <Textarea rows={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="variantB">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Message Variant B</h3>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => generateMessage("B")}
                  disabled={isGenerating}
                >
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate
                </Button>
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="subjectB"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject Line</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="messageB"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message Content</FormLabel>
                      <FormControl>
                        <Textarea rows={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <Button type="submit">Save Messages</Button>
      </form>
    </Form>
  );
}