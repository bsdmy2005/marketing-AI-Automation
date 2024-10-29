"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Steps } from "@/components/ui/steps";
import { CDPPlatformSelect } from "@/components/settings/cdp/platform-select";
import { CDPCredentials } from "@/components/settings/cdp/credentials";
import { CDPFieldMapping } from "@/components/settings/cdp/field-mapping";
import { CDPDataPreview } from "@/components/settings/cdp/data-preview";
import { CDPSummary } from "@/components/settings/cdp/summary";

const steps = [
  { title: "Select Platform", description: "Choose your CDP provider" },
  { title: "Connect", description: "Enter your credentials" },
  { title: "Map Fields", description: "Configure data mapping" },
  { title: "Preview", description: "Verify data flow" },
  { title: "Review", description: "Confirm settings" },
];

export default function CDPIntegrationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [config, setConfig] = useState({
    platform: "",
    credentials: {
      apiKey: "",
      apiSecret: "",
      region: "",
    },
    mappings: [],
    syncOptions: {
      contacts: true,
      events: true,
      segments: true,
    },
  });

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleComplete = async () => {
    // Save integration configuration
    console.log("Integration configured:", config);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">CDP Integration</h2>
        <p className="text-muted-foreground">
          Connect your Customer Data Platform to synchronize customer data.
        </p>
      </div>

      <Steps steps={steps} currentStep={currentStep} className="mb-8" />

      <Card className="p-6">
        {currentStep === 0 && (
          <CDPPlatformSelect
            value={config.platform}
            onChange={(platform) => setConfig({ ...config, platform })}
          />
        )}
        {currentStep === 1 && (
          <CDPCredentials
            platform={config.platform}
            credentials={config.credentials}
            onChange={(credentials) => setConfig({ ...config, credentials })}
          />
        )}
        {currentStep === 2 && (
          <CDPFieldMapping
            platform={config.platform}
            mappings={config.mappings}
            onChange={(mappings) => setConfig({ ...config, mappings })}
          />
        )}
        {currentStep === 3 && (
          <CDPDataPreview
            config={config}
            onUpdateSync={(syncOptions) =>
              setConfig({ ...config, syncOptions })
            }
          />
        )}
        {currentStep === 4 && <CDPSummary config={config} />}

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleComplete}>Activate Integration</Button>
          )}
        </div>
      </Card>
    </div>
  );
}