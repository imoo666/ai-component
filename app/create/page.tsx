"use client";

import { useState, useRef, useEffect } from "react";
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
import { ChatMessage } from "@/components/chat-message";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  hasComponent?: boolean;
  componentCode?: string;
  isStreaming?: boolean;
  isGenerating?: boolean;
  type?: "chat" | "component";
}

export default function CreatePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "你好！我是 AI 组件生成助手。我可以帮你生成 React 组件或回答你的问题。请告诉我你需要什么！",
      timestamp: new Date(),
      type: "chat",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

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

  const detectMessageType = (input: string): "chat" | "component" => {
    const componentKeywords = [
      "组件",
      "component",
      "按钮",
      "表单",
      "卡片",
      "导航",
      "布局",
      "创建",
      "生成",
      "写一个",
      "做一个",
    ];
    return componentKeywords.some((keyword) =>
      input.toLowerCase().includes(keyword)
    )
      ? "component"
      : "chat";
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const messageType = detectMessageType(input);
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
      type: messageType,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    if (messageType === "component") {
      const loadingMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: new Date(),
        isGenerating: true,
        type: "component",
      };

      setMessages((prev) => [...prev, loadingMessage]);

      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const componentCode = generateComponentCode();

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === loadingMessage.id
              ? {
                  ...msg,
                  content: "",
                  hasComponent: true,
                  componentCode,
                  isGenerating: false,
                }
              : msg
          )
        );
      } catch (error) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === loadingMessage.id
              ? {
                  ...msg,
                  content: "抱歉，生成组件时出现错误，请重试。",
                  isGenerating: false,
                  type: "chat",
                }
              : msg
          )
        );
      }
    } else {
      const streamingMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: new Date(),
        isStreaming: true,
        type: "chat",
      };

      setMessages((prev) => [...prev, streamingMessage]);
      const response = generateChatResponse(input);
      await simulateStreamingResponse(response, streamingMessage.id);
    }

    setIsLoading(false);
  };

  const simulateStreamingResponse = async (
    fullResponse: string,
    messageId: string
  ) => {
    const words = fullResponse.split("");
    let currentContent = "";

    for (let i = 0; i < words.length; i++) {
      currentContent += words[i];
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, content: currentContent } : msg
        )
      );
      await new Promise((resolve) => setTimeout(resolve, 20));
    }

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, isStreaming: false } : msg
      )
    );
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
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
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
