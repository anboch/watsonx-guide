import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { ClientData } from "./ClientInputForm";

interface BriefingOutputProps {
  clientData: ClientData;
  briefingData?: any;
}

export const BriefingOutput = ({ clientData, briefingData }: BriefingOutputProps) => {
  const [expandedSolution, setExpandedSolution] = useState<string | null>(null);
  
  const CircularProgress = ({ value, isTop }: { value: number; isTop: boolean }) => {
    const radius = 32;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;
    
    return (
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            className="text-muted/20"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-500 ${isTop ? 'text-primary' : 'text-muted-foreground/50'}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-lg font-bold ${isTop ? 'text-primary' : 'text-muted-foreground'}`}>
            {value}%
          </span>
        </div>
      </div>
    );
  };
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
        compatibility: 92,
        shortDescription: "AI foundation models for intelligent automation",
        reason: "Foundation models can power intelligent customer service, fraud detection, and personalized financial recommendations",
        whyInteresting: "The client's new CTO has a strong AI background and they've announced a $150M digital transformation initiative. Their current manual fraud detection processes and inconsistent customer experience across channels are perfect use cases for watsonx.ai's capabilities.",
        whyNotInteresting: "Integration with legacy core banking systems may require significant effort. The organization may need to build internal AI expertise before fully leveraging advanced capabilities.",
        useCases: ["Conversational AI for customer support", "Fraud pattern detection", "Document analysis for loan processing"]
      },
      {
        product: "watsonx.data",
        compatibility: 88,
        shortDescription: "Unified data lakehouse for analytics",
        reason: "Unified data lakehouse architecture to break down silos and enable real-time analytics across all customer touchpoints",
        whyInteresting: "Client explicitly mentioned data silos as a major pain point preventing unified customer view. With upcoming regulatory compliance deadline in Q3 2025, having a unified data platform is critical for automated reporting.",
        whyNotInteresting: "Requires organizational change management to break down departmental data ownership barriers. Migration from existing data warehouses may be time-consuming.",
        useCases: ["360-degree customer view", "Real-time risk analytics", "Regulatory reporting automation"]
      },
      {
        product: "watsonx.governance",
        compatibility: 95,
        shortDescription: "AI governance and compliance",
        reason: "Critical for financial services to ensure AI models meet regulatory requirements and maintain audit trails",
        whyInteresting: "As a financial services company, regulatory compliance is non-negotiable. The Q3 2025 compliance deadline makes this extremely timely. watsonx.governance provides audit trails and bias detection essential for banking AI applications.",
        whyNotInteresting: "May be seen as overhead if AI adoption is limited. Requires clear governance policies and processes to be defined upfront.",
        useCases: ["Model risk management", "Compliance monitoring", "Bias detection in lending decisions"]
      },
      {
        product: "watsonx.orchestrate",
        compatibility: 85,
        shortDescription: "AI-powered automation and workflow orchestration",
        reason: "Automates repetitive business processes and connects disparate systems to improve operational efficiency",
        whyInteresting: "Client mentioned manual processes for compliance reporting consuming significant resources. watsonx.orchestrate can automate these workflows and integrate with existing core banking systems, freeing up staff for higher-value work.",
        whyNotInteresting: "Requires mapping and documenting existing processes before automation. ROI depends on volume of repetitive tasks and may take time to realize full benefits.",
        useCases: ["Automated compliance reporting", "Customer onboarding workflows", "Cross-system data synchronization"]
      },
      {
        product: "watsonx Code Assistant",
        compatibility: 62,
        shortDescription: "AI-powered code generation and modernization",
        reason: "Accelerates application development and helps modernize legacy code to cloud-native architectures",
        whyInteresting: "With legacy core banking systems needing modernization and a $150M digital transformation budget, Code Assistant can speed up migration efforts and reduce technical debt while maintaining code quality.",
        whyNotInteresting: "Requires developer adoption and training. Most valuable for large-scale modernization projects rather than small updates.",
        useCases: ["Legacy code modernization", "Accelerated feature development", "Code documentation generation"]
      },
      {
        product: "IBM Granite Models",
        compatibility: 40,
        shortDescription: "Enterprise-grade generative AI foundation models",
        reason: "Purpose-built foundation models optimized for business use cases with strong performance and transparency",
        whyInteresting: "Granite models offer enterprise-ready AI with better cost-performance ratios than generic models. Ideal for financial services where model transparency and explainability are critical for regulatory compliance.",
        whyNotInteresting: "Newer to market compared to other foundation models. May require fine-tuning for highly specialized financial use cases.",
        useCases: ["Document summarization", "Financial report generation", "Customer communication drafting"]
      },
      {
        product: "IBM Cloud",
        compatibility: 47,
        shortDescription: "Hybrid cloud infrastructure and platform services",
        reason: "Secure, scalable cloud infrastructure with strong financial services compliance and hybrid capabilities",
        whyInteresting: "IBM Cloud's financial services-specific compliance frameworks (FS Cloud) align perfectly with regulatory requirements. Hybrid cloud approach allows gradual migration from legacy systems without full rip-and-replace.",
        whyNotInteresting: "Migration to any cloud requires significant planning and change management. Existing cloud commitments may create multi-cloud complexity.",
        useCases: ["Secure application hosting", "Hybrid cloud integration", "Disaster recovery"]
      },
      {
        product: "IBM Security",
        compatibility: 75,
        shortDescription: "Enterprise security and threat intelligence",
        reason: "Comprehensive security suite with AI-powered threat detection and zero-trust architecture capabilities",
        whyInteresting: "Financial services are prime targets for cyber attacks. With limited real-time fraud detection capabilities mentioned as a pain point, IBM Security's AI-powered threat intelligence can significantly reduce risk exposure.",
        whyNotInteresting: "May overlap with existing security investments. Requires integration with current security operations center (SOC) workflows.",
        useCases: ["AI-powered threat detection", "Identity and access management", "Security orchestration and response"]
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
  
  // Find the highest compatibility score
  const maxCompatibility = Math.max(...briefing.solutionMapping.map((s: any) => s.compatibility));

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
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">IBM watsonx Solution Mapping</h3>
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {briefing.solutionMapping.map((solution: any, idx: number) => {
            const isTop = solution.compatibility === maxCompatibility;
            const isExpanded = expandedSolution === solution.product;
            
            return (
              <Collapsible
                key={idx}
                open={isExpanded}
                onOpenChange={(open) => setExpandedSolution(open ? solution.product : null)}
              >
                <Card className={`
                  transition-all duration-300 cursor-pointer
                  ${isExpanded ? 'fixed inset-4 md:inset-8 z-50 overflow-y-auto' : 'relative'}
                  ${isTop && !isExpanded ? 'border-primary bg-primary/5' : 'border-border bg-card'}
                  ${!isTop && !isExpanded ? 'opacity-70' : ''}
                  hover:border-primary/50
                `}>
                  <CollapsibleTrigger className="w-full text-left">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <CardTitle className={`text-base mb-2 ${isTop ? 'text-primary' : ''}`}>
                            {solution.product}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground">{solution.shortDescription}</p>
                        </div>
                        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                      <div className="flex items-center justify-center mt-4">
                        <CircularProgress value={solution.compatibility} isTop={isTop} />
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent className="pt-0 space-y-4">
                      <Separator />
                      
                      <div>
                        <h5 className="text-xs font-medium text-muted-foreground mb-1">Overview</h5>
                        <p className="text-sm">{solution.reason}</p>
                      </div>
                      
                      <div>
                        <h5 className="text-xs font-medium text-primary mb-1">Why Interesting</h5>
                        <p className="text-sm text-muted-foreground">{solution.whyInteresting}</p>
                      </div>
                      
                      <div>
                        <h5 className="text-xs font-medium text-muted-foreground mb-1">Considerations</h5>
                        <p className="text-sm text-muted-foreground">{solution.whyNotInteresting}</p>
                      </div>
                      
                      <div>
                        <h5 className="text-xs font-medium text-muted-foreground mb-2">Key Use Cases</h5>
                        <div className="flex flex-wrap gap-1.5">
                          {solution.useCases.map((useCase: string, ucIdx: number) => (
                            <Badge key={ucIdx} variant="outline" className="text-xs">
                              {useCase}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            );
          })}
        </div>
        
        {/* Backdrop when expanded */}
        {expandedSolution && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={() => setExpandedSolution(null)}
          />
        )}
      </div>

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
