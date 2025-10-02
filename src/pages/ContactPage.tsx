import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Mail, Calendar, Phone, MessageSquare, Video, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const clientData = location.state?.clientData;
  
  // Mock briefing data - in production this would come from the actual briefing
  const briefingData = {
    contactName: "Elena Petrova",
    contactEmail: "elena.petrova@allstate.com",
    contactPhone: "+1 (847) 402-5000",
  };

  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    language: "en", // In production, this will be automatically selected by AI based on briefing data
  });
  const [copied, setCopied] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopyFromBriefing = (field: 'name' | 'email' | 'phone') => {
    const fieldMap = {
      name: briefingData.contactName,
      email: briefingData.contactEmail,
      phone: briefingData.contactPhone,
    };
    
    setContactInfo(prev => ({ ...prev, [field]: fieldMap[field] }));
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
    
    toast({
      title: "Data Copied",
      description: `${field.charAt(0).toUpperCase() + field.slice(1)} populated from briefing`,
    });
  };

  const handleTeamsMeeting = () => {
    const subject = encodeURIComponent(`IBM Solutions Discussion - ${clientData?.clientName || 'Your Company'}`);
    const body = encodeURIComponent(
      `Hi ${contactInfo.name},\n\nI'd like to schedule a meeting to discuss IBM solutions tailored for ${clientData?.clientName || 'your organization'}.\n\nBased on our analysis, I believe we have some valuable insights to share.\n\nBest regards`
    );
    window.open(`https://teams.microsoft.com/l/meeting/new?subject=${subject}&content=${body}`, '_blank');
    toast({
      title: "Teams Meeting Opened",
      description: "Complete the meeting details in Microsoft Teams",
    });
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`IBM Solutions Briefing - ${clientData?.clientName || 'Partnership Opportunity'}`);
    const body = encodeURIComponent(
      `Dear ${contactInfo.name},\n\nThank you for your interest in IBM solutions. We've completed a comprehensive analysis for ${clientData?.clientName || 'your organization'} and would love to discuss our findings.\n\nKey highlights:\n• Tailored solution recommendations\n• Compatibility analysis\n• Implementation roadmap\n\nWould you be available for a meeting this week?\n\nBest regards,\nIBM Sales Team`
    );
    window.open(`mailto:${contactInfo.email}?subject=${subject}&body=${body}`, '_blank');
    toast({
      title: "Email Client Opened",
      description: "Your email draft is ready to send",
    });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi ${contactInfo.name}! I've completed the IBM solutions analysis for ${clientData?.clientName || 'your company'}. Can we schedule a quick call to discuss the findings? 📊`
    );
    window.open(`https://wa.me/${contactInfo.phone.replace(/\D/g, '')}?text=${message}`, '_blank');
    toast({
      title: "WhatsApp Opened",
      description: "Your message is ready to send",
    });
  };

  const handleCopyBriefingLink = () => {
    const briefingUrl = `${window.location.origin}/?client=${encodeURIComponent(clientData?.clientName || '')}`;
    navigator.clipboard.writeText(briefingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Link Copied",
      description: "Briefing link copied to clipboard",
    });
  };

  const handleScheduleCall = () => {
    const subject = encodeURIComponent(`IBM Consultation Call - ${clientData?.clientName || ''}`);
    const details = encodeURIComponent(
      `Discussion about IBM solutions for ${clientData?.clientName || 'your organization'}`
    );
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${subject}&details=${details}`, '_blank');
    toast({
      title: "Calendar Opened",
      description: "Add the meeting to your calendar",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Briefing
            </Button>
            <h1 className="text-3xl font-bold mb-2">Next Steps - Contact & Schedule</h1>
            <p className="text-muted-foreground">
              Choose how you'd like to connect with {clientData?.clientName || 'the client'}
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Contact Information Form */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Enter the client's contact details to enable quick communication options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Contact Name</Label>
                  <div className="flex gap-2">
                    <Input
                      id="name"
                      placeholder="John Smith"
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => handleCopyFromBriefing('name')}
                      title="Copy from briefing"
                    >
                      {copiedField === 'name' ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex gap-2">
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.smith@company.com"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => handleCopyFromBriefing('email')}
                      title="Copy from briefing"
                    >
                      {copiedField === 'email' ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex gap-2">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => handleCopyFromBriefing('phone')}
                      title="Copy from briefing"
                    >
                      {copiedField === 'phone' ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Preferred Language</Label>
                  <Select 
                    value={contactInfo.language}
                    onValueChange={(value) => setContactInfo(prev => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="pt">Português</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                      <SelectItem value="ja">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    In production, this will be automatically selected by AI
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Communication Actions</CardTitle>
              <CardDescription>
                Choose your preferred method to reach out and schedule a meeting
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <Button 
                onClick={handleTeamsMeeting}
                className="h-auto py-6 flex-col gap-2"
                disabled={!contactInfo.name}
              >
                <Video className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-semibold">Schedule Teams Meeting</div>
                  <div className="text-xs opacity-80">Open meeting scheduler in Teams</div>
                </div>
              </Button>

              <Button 
                onClick={handleEmail}
                className="h-auto py-6 flex-col gap-2"
                variant="secondary"
                disabled={!contactInfo.email}
              >
                <Mail className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-semibold">Send Email</div>
                  <div className="text-xs opacity-80">Pre-filled briefing email</div>
                </div>
              </Button>

              <Button 
                onClick={handleWhatsApp}
                className="h-auto py-6 flex-col gap-2"
                variant="outline"
                disabled={!contactInfo.phone || !contactInfo.name}
              >
                <MessageSquare className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-semibold">WhatsApp Message</div>
                  <div className="text-xs opacity-80">Quick follow-up message</div>
                </div>
              </Button>

              <Button 
                onClick={handleScheduleCall}
                className="h-auto py-6 flex-col gap-2"
                variant="outline"
              >
                <Calendar className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-semibold">Add to Calendar</div>
                  <div className="text-xs opacity-80">Schedule a consultation call</div>
                </div>
              </Button>
            </CardContent>
          </Card>

          {/* Share Briefing */}
          <Card>
            <CardHeader>
              <CardTitle>Share Briefing</CardTitle>
              <CardDescription>
                Copy the link to share this briefing with colleagues or the client
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleCopyBriefingLink}
                className="w-full"
                variant="outline"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Briefing Link
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;