"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Send, Bot, Home } from "lucide-react";
import { streamFromDify } from "@/lib/dify";
import { ChatMessage } from "@/components/chat/ChatMessage";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  type?: "chat" | "component";
}

export default function CreatePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "你好！我是 AI 组件生成助手，我可以帮你生成 React 组件，请告诉我你需要什么！",
      timestamp: new Date(),
      type: "chat",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [chatId, setChatId] = useState<string>();

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const question = input.trim();
    setInput("");
    setIsLoading(true);

    appendUserMessage(question);
    appendAssistantStream();

    await streamFromDify({
      query: question,
      chatId,
      onDelta: appendDelta,
      onDone: markStreamDone,
      onError: showStreamError,
      setChatId,
      changeToComponentMode: () => {
        setMessages((prev) => [
          ...prev.slice(0, -1),
          {
            ...prev.at(-1)!,
            type: "component",
          },
        ]);
      },
    });

    setIsLoading(false);
  };

  const appendUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: text,
        timestamp: new Date(),
        type: "chat",
      },
    ]);
  };

  const appendAssistantStream = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "",
        timestamp: new Date(),
        isStreaming: true,
        type: "chat",
      },
    ]);
  };

  const appendDelta = (delta: string) => {
    setMessages((prev) => {
      const last = prev.at(-1)!;
      return [...prev.slice(0, -1), { ...last, content: last.content + delta }];
    });
  };

  const markStreamDone = () => {
    setMessages((prev) => {
      const last = prev.at(-1)!;
      return [...prev.slice(0, -1), { ...last, isStreaming: false }];
    });
  };

  const showStreamError = () => {
    setMessages((prev) => [
      ...prev.slice(0, -1),
      {
        ...prev.at(-1)!,
        content: "⚠️ AI 出错了，请稍后重试。",
        isStreaming: false,
      },
    ]);
  };

  return (
    <div className="h-screen bg-background px-6 py-8 flex flex-col">
      <div className="max-w-6xl mx-auto w-full flex flex-col h-full space-y-8">
        <Breadcrumb className="flex-shrink-0">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                首页
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>AI 助手</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Card className="flex-1 flex flex-col min-h-0">
          <CardHeader className="border-b flex-shrink-0">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI 智能助手
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0 min-h-0">
            <ScrollArea ref={scrollAreaRef} className="flex-1 px-8">
              <div className="space-y-6 py-6">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
              </div>
            </ScrollArea>

            <div className="border-t p-6 flex-shrink-0 flex gap-3">
              <Input
                placeholder="输入你的问题或描述想要的组件..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
