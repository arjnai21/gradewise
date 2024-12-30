'use client';

import { useChat } from 'ai/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { useEffect, useRef } from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      {
        role: "assistant",
        content: "Welcome to your CMSC131 exam #1.",
        id: "1"
      },
      {
        role: "assistant",
        content: "Please be advised the full message transcript will be sent to your professor for grading.",
        id: "3"
      },
      {
        role: "assistant",
        content: "Are you ready?",
        id: "2"
      }
    ]
});
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = scrollRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  }, [messages]);

  return (
    <Card className="min-h-screen border-none rounded-none">
      {/* Header */}
      <CardHeader className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-4xl mx-auto w-full">
          <CardTitle className="text-2xl">CMSC131 Exam #1</CardTitle>
          <CardDescription>Good luck!</CardDescription>
        </div>
      </CardHeader>

      {/* Main content */}
      <CardContent className="flex-1 p-0">
        <ScrollArea ref={scrollRef} className="h-[calc(100vh-10rem)] px-4">
          <div className="max-w-4xl mx-auto py-6 space-y-4">
            {messages.map(m => (
              <div 
                key={m.id} 
                className={`flex gap-3 ${
                  m.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.role !== 'user' && (
                  <Avatar>
                    <AvatarFallback>AI</AvatarFallback>
                    <AvatarImage src="/ai-avatar.png" />
                  </Avatar>
                )}
                <Card className={`max-w-[80%] ${
                  m.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : ''
                }`}>
                  <CardContent className="p-3">
                    <p className="text-sm font-medium">
                      {m.role === 'user' ? 'You' : 'Examiner'}
                    </p>
                    <p className="whitespace-pre-wrap">
                      {m.content}
                    </p>
                  </CardContent>
                </Card>
                {m.role === 'user' && (
                  <Avatar>
                    <AvatarFallback>You</AvatarFallback>
                    <AvatarImage src="/user-avatar.png" />
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>

      {/* Footer with input */}
      <CardFooter className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto w-full flex gap-2">
          <Input
            value={input}
            placeholder="Type your answer here..."
            onChange={handleInputChange}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}