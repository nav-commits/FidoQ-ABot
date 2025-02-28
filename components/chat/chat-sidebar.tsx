"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlusCircle, MessageSquare, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SAMPLE_CHATS } from "@/lib/constants";

export function ChatSidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredChats = SAMPLE_CHATS.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-col bg-[#F5F5F5] border-r">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Image 
            src="https://images.ctfassets.net/h6ysm004d16d/4CCvNoS568VcxRAI26oLji/03a6f95101762614b9d823bb6bde3d43/en.png" 
            alt="FIDO Logo" 
            width={100} 
            height={40} 
            className="mr-2"
          />
          <h2 className="text-xl font-semibold text-[#333333]">FIDO Q&A</h2>
        </div>
      </div>
      
      <div className="p-4">
        <Button 
          className="w-full bg-[#ffe600] hover:bg-[#e6cf00] text-black"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>
      
      <div className="px-4 mb-2">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations"
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="px-2">
          <h3 className="px-2 py-1 text-sm font-medium text-muted-foreground">Recent Conversations</h3>
          <div className="space-y-1">
            {filteredChats.map((chat) => (
              <Button
                key={chat.id}
                variant="ghost"
                className="w-full justify-start font-normal"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                <span className="truncate">{chat.title}</span>
                <span className="ml-auto text-xs text-muted-foreground">{chat.date}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t">
        <div className="text-xs text-muted-foreground text-center">
          Powered by FIDO Alliance
        </div>
      </div>
    </div>
  );
}