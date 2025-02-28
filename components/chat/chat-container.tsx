"use client";


import { useState } from "react";
import { ChatMessage } from "@/components/chat/chat-message";
import { ChatInput } from "@/components/chat/chat-input";

export function ChatContainer() {
  const [messages, setMessages] = useState<Array<{
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: string;
  }>>([]);
  
  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    try {
      // Call the Next.js API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      });

      // Check if the response is okay
      if (!response.ok) {
        throw new Error("Failed to fetch assistant response");
      }

      // Get the assistant's response from the API
      const data = await response.json();

      // Add assistant's response to messages
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: data.answer || "Sorry, I couldn't find an answer.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: "Sorry, something went wrong while processing your request.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto">
          {messages.length > 0 ? (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="bg-[#F5F5F5] rounded-lg p-6 max-w-md">
                <h3 className="text-xl font-semibold mb-2">Welcome to FIDO Q&A Assistant</h3>
                <p className="text-muted-foreground">
                  Ask any question about FIDO to get started.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-3xl mx-auto w-full">
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
}
