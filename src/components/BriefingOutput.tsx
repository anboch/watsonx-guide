import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ClientData } from "./ClientInputForm";

interface BriefingOutputProps {
  clientData: ClientData;
  briefingData?: any;
}

export const BriefingOutput = ({ clientData, briefingData }: BriefingOutputProps) => {
  // AI-generated mock data structure - shows what the AI will generate
  const mockBriefing = {
    crmData: {
      contactName: "Sarah Chen",
      contactEmail: "sarah.chen@example.com",
      contactTitle: "Chief Technology Officer",
      pastInteractions: [
        { date: "2024-09-15", type: "Meeting", summary: "Initial AI strategy discussion" },
        { date: "2024-08-22", type: "Email", summary: "Shared watsonx case studies" },
        { date: "2024-07-10", type: "Conference", summary: "Met at IBM Think conference" }
      ],
      accountStatus: "Active",
      lastContactDate: "2024-09-15",
      accountOwner: "John Smith",
      region: "North America"
    },
    companyInfo: {
      industry: "Financial Services",
      companySize: "5,000-10,000 employees",
      headquarters: "New York, NY",
      revenue: "$2.1B annually",
      founded: "1998"
    },
    summary: `${clientData.clientName} is a leading financial services provider with a strong presence in the North American market. The company has been experiencing rapid growth and is actively investing in digital transformation initiatives to maintain competitive advantage.`,
    context: `Recent analyst reports indicate the company is focusing on modernizing their technology infrastructure and exploring AI capabilities to enhance customer experience and operational efficiency. They have publicly stated commitments to innovation in their latest earnings call.`,
    opportunities: [
      {
        title: "New CTO Appointment",
        description: "Hired Sarah Chen as CTO in Q4 2024, formerly from a major cloud provider with strong AI background",
        date: "3 months ago"
      },
      {
        title: "Digital Transformation Initiative",
        description: "Announced $150M investment in technology modernization at recent investor conference",
        date: "2 months ago"
      },
      {
        title: "Regulatory Compliance Deadline",
        description: "Must comply with new financial regulations by Q3 2025, requiring system updates",
        date: "Upcoming"
      },
      {
        title: "Strategic Partnership",
        description: "Recently partnered with leading fintech to expand digital offerings",
        date: "1 month ago"
      }
    ],
    painPoints: [
      "Legacy core banking systems causing integration challenges",
      "Data silos across departments preventing unified customer view",
      "Manual processes for compliance reporting consuming significant resources",
      "Limited real-time analytics capabilities for fraud detection",
      "Aging infrastructure unable to support modern AI workloads",
      "Customer experience inconsistent across digital channels"
    ],
    solutionMapping: [
      {
        product: "watsonx.ai",
        reason: "Foundation models can power intelligent customer service, fraud detection, and personalized financial recommendations",
        useCases: ["Conversational AI for customer support", "Fraud pattern detection", "Document analysis for loan processing"]
      },
      {
        product: "watsonx.data",
        reason: "Unified data lakehouse architecture to break down silos and enable real-time analytics across all customer touchpoints",
        useCases: ["360-degree customer view", "Real-time risk analytics", "Regulatory reporting automation"]
      },
      {
        product: "watsonx.governance",
        reason: "Critical for financial services to ensure AI models meet regulatory requirements and maintain audit trails",
        useCases: ["Model risk management", "Compliance monitoring", "Bias detection in lending decisions"]
      }
    ],
    keyQuestions: [
      "What are your biggest pain points with your current core banking systems?",
      "How are you currently handling data integration across departments?",
      "What compliance and regulatory challenges are keeping you up at night?",
      "Where do you see the biggest opportunity for AI to impact your business?",
      "What's your timeline for the digital transformation initiative?",
      "How is your new CTO thinking about AI strategy for the organization?",
      "What criteria are you using to evaluate technology partners?",
      "How do you measure success for technology investments?"
    ],
    competitiveIntel: {
      competitors: ["Competitor A", "Competitor B", "Competitor C"],
      insights: [
        "Main competitor recently deployed AI chatbot with mixed customer reception",
        "Industry leader investing heavily in cloud-native architecture",
        "Regional player gaining market share through superior digital experience"
      ]
    },
    nextSteps: [
      "Schedule technical deep-dive with CTO and architecture team",
      "Provide watsonx.ai demonstration focused on fraud detection use case",
      "Share case studies from similar financial services clients",
      "Arrange reference call with existing customer in banking sector"
    ]
  };

  const briefing = briefingData || mockBriefing;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">{clientData.clientName}</h2>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary">{briefing.companyInfo.industry}</Badge>
          <Badge variant="secondary">{briefing.companyInfo.companySize}</Badge>
          <Badge variant="secondary">{briefing.companyInfo.headquarters}</Badge>
          <Badge variant="outline">Code: {clientData.clientInternalCode}</Badge>
        </div>
      </div>

      <Separator />

      {/* CRM Data */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">CRM Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Primary Contact</div>
              <div className="font-medium">{briefing.crmData.contactName}</div>
              <div className="text-muted-foreground text-xs">{briefing.crmData.contactTitle}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Contact Email</div>
              <div className="font-medium">{briefing.crmData.contactEmail}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Account Owner</div>
              <div className="font-medium">{briefing.crmData.accountOwner}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Last Contact</div>
              <div className="font-medium">{briefing.crmData.lastContactDate}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Account Status</div>
              <Badge variant="secondary">{briefing.crmData.accountStatus}</Badge>
            </div>
            <div>
              <div className="text-muted-foreground">Region</div>
              <div className="font-medium">{briefing.crmData.region}</div>
            </div>
          </div>
          <Separator />
          <div>
            <div className="text-sm font-medium mb-2">Past Interactions</div>
            <div className="space-y-2">
              {briefing.crmData.pastInteractions.map((interaction: any, idx: number) => (
                <div key={idx} className="text-sm flex items-start gap-2">
                  <span className="text-muted-foreground">{interaction.date}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="font-medium">{interaction.type}:</span>
                  <span>{interaction.summary}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Overview */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Company Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Revenue</div>
              <div className="font-medium">{briefing.companyInfo.revenue}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Employees</div>
              <div className="font-medium">{briefing.companyInfo.companySize}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Founded</div>
              <div className="font-medium">{briefing.companyInfo.founded}</div>
            </div>
            <div>
              <div className="text-muted-foreground">HQ</div>
              <div className="font-medium">{briefing.companyInfo.headquarters}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary & Context */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Executive Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-foreground text-sm">{briefing.summary}</p>
          <p className="text-muted-foreground text-sm">{briefing.context}</p>
        </CardContent>
      </Card>

      {/* Opportunity Intelligence */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Opportunity Intelligence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {briefing.opportunities.map((opp: any, idx: number) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-medium text-sm">{opp.title}</h4>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{opp.date}</span>
                </div>
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
          <CardTitle className="text-lg">Identified Pain Points</CardTitle>
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
          <CardTitle className="text-lg">IBM watsonx Solution Mapping</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {briefing.solutionMapping.map((solution: any, idx: number) => (
              <div key={idx} className="space-y-2">
                <h4 className="font-medium text-primary text-sm">{solution.product}</h4>
                <p className="text-sm text-muted-foreground">{solution.reason}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {solution.useCases.map((useCase: string, ucIdx: number) => (
                    <Badge key={ucIdx} variant="outline" className="text-xs">
                      {useCase}
                    </Badge>
                  ))}
                </div>
                {idx < briefing.solutionMapping.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Questions */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Strategic Questions for Meeting</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2">
            {briefing.keyQuestions.map((question: string, idx: number) => (
              <li key={idx} className="flex gap-3 text-sm">
                <span className="text-muted-foreground">{idx + 1}.</span>
                <span>{question}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Competitive Intelligence */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Competitive Intelligence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <div className="text-sm font-medium mb-2">Key Competitors</div>
              <div className="flex flex-wrap gap-1.5">
                {briefing.competitiveIntel.competitors.map((comp: string, idx: number) => (
                  <Badge key={idx} variant="secondary">
                    {comp}
                  </Badge>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <div className="text-sm font-medium mb-2">Market Insights</div>
              <ul className="space-y-2">
                {briefing.competitiveIntel.insights.map((insight: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-muted-foreground">•</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Recommended Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2">
            {briefing.nextSteps.map((step: string, idx: number) => (
              <li key={idx} className="flex gap-3 text-sm">
                <span className="text-muted-foreground">{idx + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};
