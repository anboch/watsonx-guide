import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClientData } from "./ClientInputForm";

interface BriefingOutputProps {
  clientData: ClientData;
  briefingData?: any;
}

export const BriefingOutput = ({ clientData, briefingData }: BriefingOutputProps) => {
  const navigate = useNavigate();
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
  // AI-generated mock data structure - filled with ELITE, realistic data for Allstate
  const mockBriefing = {
    crmData: {
      contactName: "Elena Petrova",
      contactEmail: "elena.petrova@allstate.com",
      contactTitle: "Chief Information & Digital Officer (CIDO)",
      pastInteractions: [
        { date: "2024-10-02", type: "Meeting", summary: "Discovery call on modernizing claims processing and fraud detection." },
        { date: "2024-09-18", type: "Email", summary: "Shared IBM's 'AI in Insurance' whitepaper and watsonx.governance case study." },
        { date: "2024-08-05", type: "Conference", summary: "Met at the IBM Quantum Summit; discussed future of risk modeling." }
      ],
      accountStatus: "Strategic Prospect",
      lastContactDate: "2024-10-02",
      accountOwner: "David Chen",
      region: "North America"
    },
    companyInfo: {
      industry: "Insurance (Property & Casualty)",
      companySize: "50,000+ employees",
      headquarters: "Northbrook, Illinois",
      revenue: "$57.1B annually",
      founded: "1931"
    },
    summary: `Allstate is a titan in the U.S. property and casualty insurance industry, renowned for its 'You're in good hands' slogan. As a market leader, they possess a vast repository of customer and claims data, representing a massive, untapped asset for hyper-personalization and operational efficiency.`,
    context: `The company is under significant pressure from agile, digital-first insurtech competitors. Their strategic imperative, as outlined in recent earnings calls, is to accelerate their digital transformation by leveraging AI and data analytics to enhance customer experience, optimize claims processing, and develop more sophisticated risk models.`,
    opportunities: [
      {
        title: "New Chief Data Officer Hired",
        description: "Appointed Dr. Anil Bhatt, formerly Head of Data Science at a major tech firm, signaling a strong push towards an data-driven culture.",
        date: "4 months ago"
      },
      {
        title: "'Drivewise 2.0' Initiative",
        description: "Announced major investment to enhance their telematics program (Drivewise) to incorporate new data sources for usage-based insurance.",
        date: "2 months ago"
      },
      {
        title: "Competitive Pressure from Insurtechs",
        description: "Losing market share in the under-30 demographic to digital-native insurers like Lemonade and Root Insurance.",
        date: "Ongoing"
      },
      {
        title: "Regulatory Scrutiny on AI Bias",
        description: "New state-level regulations are emerging around the use of AI in premium pricing and claims adjudication, requiring transparent and fair models.",
        date: "Upcoming"
      }
    ],
    painPoints: [
      "Legacy claims processing systems on mainframes result in slow cycle times and high operational costs.",
      "Difficulty in detecting sophisticated, multi-channel fraud patterns in real-time.",
      "Inconsistent customer experience between captive agents, the website, and the mobile app.",
      "Underutilization of vast telematics and customer data for predictive risk modeling.",
      "Long cycle times for underwriting complex commercial policies, leading to lost business.",
      "Ensuring AI model fairness and avoiding demographic bias in pricing and claims decisions is a major compliance risk."
    ],
    solutionMapping: [
      {
        product: "watsonx.ai",
        compatibility: 95,
        shortDescription: "Enterprise AI studio for foundation models and ML",
        reason: "Powers automated claims processing, sophisticated fraud detection, and personalized customer service bots, directly addressing core operational inefficiencies.",
        whyInteresting: "Allstate's massive, proprietary dataset is a perfect match for fine-tuning foundation models. This can create a significant competitive moat against insurtechs by enabling hyper-personalized policies and near-instant claim approvals for common cases.",
        whyNotInteresting: "Requires high-quality, clean data. The initial effort to integrate with legacy mainframe systems for claims data could be substantial.",
        useCases: ["Automated damage assessment from images", "Real-time fraud pattern detection", "Personalized policy recommendations"]
      },
      {
        product: "watsonx.governance",
        compatibility: 93,
        shortDescription: "Govern, manage, and monitor AI activities",
        reason: "Essential for a regulated industry like insurance to ensure AI models are fair, transparent, and compliant with emerging regulations.",
        whyInteresting: "Directly mitigates the huge business risk of biased AI models in pricing and claims. This is a critical differentiator that builds trust with both customers and regulators, turning compliance from a cost center into a competitive advantage.",
        whyNotInteresting: "The value is most apparent once AI models are in production; may be seen as a 'Day 2' problem if they are early in their AI journey.",
        useCases: ["Model risk management", "Bias and drift detection in premium pricing", "Auditable AI decision trails for claims"]
      },
      {
        product: "watsonx.data",
        compatibility: 90,
        shortDescription: "Fit-for-purpose data store built on a data lakehouse",
        reason: "Breaks down data silos between claims, underwriting, and customer data systems to create a unified view for advanced analytics.",
        whyInteresting: "Unlocks the full potential of their telematics (Drivewise) and customer data. A unified data platform is the foundational layer required to achieve the sophisticated risk modeling and 360-degree customer view they need to compete.",
        whyNotInteresting: "Requires significant organizational change to move away from siloed data ownership. Data migration and governance setup is a major undertaking.",
        useCases: ["Unified customer data platform", "Advanced actuarial and risk analytics", "Real-time data for usage-based insurance"]
      },
      {
        product: "watsonx Code Assistant",
        compatibility: 78,
        shortDescription: "Generative AI for code modernization",
        reason: "Accelerates the modernization of legacy COBOL applications from their mainframe systems to cloud-native architectures.",
        whyInteresting: "Directly addresses the core pain point of their aging mainframe infrastructure. Modernizing the claims system is their biggest technical hurdle, and Code Assistant can de-risk this process and dramatically reduce migration time and cost.",
        whyNotInteresting: "Requires buy-in from development teams and a clear modernization strategy. It's a tool, not a complete solution for organizational change.",
        useCases: ["COBOL to Java modernization", "Automated unit test generation", "Natural language to code for new features"]
      },
      {
        product: "watsonx.orchestrate",
        compatibility: 82,
        shortDescription: "AI-powered automation for business processes",
        reason: "Automates complex, multi-step workflows like underwriting and customer onboarding, connecting legacy and modern systems.",
        whyInteresting: "Can provide immediate ROI by reducing manual work in the underwriting process for commercial policies, a known bottleneck. It allows them to connect their mainframe systems to modern services without a full rip-and-replace.",
        whyNotInteresting: "Requires clear documentation of existing business processes, which may not exist for older, complex workflows.",
        useCases: ["Automated underwriting workflows", "New customer onboarding", "Claims processing orchestration"]
      },
      {
        product: "IBM Security",
        compatibility: 75,
        shortDescription: "AI-powered threat detection and response",
        reason: "Protects sensitive customer PII and financial data from increasingly sophisticated cyber threats.",
        whyInteresting: "As a high-profile financial institution, they are a prime target for cyberattacks. IBM Security's AI-powered Guardium and QRadar products can secure their data both on-premise and in their future hybrid cloud environment.",
        whyNotInteresting: "Allstate already has a mature security posture; this would need to integrate with or replace existing solutions, which can be complex.",
        useCases: ["Sensitive data discovery and protection", "AI-driven threat intelligence", "Insider threat detection"]
      },
      {
        product: "IBM Cloud for Financial Services",
        compatibility: 65,
        shortDescription: "Public cloud with built-in security and compliance",
        reason: "Provides a compliant, secure landing zone for modernized applications, designed specifically for regulated industries.",
        whyInteresting: "De-risks their move to the cloud by providing a platform with pre-built controls mapped to financial and insurance regulations. This accelerates their transformation timeline significantly compared to building on a generic public cloud.",
        whyNotInteresting: "They likely have existing relationships with other cloud providers (AWS, Azure), creating a multi-cloud management challenge.",
        useCases: ["Secure hosting for modernized claims app", "Compliant environment for AI workloads", "Hybrid cloud disaster recovery"]
      },
      {
        product: "IBM Granite Models",
        compatibility: 55,
        shortDescription: "Enterprise-grade generative AI models",
        reason: "Provides transparent, auditable, and indemnified foundation models for building enterprise-grade generative AI applications.",
        whyInteresting: "For a risk-averse company like Allstate, using a model from an unknown source is a non-starter. IBM's commitment to transparency and indemnification for Granite is a powerful differentiator for building trusted AI solutions.",
        whyNotInteresting: "This is a component of the watsonx.ai platform rather than a standalone solution for them. The value is in the entire platform.",
        useCases: ["Summarizing complex claims documents", "Drafting customer communications", "Internal knowledge base Q&A"]
      }
    ],
    keyQuestions: [
      "How are you planning to leverage your vast telematics data from Drivewise beyond simple premium discounts?",
      "As you adopt more AI in underwriting and claims, how is your team approaching model governance and regulatory compliance?",
      "What is the biggest technical and business bottleneck in your current claims processing workflow?",
      "How does your strategy for modernizing mainframe applications align with your goals for faster product innovation?",
      "With the appointment of Dr. Bhatt, what are the top 1-2 priorities for establishing a data-driven culture at Allstate?",
      "How are you ensuring a consistent, high-quality customer experience across your agent network and digital channels?",
      "What criteria are most important when evaluating an enterprise partner for your AI and data transformation journey?",
      "How do you measure the ROI on technology investments aimed at improving operational efficiency vs. customer experience?"
    ],
    competitiveIntel: {
      competitors: ["Progressive", "GEICO", "State Farm", "Lemonade"],
      insights: [
        "Progressive is the leader in telematics with its 'Snapshot' program, setting the benchmark for usage-based insurance.",
        "GEICO competes primarily on price and brand recognition, driven by a massive advertising budget and a simple, direct-to-consumer digital experience.",
        "Lemonade is capturing the younger demographic with a mobile-first experience and AI-powered claims processing, though they struggle with profitability.",
        "State Farm leverages its vast network of local agents to build strong customer relationships, a moat that is difficult for digital players to overcome."
      ]
    },
    nextSteps: [
      "Propose a half-day 'AI in Claims Modernization' workshop with Elena Petrova's and Dr. Bhatt's teams.",
      "Deliver a tailored watsonx.ai and watsonx.governance demo focused on a real-world claims fraud and bias detection scenario.",
      "Share the case study of a large European insurer who reduced claims processing time by 40% using IBM technology.",
      "Arrange an executive briefing with IBM's Global Insurance Industry Lead to discuss strategic partnership."
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
                  ${isExpanded ? 'fixed inset-4 md:inset-8 z-50 overflow-y-auto' : 'relative min-h-[280px] flex flex-col'}
                  ${isTop && !isExpanded ? 'border-primary bg-primary/5' : 'border-border bg-card'}
                  ${!isTop && !isExpanded ? 'opacity-70' : ''}
                  hover:border-primary/50
                `}>
                  <CollapsibleTrigger className="w-full text-left flex-1 flex flex-col">
                    <CardHeader className="pb-3 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex-1 min-h-[60px]">
                          <CardTitle className={`text-base mb-2 ${isTop ? 'text-primary' : ''}`}>
                            {solution.product}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground line-clamp-2">{solution.shortDescription}</p>
                        </div>
                        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                      <div className="flex items-center justify-center mt-auto">
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

      {/* Contact & Schedule Button */}
      <div className="flex justify-center pt-8">
        <Button 
          size="lg"
          onClick={() => navigate('/contact', { state: { clientData } })}
          className="gap-2"
        >
          Proceed to Contact & Schedule
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
