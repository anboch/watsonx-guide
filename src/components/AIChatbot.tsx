import { useState } from "react";
import { MessageSquare, X, Send, Plus, FileText, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [uploadMenuOpen, setUploadMenuOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your AI assistant. Upload documents or ask me anything about your client meeting.",
      timestamp: new Date(),
    },
  ]);

  const handleUploadOption = (type: 'image' | 'document' | 'link') => {
    // Mock upload handler - in production this would trigger file pickers or link input
    setMessages(prev => [...prev, {
      role: "assistant",
      content: `Ready to upload ${type}. This is a mock - in production, this would open a ${type} picker.`,
      timestamp: new Date(),
    }]);
    setUploadMenuOpen(false);
  };

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
            <Popover open={uploadMenuOpen} onOpenChange={setUploadMenuOpen}>
              <PopoverTrigger asChild>
                <Button size="icon" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2" align="start">
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => handleUploadOption('image')}
                  >
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => handleUploadOption('document')}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Upload Document
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => handleUploadOption('link')}
                  >
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Add Link
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Input
              placeholder="Ask anything about your meeting..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
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
