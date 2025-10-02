import { useState } from "react";
import { ClientInputForm, ClientData } from "@/components/ClientInputForm";
import { BriefingOutput } from "@/components/BriefingOutput";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const [showBriefing, setShowBriefing] = useState(false);
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data: ClientData) => {
    setIsLoading(true);
    setClientData(data);
    
    // Simulate API call - will be replaced with real AI generation
    setTimeout(() => {
      setIsLoading(false);
      setShowBriefing(true);
    }, 2000);
  };

  const handleReset = () => {
    setShowBriefing(false);
    setClientData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Header */}
      <div 
        className="relative overflow-hidden bg-gradient-hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(17, 94, 254, 0.95) 0%, rgba(30, 166, 196, 0.9) 100%), url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              IBM Sales Intelligence
            </h1>
            <p className="text-xl md:text-2xl opacity-95 mb-2">
              AI-Powered Client Briefings for Strategic Sales Conversations
            </p>
            <p className="text-base md:text-lg opacity-80">
              Transform client data into actionable intelligence with watsonx
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {showBriefing && clientData ? (
            <>
              <Button 
                variant="ghost" 
                onClick={handleReset}
                className="mb-6"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                New Briefing
              </Button>
              <BriefingOutput clientData={clientData} />
            </>
          ) : (
            <ClientInputForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-sm text-muted-foreground">
            Powered by IBM watsonx • For IBM Sales Teams
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
