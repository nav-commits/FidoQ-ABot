import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { BotIcon, User } from "lucide-react";

interface ChatMessageProps {
  message: {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: string;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  
  return (
    <div className={cn(
      "flex items-start gap-4 py-4",
      isUser ? "justify-start" : "justify-start"
    )}>
      <Avatar className={cn(
        "h-8 w-8 flex items-center justify-center",
        isUser ? "bg-primary" : "bg-[#0066CC]"
      )}>
        {isUser ? (
          <User className="h-4 w-4 text-white" />
        ) : (
          <BotIcon className="h-4 w-4 text-white" />
        )}
      </Avatar>
      
      <div className="flex flex-col gap-1 max-w-[80%]">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {isUser ? "You" : "FIDO Assistant"}
          </span>
          <span className="text-xs text-muted-foreground">
            {message.timestamp}
          </span>
        </div>
        
        <div className={cn(
          "rounded-lg p-3",
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-[#F5F5F5] text-[#333333]"
        )}>
          <p className="whitespace-pre-wrap text-sm">
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
}