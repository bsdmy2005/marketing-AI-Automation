"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

const defaultFields = [
  { source: "email", type: "string", required: true },
  { source: "firstName", type: "string", required: true },
  { source: "lastName", type: "string", required: true },
  { source: "phone", type: "string", required: false },
  { source: "customerId", type: "string", required: true },
];

const destinationFields = [
  { name: "email", type: "string" },
  { name: "first_name", type: "string" },
  { name: "last_name", type: "string" },
  { name: "phone_number", type: "string" },
  { name: "external_id", type: "string" },
  { name: "custom_field_1", type: "string" },
  { name: "custom_field_2", type: "string" },
];

export function CDPFieldMapping({ platform, mappings, onChange }) {
  const [customFields, setCustomFields] = useState([]);

  const addCustomField = () => {
    setCustomFields([...customFields, { name: "", type: "string" }]);
  };

  const removeCustomField = (index: number) => {
    setCustomFields(customFields.filter((_, i) => i !== index));
  };

  const updateMapping = (sourceField: string, destinationField: string) => {
    const newMappings = [...mappings];
    const existingIndex = newMappings.findIndex(
      (m) => m.source === sourceField
    );

    if (existingIndex >= 0) {
      newMappings[existingIndex].destination = destinationField;
    } else {
      newMappings.push({ source: sourceField, destination: destinationField });
    }

    onChange(newMappings);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Map Data Fields</h3>
        <p className="text-sm text-muted-foreground">
          Configure how your data fields map between systems.
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Source Field</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Required</TableHead>
            <TableHead>Destination Field</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {defaultFields.map((field) => (
            <TableRow key={field.source}>
              <TableCell>{field.source}</TableCell>
              <TableCell>{field.type}</TableCell>
              <TableCell>{field.required ? "Yes" : "No"}</TableCell>
              <TableCell>
                <Select
                  value={
                    mappings.find((m) => m.source === field.source)
                      ?.destination || ""
                  }
                  onValueChange={(value) =>
                    updateMapping(field.source, value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinationFields.map((dest) => (
                      <SelectItem key={dest.name} value={dest.name}>
                        {dest.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
          {customFields.map((field, index) => (
            <TableRow key={`custom-${index}`}>
              <TableCell>
                <Input
                  value={field.name}
                  onChange={(e) => {
                    const newFields = [...customFields];
                    newFields[index].name = e.target.value;
                    setCustomFields(newFields);
                  }}
                  placeholder="Custom field name"
                />
              </TableCell>
              <TableCell>string</TableCell>
              <TableCell>No</TableCell>
              <TableCell>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinationFields.map((dest) => (
                      <SelectItem key={dest.name} value={dest.name}>
                        {dest.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCustomField(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button variant="outline" onClick={addCustomField}>
        <Plus className="mr-2 h-4 w-4" />
        Add Custom Field
      </Button>
    </div>
  );
}