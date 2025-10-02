import { useState } from "react";
import { ClientInputForm, ClientData } from "@/components/ClientInputForm";
import { BriefingOutput } from "@/components/BriefingOutput";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen bg-background">
      {/* Minimal Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">IBM Sales Intelligence</h1>
            <p className="text-muted-foreground">AI-powered client briefings</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {showBriefing && clientData ? (
            <>
              <Button 
                variant="ghost" 
                onClick={handleReset}
                className="mb-8"
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
      </main>
    </div>
  );
};

export default Index;
