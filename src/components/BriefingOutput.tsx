import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Building2, 
  TrendingUp, 
  Target, 
  Lightbulb, 
  MessageSquare,
  Calendar,
  Users
} from "lucide-react";
import { ClientData } from "./ClientInputForm";

interface BriefingOutputProps {
  clientData: ClientData;
  briefingData?: any;
}

export const BriefingOutput = ({ clientData, briefingData }: BriefingOutputProps) => {
  // Mock data structure - will be replaced with AI-generated content
  const mockBriefing = {
    summary: `${clientData.clientName} is a ${clientData.companySize} company in the ${clientData.industry} sector. They are currently facing challenges with ${clientData.keyChallenge}.`,
    context: `As a key player in ${clientData.industry}, they are looking to modernize their operations and leverage AI to drive efficiency and innovation.`,
    opportunities: [
      {
        title: "Recent Leadership Changes",
        description: "New CTO hired with background in AI transformation",
        type: "Leadership"
      },
      {
        title: "Market Expansion",
        description: "Recent announcement of expansion into new markets",
        type: "Growth"
      },
      {
        title: "Technology Investment",
        description: "Increased budget allocation for digital transformation",
        type: "Investment"
      }
    ],
    painPoints: [
      "Data silos preventing unified analytics",
      "Manual processes reducing operational efficiency",
      "Limited AI/ML capabilities for competitive advantage",
      "Compliance and security concerns with legacy systems"
    ],
    solutionMapping: [
      {
        product: "watsonx.ai",
        reason: "Foundation models for enterprise AI applications",
        fit: "High"
      },
      {
        product: "watsonx.data",
        reason: "Unified data lakehouse for breaking data silos",
        fit: "High"
      },
      {
        product: "watsonx.governance",
        reason: "AI governance and risk management",
        fit: "Medium"
      }
    ],
    keyQuestions: [
      "What are your current data infrastructure challenges?",
      "How are you currently approaching AI adoption across the organization?",
      "What governance frameworks do you have in place for AI initiatives?",
      "What are your key success metrics for digital transformation?",
      "How do you envision AI supporting your strategic objectives?"
    ]
  };

  const briefing = briefingData || mockBriefing;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-3xl mb-2">{clientData.clientName}</CardTitle>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary" className="gap-1">
                  <Building2 className="h-3 w-3" />
                  {clientData.industry}
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Users className="h-3 w-3" />
                  {clientData.companySize}
                </Badge>
                {clientData.meetingDate && (
                  <Badge variant="secondary" className="gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(clientData.meetingDate).toLocaleDateString()}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Summary & Context */}
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Executive Summary & Context
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground leading-relaxed">{briefing.summary}</p>
          <p className="text-muted-foreground leading-relaxed">{briefing.context}</p>
        </CardContent>
      </Card>

      {/* Opportunity Intelligence */}
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Opportunity Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {briefing.opportunities.map((opp: any, idx: number) => (
              <div key={idx} className="p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold">{opp.title}</h4>
                  <Badge variant="outline">{opp.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{opp.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pain Points */}
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-destructive" />
            Identified Pain Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {briefing.painPoints.map((point: string, idx: number) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-destructive flex-shrink-0" />
                <span className="text-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* IBM watsonx Solution Mapping */}
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            IBM watsonx Solution Mapping
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {briefing.solutionMapping.map((solution: any, idx: number) => (
              <div key={idx}>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-primary">{solution.product}</h4>
                  <Badge 
                    variant={solution.fit === "High" ? "default" : "secondary"}
                    className={solution.fit === "High" ? "bg-accent" : ""}
                  >
                    {solution.fit} Fit
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{solution.reason}</p>
                {idx < briefing.solutionMapping.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Questions */}
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-accent" />
            Strategic Questions for the Meeting
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {briefing.keyQuestions.map((question: string, idx: number) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                  {idx + 1}
                </span>
                <span className="text-foreground pt-0.5">{question}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};
