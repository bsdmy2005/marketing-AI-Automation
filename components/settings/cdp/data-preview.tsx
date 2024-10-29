"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const sampleData = [
  {
    source: {
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      phone: "+1234567890",
    },
    destination: {
      email: "john.doe@example.com",
      first_name: "John",
      last_name: "Doe",
      phone_number: "+1234567890",
    },
    status: "success",
  },
  {
    source: {
      email: "jane.smith@example.com",
      firstName: "Jane",
      lastName: "Smith",
      phone: null,
    },
    destination: {
      email: "jane.smith@example.com",
      first_name: "Jane",
      last_name: "Smith",
      phone_number: null,
    },
    status: "warning",
  },
];

export function CDPDataPreview({ config, onUpdateSync }) {
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState(sampleData);

  const refreshPreview = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Data Preview</h3>
        <p className="text-sm text-muted-foreground">
          Preview how your data will be synchronized between platforms.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="space-y-0.5">
            <Label className="text-base">Sync Options</Label>
            <p className="text-sm text-muted-foreground">
              Choose which data types to synchronize
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch
                checked={config.syncOptions.contacts}
                onCheckedChange={(checked) =>
                  onUpdateSync({
                    ...config.syncOptions,
                    contacts: checked,
                  })
                }
              />
              <Label>Contacts</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={config.syncOptions.events}
                onCheckedChange={(checked) =>
                  onUpdateSync({
                    ...config.syncOptions,
                    events: checked,
                  })
                }
              />
              <Label>Events</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={config.syncOptions.segments}
                onCheckedChange={(checked) =>
                  onUpdateSync({
                    ...config.syncOptions,
                    segments: checked,
                  })
                }
              />
              <Label>Segments</Label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium">Sample Data Preview</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshPreview}
              disabled={isLoading}
            >
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Refresh Preview
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source Data</TableHead>
                <TableHead>Mapped Data</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {previewData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <pre className="text-xs">
                      {JSON.stringify(row.source, null, 2)}
                    </pre>
                  </TableCell>
                  <TableCell>
                    <pre className="text-xs">
                      {JSON.stringify(row.destination, null, 2)}
                    </pre>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        row.status === "success" ? "default" : "secondary"
                      }
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Alert>
          <AlertDescription>
            This is a preview of how your data will be mapped. Any issues or
            warnings should be addressed before activating the integration.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}