"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CampaignDetailsForm from "@/components/campaigns/campaign-details-form";
import AudienceSelection from "@/components/campaigns/audience-selection";
import MessageCreation from "@/components/campaigns/message-creation";
import CampaignReview from "@/components/campaigns/campaign-review";
import { Steps } from "@/components/ui/steps";

const steps = [
  { title: "Campaign Details", description: "Name and describe your campaign" },
  { title: "Audience", description: "Select your target audience" },
  { title: "Message", description: "Create your campaign message" },
  { title: "Review", description: "Review and schedule" },
];

export default function CreateCampaignPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [campaignData, setCampaignData] = useState({
    name: "",
    description: "",
    audience: [],
    messageA: "",
    messageB: "",
    schedule: null,
  });

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleComplete = async () => {
    // Save campaign logic will be implemented here
    router.push("/campaigns");
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Create Campaign</h2>
        <p className="text-muted-foreground">
          Create a new marketing campaign in just a few steps.
        </p>
      </div>

      <Steps steps={steps} currentStep={currentStep} className="mb-8" />

      <Card className="p-6">
        {currentStep === 0 && (
          <CampaignDetailsForm
            data={campaignData}
            onUpdate={setCampaignData}
          />
        )}
        {currentStep === 1 && (
          <AudienceSelection
            data={campaignData}
            onUpdate={setCampaignData}
          />
        )}
        {currentStep === 2 && (
          <MessageCreation
            data={campaignData}
            onUpdate={setCampaignData}
          />
        )}
        {currentStep === 3 && (
          <CampaignReview
            data={campaignData}
            onUpdate={setCampaignData}
          />
        )}

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
            <Button onClick={handleComplete}>Create Campaign</Button>
          )}
        </div>
      </Card>
    </div>
  );
}