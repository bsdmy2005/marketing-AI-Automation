"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

export function CDPSummary({ config }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Integration Summary</h3>
        <p className="text-sm text-muted-foreground">
          Review your integration configuration before activation.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Details</CardTitle>
            <CardDescription>Connected platform information</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4 text-sm">
              <div>
                <dt className="font-medium">Platform</dt>
                <dd className="text-muted-foreground">{config.platform}</dd>
              </div>
              <div>
                <dt className="font-medium">Region</dt>
                <dd className="text-muted-foreground">
                  {config.credentials.region}
                </dd>
              </div>
              <div>
                <dt className="font-medium">Connection Status</dt>
                <dd>
                  <Badge variant="default" className="bg-green-500">
                    Verified
                  </Badge>
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Synchronization</CardTitle>
            <CardDescription>Configured sync settings</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4 text-sm">
              <div>
                <dt className="font-medium">Enabled Sync Types</dt>
                <dd className="flex gap-2 mt-1">
                  {config.syncOptions.contacts && (
                    <Badge>Contacts</Badge>
                  )}
                  {config.syncOptions.events && <Badge>Events</Badge>}
                  {config.syncOptions.segments && (
                    <Badge>Segments</Badge>
                  )}
                </dd>
              </div>
              <div>
                <dt className="font-medium">Field Mappings</dt>
                <dd className="text-muted-foreground">
                  {config.mappings.length} fields configured
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Alert>
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            Your integration is ready to be activated. All required
            configurations have been validated.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}