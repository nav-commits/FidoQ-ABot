import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { ChatContainer } from "@/components/chat/chat-container";

export default function Home() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 h-full hidden md:block">
        <ChatSidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full">
        <header className="h-14 border-b flex items-center px-4 md:px-6">
          <h1 className="text-lg font-semibold">FIDO Q&A Assistant</h1>
        </header>
        
        <main className="flex-1 overflow-hidden">
          <ChatContainer />
        </main>
      </div>
    </div>
  );
}