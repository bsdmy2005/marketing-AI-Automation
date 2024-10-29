"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

const regions = [
  { value: "us-east-1", label: "US East (N. Virginia)" },
  { value: "us-west-2", label: "US West (Oregon)" },
  { value: "eu-west-1", label: "EU (Ireland)" },
  { value: "ap-southeast-1", label: "Asia Pacific (Singapore)" },
];

export function CDPCredentials({ platform, credentials, onChange }) {
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState<
    null | "success" | "error"
  >(null);

  const validateCredentials = async () => {
    setIsValidating(true);
    // Simulate API validation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setValidationStatus("success");
    setIsValidating(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Connect to {platform}</h3>
        <p className="text-sm text-muted-foreground">
          Enter your {platform} credentials to establish the connection.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="apiKey">API Key</Label>
          <Input
            id="apiKey"
            type="password"
            value={credentials.apiKey}
            onChange={(e) =>
              onChange({ ...credentials, apiKey: e.target.value })
            }
            placeholder="Enter your API key"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="apiSecret">API Secret</Label>
          <Input
            id="apiSecret"
            type="password"
            value={credentials.apiSecret}
            onChange={(e) =>
              onChange({ ...credentials, apiSecret: e.target.value })
            }
            placeholder="Enter your API secret"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="region">Region</Label>
          <Select
            value={credentials.region}
            onValueChange={(value) =>
              onChange({ ...credentials, region: value })
            }
          >
            <SelectTrigger id="region">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region.value} value={region.value}>
                  {region.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={validateCredentials}
          disabled={isValidating}
          className="w-full"
        >
          {isValidating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Validating
            </>
          ) : (
            "Validate Connection"
          )}
        </Button>

        {validationStatus && (
          <Alert
            variant={validationStatus === "success" ? "default" : "destructive"}
          >
            {validationStatus === "success" ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            <AlertDescription>
              {validationStatus === "success"
                ? "Connection successful! Your credentials are valid."
                : "Connection failed. Please check your credentials and try again."}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}