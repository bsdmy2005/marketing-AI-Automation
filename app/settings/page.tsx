import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { GeneralSettingsForm } from "@/components/settings/general-settings-form";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings and preferences.",
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <Separator />
      <GeneralSettingsForm />
    </div>
  );
}