import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface ClientInputFormProps {
  onSubmit: (data: ClientData) => void;
  isLoading: boolean;
}

export interface ClientData {
  clientName: string;
  industry: string;
  companySize: string;
  keyChallenge: string;
  currentSolutions: string;
  meetingDate: string;
}

export const ClientInputForm = ({ onSubmit, isLoading }: ClientInputFormProps) => {
  const [formData, setFormData] = useState<ClientData>({
    clientName: "",
    industry: "",
    companySize: "",
    keyChallenge: "",
    currentSolutions: "",
    meetingDate: "",
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
        <CardTitle>Client Details</CardTitle>
        <CardDescription>
          Enter information to generate briefing
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
              placeholder="Acme Corporation"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                value={formData.industry}
                onChange={(e) => handleChange("industry", e.target.value)}
                placeholder="Financial Services"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companySize">Company Size</Label>
              <Input
                id="companySize"
                value={formData.companySize}
                onChange={(e) => handleChange("companySize", e.target.value)}
                placeholder="5,000-10,000 employees"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keyChallenge">Key Challenge</Label>
            <Textarea
              id="keyChallenge"
              value={formData.keyChallenge}
              onChange={(e) => handleChange("keyChallenge", e.target.value)}
              placeholder="Main business challenge..."
              className="min-h-[100px] resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentSolutions">Current Solutions</Label>
            <Textarea
              id="currentSolutions"
              value={formData.currentSolutions}
              onChange={(e) => handleChange("currentSolutions", e.target.value)}
              placeholder="Existing technology stack..."
              className="min-h-[80px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="meetingDate">Meeting Date</Label>
            <Input
              id="meetingDate"
              type="date"
              value={formData.meetingDate}
              onChange={(e) => handleChange("meetingDate", e.target.value)}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                Generating...
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
