"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [input, setInput] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="flex items-end gap-2">
        <Textarea
          placeholder="Ask a question about FIDO..."
          className="min-h-[60px] resize-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <Button 
          type="submit" 
          size="icon" 
          className="bg-[#0066CC] hover:bg-[#0055AA]"
          disabled={!input.trim()}
        >
          <SendIcon className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}