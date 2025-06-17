"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, User, Copy, Save, Loader2 } from "lucide-react"
import { ComponentPreview } from "./component-preview"
import { SaveComponentDialog } from "./save-component-dialog"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  hasComponent?: boolean
  componentCode?: string
  isStreaming?: boolean
  isGenerating?: boolean
  type?: "chat" | "component"
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false)
  const [showSaveDialog, setShowSaveDialog] = useState(false)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const renderContent = () => {
    if (message.isGenerating) {
      return (
        <div className="flex items-center gap-3 py-4">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <div className="space-y-1">
            <div className="text-sm font-medium">正在生成组件...</div>
            <div className="text-xs text-muted-foreground">AI 正在为你创建高质量的 React 组件</div>
          </div>
        </div>
      )
    }

    if (message.type === "component" && message.hasComponent && message.componentCode) {
      return (
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent overflow-hidden">
          <div className="p-4 border-b bg-primary/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="bg-primary">
                  🔧 React 组件
                </Badge>
                <span className="text-sm text-muted-foreground">AI 生成</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(message.componentCode!)}
                  className="gap-2 h-8"
                >
                  <Copy className="h-3 w-3" />
                  {copied ? "已复制" : "复制"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowSaveDialog(true)} className="gap-2 h-8">
                  <Save className="h-3 w-3" />
                  保存
                </Button>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="border rounded-lg bg-white overflow-hidden">
              <div className="h-[400px] overflow-auto">
                <ComponentPreview
                  component={{
                    id: message.id,
                    name: "Generated Component",
                    description: "AI 生成的组件",
                    code: message.componentCode,
                    createdAt: message.timestamp.toISOString(),
                    author: "AI Generator",
                  }}
                />
              </div>
            </div>
          </div>
          <SaveComponentDialog
            open={showSaveDialog}
            onOpenChange={setShowSaveDialog}
            componentCode={message.componentCode}
          />
        </Card>
      )
    }

    if (message.isStreaming && message.content) {
      return (
        <div className="space-y-2">
          <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span>正在输入...</span>
          </div>
        </div>
      )
    }

    return <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
  }

  if (message.type === "component" && message.role === "assistant" && !message.isGenerating) {
    return (
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-md">
          <Bot className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="w-full">{renderContent()}</div>
          <div className="text-xs text-muted-foreground px-2">{message.timestamp.toLocaleTimeString()}</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex gap-4 ${message.role === "user" ? "justify-end" : ""}`}>
      {message.role === "assistant" && (
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-md">
          <Bot className="h-5 w-5 text-primary-foreground" />
        </div>
      )}
      <div className={`w-full ${message.role === "user" ? "order-first flex justify-end" : "flex justify-start"}`}>
        <div className="space-y-2 max-w-[85%]">
          <div
            className={`rounded-2xl px-4 py-3 shadow-sm ${message.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted/80 backdrop-blur-sm"}`}
          >
            {renderContent()}
          </div>
          <div className={`text-xs text-muted-foreground px-2 ${message.role === "user" ? "text-right" : ""}`}>
            {message.timestamp.toLocaleTimeString()}
          </div>
        </div>
      </div>
      {message.role === "user" && (
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 shadow-md">
          <User className="h-5 w-5 text-secondary-foreground" />
        </div>
      )}
    </div>
  )
}
