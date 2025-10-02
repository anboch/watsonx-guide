import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, ArrowRight, Building2, TrendingUp, Lightbulb, Target, Zap, MessageSquare, Users, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClientData } from "./ClientInputForm";

interface BriefingOutputProps {
  clientData: ClientData;
}

export const BriefingOutput = ({ clientData }: BriefingOutputProps) => {
  const navigate = useNavigate();
  const [expandedSolution, setExpandedSolution] = useState<string | null>(null);
  const [showAllSolutions, setShowAllSolutions] = useState(false);
  
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

  const briefing = clientData.briefingData || mockBriefing;
  
  // Safety checks - ensure all required arrays exist
  const solutionMapping = briefing.solutionMapping || [];
  const opportunities = briefing.opportunities || [];
  const painPoints = briefing.painPoints || [];
  const keyQuestions = briefing.keyQuestions || [];
  const nextSteps = briefing.nextSteps || [];
  const pastInteractions = briefing.crmData?.pastInteractions || [];
  
  // Find the highest compatibility score and top solutions
  const maxCompatibility = solutionMapping.length > 0 
    ? Math.max(...solutionMapping.map((s: any) => s.compatibility))
    : 0;
  const topSolution = solutionMapping.find((s: any) => s.compatibility === maxCompatibility) || { product: "N/A", compatibility: 0 };
  const sortedSolutions = [...solutionMapping].sort((a: any, b: any) => b.compatibility - a.compatibility);
  const topThreeSolutions = sortedSolutions.slice(0, 3);
  const remainingSolutions = sortedSolutions.slice(3);

  return (
    <div className="space-y-6 pb-8">
      {/* Sticky Summary Bar */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border -mx-6 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              {clientData.clientName}
            </h2>
            <div className="flex gap-2 flex-wrap mt-2">
              <Badge variant="secondary">{briefing.companyInfo.industry}</Badge>
              <Badge variant="secondary">{briefing.companyInfo.revenue}</Badge>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="text-sm text-muted-foreground">Top Recommendation</div>
            <Badge className="text-sm">{topSolution.product}</Badge>
            <div className="text-2xl font-bold text-primary">{topSolution.compatibility}% Match</div>
          </div>
        </div>
      </div>

      {/* Tabbed Interface */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-auto">
          <TabsTrigger value="overview" className="flex items-center gap-2 py-3">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="opportunities" className="flex items-center gap-2 py-3">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Opportunities</span>
          </TabsTrigger>
          <TabsTrigger value="solutions" className="flex items-center gap-2 py-3">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Solutions</span>
          </TabsTrigger>
          <TabsTrigger value="strategy" className="flex items-center gap-2 py-3">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Strategy</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* CRM Data */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                CRM Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Primary Contact</div>
                  <div className="font-medium text-base">{briefing.crmData.contactName}</div>
                  <div className="text-sm text-muted-foreground">{briefing.crmData.contactTitle}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Contact Email</div>
                  <div className="font-medium text-base">{briefing.crmData.contactEmail}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Account Owner</div>
                  <div className="font-medium text-base">{briefing.crmData.accountOwner}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Last Contact</div>
                  <div className="font-medium text-base">{briefing.crmData.lastContactDate}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Account Status</div>
                  <Badge variant="secondary">{briefing.crmData.accountStatus}</Badge>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Region</div>
                  <div className="font-medium text-base">{briefing.crmData.region}</div>
                </div>
              </div>
              <Separator />
              <Collapsible>
                <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                  <ChevronDown className="h-4 w-4" />
                  Past Interactions ({pastInteractions.length})
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3">
                  <div className="space-y-3">
                    {pastInteractions.map((interaction: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="text-sm text-muted-foreground whitespace-nowrap">{interaction.date}</div>
                        <div>
                          <div className="font-medium text-sm mb-1">{interaction.type}</div>
                          <div className="text-sm text-muted-foreground">{interaction.summary}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>

          {/* Company Overview */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Company Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Revenue</div>
                  <div className="font-semibold text-lg">{briefing.companyInfo.revenue}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Employees</div>
                  <div className="font-semibold text-lg">{briefing.companyInfo.companySize}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Founded</div>
                  <div className="font-semibold text-lg">{briefing.companyInfo.founded}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">HQ</div>
                  <div className="font-semibold text-lg">{briefing.companyInfo.headquarters}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary & Context */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">{briefing.summary}</p>
              <div className="p-4 bg-muted/30 rounded-lg border-l-4 border-primary">
                <p className="text-base text-muted-foreground leading-relaxed">{briefing.context}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Opportunities Tab */}
        <TabsContent value="opportunities" className="space-y-6">
          {/* Opportunity Intelligence */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Opportunity Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opportunities.map((opp: any, idx: number) => (
                  <div key={idx} className="p-4 bg-muted/30 rounded-lg space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-base">{opp.title}</h4>
                      <Badge variant="outline" className="whitespace-nowrap">{opp.date}</Badge>
                    </div>
                    <p className="text-base text-muted-foreground leading-relaxed">{opp.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pain Points */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Identified Pain Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {painPoints.map((point: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-base">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Solutions Tab */}
        <TabsContent value="solutions" className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                IBM watsonx Solution Mapping
              </h3>
            </div>
            
            {/* Top 3 Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topThreeSolutions.map((solution: any, idx: number) => {
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
                      ${isExpanded ? 'fixed inset-4 md:inset-8 z-50 overflow-y-auto' : 'relative min-h-[300px] flex flex-col'}
                      ${isTop && !isExpanded ? 'border-primary bg-primary/5' : 'border-border bg-card'}
                      hover:border-primary/50
                    `}>
                      <CollapsibleTrigger className="w-full text-left flex-1 flex flex-col">
                        <CardHeader className="pb-4 flex-1 flex flex-col">
                          <div className="flex items-start justify-between gap-2 mb-4">
                            <div className="flex-1">
                              <CardTitle className={`text-lg mb-2 ${isTop ? 'text-primary' : ''}`}>
                                {solution.product}
                                {isTop && <Badge className="ml-2">Best Match</Badge>}
                              </CardTitle>
                              <p className="text-sm text-muted-foreground">{solution.shortDescription}</p>
                            </div>
                            <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                          </div>
                          <div className="flex items-center justify-center mt-auto">
                            <CircularProgress value={solution.compatibility} isTop={isTop} />
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <CardContent className="pt-0 space-y-6">
                          <Separator />
                          
                          <div>
                            <h5 className="text-sm font-semibold text-muted-foreground mb-2">Overview</h5>
                            <p className="text-base leading-relaxed">{solution.reason}</p>
                          </div>
                          
                          <div className="p-4 bg-primary/10 rounded-lg border-l-4 border-primary">
                            <h5 className="text-sm font-semibold text-primary mb-2">Why Interesting</h5>
                            <p className="text-base leading-relaxed">{solution.whyInteresting}</p>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-semibold text-muted-foreground mb-2">Considerations</h5>
                            <p className="text-base text-muted-foreground leading-relaxed">{solution.whyNotInteresting}</p>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-semibold text-muted-foreground mb-3">Key Use Cases</h5>
                            <div className="flex flex-wrap gap-2">
                              {solution.useCases.map((useCase: string, ucIdx: number) => (
                                <Badge key={ucIdx} variant="outline" className="text-sm">
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

            {/* View All Solutions */}
            {remainingSolutions.length > 0 && (
              <Collapsible open={showAllSolutions} onOpenChange={setShowAllSolutions}>
                <div className="flex justify-center">
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      {showAllSolutions ? 'Show Less' : `View ${remainingSolutions.length} More Solutions`}
                      <ChevronDown className={`h-4 w-4 transition-transform ${showAllSolutions ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                </div>
                
                <CollapsibleContent className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {remainingSolutions.map((solution: any, idx: number) => {
                      const isExpanded = expandedSolution === solution.product;
                      
                      return (
                        <Collapsible
                          key={idx}
                          open={isExpanded}
                          onOpenChange={(open) => setExpandedSolution(open ? solution.product : null)}
                        >
                          <Card className={`
                            transition-all duration-300 cursor-pointer
                            ${isExpanded ? 'fixed inset-4 md:inset-8 z-50 overflow-y-auto' : 'relative min-h-[300px] flex flex-col'}
                            border-border bg-card hover:border-primary/50
                          `}>
                            <CollapsibleTrigger className="w-full text-left flex-1 flex flex-col">
                              <CardHeader className="pb-4 flex-1 flex flex-col">
                                <div className="flex items-start justify-between gap-2 mb-4">
                                  <div className="flex-1">
                                    <CardTitle className="text-lg mb-2">{solution.product}</CardTitle>
                                    <p className="text-sm text-muted-foreground">{solution.shortDescription}</p>
                                  </div>
                                  <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                                </div>
                                <div className="flex items-center justify-center mt-auto">
                                  <CircularProgress value={solution.compatibility} isTop={false} />
                                </div>
                              </CardHeader>
                            </CollapsibleTrigger>
                            
                            <CollapsibleContent>
                              <CardContent className="pt-0 space-y-6">
                                <Separator />
                                
                                <div>
                                  <h5 className="text-sm font-semibold text-muted-foreground mb-2">Overview</h5>
                                  <p className="text-base leading-relaxed">{solution.reason}</p>
                                </div>
                                
                                <div className="p-4 bg-primary/10 rounded-lg border-l-4 border-primary">
                                  <h5 className="text-sm font-semibold text-primary mb-2">Why Interesting</h5>
                                  <p className="text-base leading-relaxed">{solution.whyInteresting}</p>
                                </div>
                                
                                <div>
                                  <h5 className="text-sm font-semibold text-muted-foreground mb-2">Considerations</h5>
                                  <p className="text-base text-muted-foreground leading-relaxed">{solution.whyNotInteresting}</p>
                                </div>
                                
                                <div>
                                  <h5 className="text-sm font-semibold text-muted-foreground mb-3">Key Use Cases</h5>
                                  <div className="flex flex-wrap gap-2">
                                    {solution.useCases.map((useCase: string, ucIdx: number) => (
                                      <Badge key={ucIdx} variant="outline" className="text-sm">
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
                </CollapsibleContent>
              </Collapsible>
            )}
            
            {/* Backdrop when expanded */}
            {expandedSolution && (
              <div 
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
                onClick={() => setExpandedSolution(null)}
              />
            )}
          </div>
        </TabsContent>

        {/* Strategy Tab */}
        <TabsContent value="strategy" className="space-y-6">
          {/* Key Questions */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Strategic Questions for Meeting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {keyQuestions.map((question: string, idx: number) => (
                  <div key={idx} className="flex gap-4 p-3 bg-muted/30 rounded-lg">
                    <span className="text-primary font-bold text-lg">{idx + 1}.</span>
                    <span className="text-base">{question}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Competitive Intelligence */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Competitive Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-semibold mb-3 text-muted-foreground">Key Competitors</div>
                  <div className="flex flex-wrap gap-2">
                    {briefing.competitiveIntel.competitors.map((comp: string, idx: number) => (
                      <Badge key={idx} variant="secondary" className="text-sm">
                        {comp}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm font-semibold mb-3 text-muted-foreground">Market Insights</div>
                  <ul className="space-y-3">
                    {briefing.competitiveIntel.insights.map((insight: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-base">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="border-border border-primary/50 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <ArrowRight className="h-5 w-5 text-primary" />
                Recommended Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nextSteps.map((step: string, idx: number) => (
                  <div key={idx} className="flex gap-4 p-3 bg-background/50 rounded-lg">
                    <span className="text-primary font-bold text-lg">{idx + 1}.</span>
                    <span className="text-base">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Contact & Schedule Button */}
      <div className="flex justify-center pt-6">
        <Button 
          size="lg"
          onClick={() => navigate('/contact', { state: { clientData } })}
          className="gap-2 text-base px-8"
        >
          Proceed to Contact & Schedule
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
