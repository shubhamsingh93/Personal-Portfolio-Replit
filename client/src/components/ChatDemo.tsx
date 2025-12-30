import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
}

interface ChatDemoProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const SUGGESTIONS = [
  "Find Python Courses",
  "My Progress", 
  "Recommend certifications",
  "How to learn React?"
];

export function ChatDemo({ isOpen, onOpenChange }: ChatDemoProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      text: "Hi, I'm your Learning Assistant using Llama 3. How can I help you upskill today?"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: text
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "I can definitely help with that! Based on your profile, here are some tailored recommendations.";
      
      if (text.includes("Python")) {
        botResponse = "Great choice! Python is versatile. I found 3 top-rated courses for you:\n1. Python for Data Science (Coursera)\n2. Complete Python Bootcamp (Udemy)\n3. Google's Python Class (Free)";
      } else if (text.includes("Progress")) {
        botResponse = "You're doing great! You've completed 28% of your current learning path. Keep up the momentum to reach your weekly goal.";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        text: botResponse
      };
      
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-background border-border shadow-2xl rounded-2xl gap-0">
        {/* Header */}
        <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Learning Assistant AI</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-xs text-muted-foreground">Llama 3 • Online</p>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="rounded-full hover:bg-muted">
            <X className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>

        {/* Chat Area */}
        <ScrollArea className="h-[400px] p-4 bg-muted/5" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === "bot" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                }`}>
                  {msg.role === "bot" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                
                <div className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
                  msg.role === "bot" 
                    ? "bg-white border border-border shadow-sm text-foreground rounded-tl-none" 
                    : "bg-primary text-primary-foreground rounded-tr-none shadow-md"
                }`}>
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i} className={i > 0 ? "mt-1" : ""}>{line}</p>
                  ))}
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-border rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>

        {/* Suggestions */}
        <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar border-t border-border/50 bg-background/50">
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSendMessage(suggestion)}
              className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full bg-primary/5 hover:bg-primary/10 text-primary border border-primary/10 transition-colors whitespace-nowrap"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-background">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              className="rounded-full bg-muted/20 border-border focus-visible:ring-primary/20"
            />
            <Button 
              size="icon" 
              onClick={() => handleSendMessage(inputValue)}
              className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shrink-0 shadow-lg shadow-primary/20 transition-transform active:scale-95"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
