"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  title: string;
  description: string;
}

interface StepsProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function Steps({ steps, currentStep, className }: StepsProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="relative flex justify-between">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className={cn(
              "flex flex-col items-center",
              index === steps.length - 1 ? "flex-1" : "flex-1"
            )}
          >
            <div className="flex items-center justify-center relative">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2",
                  index < currentStep
                    ? "bg-primary border-primary"
                    : index === currentStep
                    ? "border-primary"
                    : "border-muted"
                )}
              >
                {index < currentStep ? (
                  <Check className="h-4 w-4 text-primary-foreground" />
                ) : (
                  <span
                    className={cn(
                      "text-sm font-medium",
                      index === currentStep ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {index + 1}
                  </span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute left-[50%] w-full h-[2px]",
                    index < currentStep ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
            <div className="text-center mt-2">
              <div
                className={cn(
                  "text-sm font-medium",
                  index <= currentStep ? "text-primary" : "text-muted-foreground"
                )}
              >
                {step.title}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {step.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}