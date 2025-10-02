import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface ClientInputFormProps {
  onSubmit: (data: ClientData) => void;
  isLoading: boolean;
}

export interface ClientData {
  clientName: string;
  crmIntegration: string;
}

export const ClientInputForm = ({ onSubmit, isLoading }: ClientInputFormProps) => {
  const [formData, setFormData] = useState<ClientData>({
    clientName: "",
    crmIntegration: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof ClientData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Generate Client Briefing</CardTitle>
        <CardDescription>
          AI will analyze and generate comprehensive intelligence
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="clientName">Client Name</Label>
            <Input
              id="clientName"
              value={formData.clientName}
              onChange={(e) => handleChange("clientName", e.target.value)}
              placeholder="Enter client company name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="crmIntegration">CRM Integration</Label>
            <Select
              value={formData.crmIntegration}
              onValueChange={(value) => handleChange("crmIntegration", value)}
            >
              <SelectTrigger id="crmIntegration">
                <SelectValue placeholder="Select CRM system" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salesforce">Salesforce</SelectItem>
                <SelectItem value="hubspot">HubSpot</SelectItem>
                <SelectItem value="dynamics">Microsoft Dynamics</SelectItem>
                <SelectItem value="zoho">Zoho CRM</SelectItem>
                <SelectItem value="pipedrive">Pipedrive</SelectItem>
                <SelectItem value="none">No CRM Integration</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                Analyzing...
              </>
            ) : (
              "Generate Briefing"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
