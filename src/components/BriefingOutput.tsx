import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ClientData } from "./ClientInputForm";

interface BriefingOutputProps {
  clientData: ClientData;
  briefingData?: any;
}

export const BriefingOutput = ({ clientData, briefingData }: BriefingOutputProps) => {
  const mockBriefing = {
    summary: `${clientData.clientName} is a ${clientData.companySize} company in the ${clientData.industry} sector. They are currently facing challenges with ${clientData.keyChallenge}.`,
    context: `As a key player in ${clientData.industry}, they are looking to modernize their operations and leverage AI to drive efficiency and innovation.`,
    opportunities: [
      {
        title: "Recent Leadership Changes",
        description: "New CTO hired with background in AI transformation"
      },
      {
        title: "Market Expansion",
        description: "Recent announcement of expansion into new markets"
      },
      {
        title: "Technology Investment",
        description: "Increased budget allocation for digital transformation"
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
        reason: "Foundation models for enterprise AI applications"
      },
      {
        product: "watsonx.data",
        reason: "Unified data lakehouse for breaking data silos"
      },
      {
        product: "watsonx.governance",
        reason: "AI governance and risk management"
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
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">{clientData.clientName}</h2>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary">{clientData.industry}</Badge>
          <Badge variant="secondary">{clientData.companySize}</Badge>
          {clientData.meetingDate && (
            <Badge variant="secondary">
              {new Date(clientData.meetingDate).toLocaleDateString()}
            </Badge>
          )}
        </div>
      </div>

      <Separator />

      {/* Summary & Context */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-foreground">{briefing.summary}</p>
          <p className="text-muted-foreground text-sm">{briefing.context}</p>
        </CardContent>
      </Card>

      {/* Opportunity Intelligence */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {briefing.opportunities.map((opp: any, idx: number) => (
              <div key={idx} className="space-y-1">
                <h4 className="font-medium text-sm">{opp.title}</h4>
                <p className="text-sm text-muted-foreground">{opp.description}</p>
                {idx < briefing.opportunities.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pain Points */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Pain Points</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {briefing.painPoints.map((point: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <span className="text-muted-foreground">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* IBM watsonx Solutions */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Recommended Solutions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {briefing.solutionMapping.map((solution: any, idx: number) => (
              <div key={idx} className="space-y-1">
                <h4 className="font-medium text-primary text-sm">{solution.product}</h4>
                <p className="text-sm text-muted-foreground">{solution.reason}</p>
                {idx < briefing.solutionMapping.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Questions */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Key Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {briefing.keyQuestions.map((question: string, idx: number) => (
              <li key={idx} className="flex gap-3 text-sm">
                <span className="text-muted-foreground">{idx + 1}.</span>
                <span>{question}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};
