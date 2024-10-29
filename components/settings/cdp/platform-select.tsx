"use client";

import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

const platforms = [
  {
    id: "segment",
    name: "Segment",
    description: "Connect with Segment's unified customer data platform",
    logo: "https://cdn.worldvectorlogo.com/logos/segment.svg",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Integrate with Salesforce Customer 360 platform",
    logo: "https://cdn.worldvectorlogo.com/logos/salesforce-2.svg",
  },
];

export function CDPPlatformSelect({ value, onChange }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Select CDP Platform</h3>
        <p className="text-sm text-muted-foreground">
          Choose the Customer Data Platform you want to integrate with.
        </p>
      </div>

      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {platforms.map((platform) => (
          <Label
            key={platform.id}
            className="cursor-pointer"
            htmlFor={platform.id}
          >
            <Card
              className={`relative p-6 hover:border-primary ${
                value === platform.id ? "border-primary" : ""
              }`}
            >
              {value === platform.id && (
                <div className="absolute top-4 right-4">
                  <Check className="h-5 w-5 text-primary" />
                </div>
              )}
              <div className="flex items-center space-x-4">
                <img
                  src={platform.logo}
                  alt={platform.name}
                  className="h-8 w-8"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{platform.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {platform.description}
                  </p>
                </div>
                <RadioGroupItem
                  value={platform.id}
                  id={platform.id}
                  className="sr-only"
                />
              </div>
            </Card>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}