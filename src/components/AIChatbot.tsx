import { useState } from "react";
import { MessageSquare, X, Upload, Send, FileText, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("granite");
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your AI assistant. Upload documents or ask me anything about your client meeting.",
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    setMessages([...messages, {
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    }]);
    
    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "This is a mock response. In production, this would use the selected LLM model to analyze your documents and provide insights.",
        timestamp: new Date(),
      }]);
    }, 1000);
    
    setInputMessage("");
  };

  return (
    <>
      {/* Floating Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:scale-110 flex items-center justify-center"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-96 bg-background border-l shadow-2xl z-50 transform transition-transform duration-300 flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-lg">AI Assistant</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Model Selector */}
        <div className="p-4 border-b bg-muted/30">
          <label className="text-sm font-medium mb-2 block">AI Model</label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="granite">IBM Granite 3.1</SelectItem>
              <SelectItem value="llama">Meta Llama 3.3</SelectItem>
              <SelectItem value="mistral">Mistral 7B</SelectItem>
              <SelectItem value="phi">Microsoft Phi-4</SelectItem>
              <SelectItem value="gemma">Google Gemma 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* File Upload Area */}
        <div className="p-4 border-b">
          <label className="text-sm font-medium mb-2 block">Upload Documents</label>
          <div className="border-2 border-dashed rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Upload className="h-6 w-6" />
              <p className="text-xs text-center">
                Drop files here or click to upload
                <br />
                <span className="text-[10px]">PDF, DOCX, PNG, JPG</span>
              </p>
            </div>
          </div>
          
          {/* Mock uploaded files */}
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 p-2 bg-muted rounded-md text-sm">
              <FileText className="h-4 w-4 text-primary" />
              <span className="flex-1 truncate">Allstate_Report_2024.pdf</span>
              <X className="h-3 w-3 cursor-pointer" />
            </div>
            <div className="flex items-center gap-2 p-2 bg-muted rounded-md text-sm">
              <ImageIcon className="h-4 w-4 text-primary" />
              <span className="flex-1 truncate">market_analysis.png</span>
              <X className="h-3 w-3 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex flex-col gap-1",
                  message.role === "user" ? "items-end" : "items-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-lg px-4 py-2 text-sm",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {message.content}
                </div>
                <span className="text-[10px] text-muted-foreground px-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Ask anything about your meeting..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button size="icon" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
