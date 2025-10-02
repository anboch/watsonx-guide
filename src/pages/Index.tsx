import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClientInputForm, ClientData } from "@/components/ClientInputForm";
import { BriefingOutput } from "@/components/BriefingOutput";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import detectiveLogo from "@/assets/detective-logo.png";

const Index = () => {
  const navigate = useNavigate();
  const [showBriefing, setShowBriefing] = useState(false);
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    
    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleFormSubmit = async (data: ClientData) => {
    setIsLoading(true);
    setClientData(data);
    
    try {
      const FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-briefing`;
      
      const response = await fetch(FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientName: data.clientName,
          internalCode: data.clientInternalCode,
          additionalContext: data.additionalContext
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate briefing');
      }

      const result = await response.json();
      setClientData({
        ...data,
        briefingData: result.briefing
      });
      setShowBriefing(true);
    } catch (error) {
      console.error('Error generating briefing:', error);
      alert('Failed to generate briefing. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white p-1.5 rounded-md shadow-sm">
                <img src={detectiveLogo} alt="Sales Intelligence Logo" className="h-12 w-12" />
              </div>
              <h1 className="text-3xl font-bold">IBM watsonx.sales</h1>
            </div>
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
