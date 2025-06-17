"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, User, Copy, Save } from "lucide-react"
import { ComponentPreview } from "./component-preview"
import { SaveComponentDialog } from "./save-component-dialog"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  hasComponent?: boolean
  componentCode?: string
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
    if (!message.hasComponent) {
      return <div className="whitespace-pre-wrap">{message.content}</div>
    }

    const textContent = message.content
      .split(/\[component\][\s\S]*?\[\/component\]/)
      .join("")
      .trim()

    return (
      <div className="space-y-6">
        {textContent && <div className="whitespace-pre-wrap">{textContent}</div>}
        {message.componentCode && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Badge variant="secondary">组件代码</Badge>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(message.componentCode!)}
                  className="gap-2"
                >
                  <Copy className="h-4 w-4" />
                  {copied ? "已复制" : "复制"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowSaveDialog(true)} className="gap-2">
                  <Save className="h-4 w-4" />
                  保存
                </Button>
              </div>
            </div>
            <div className="border rounded-lg p-6 bg-white h-[400px] overflow-auto">
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
            <SaveComponentDialog
              open={showSaveDialog}
              onOpenChange={setShowSaveDialog}
              componentCode={message.componentCode}
            />
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className={`flex gap-4 ${message.role === "user" ? "justify-end" : ""}`}>
      {message.role === "assistant" && (
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <Bot className="h-5 w-5 text-primary-foreground" />
        </div>
      )}
      <div className={`max-w-[85%] ${message.role === "user" ? "order-first" : ""}`}>
        <div
          className={`rounded-lg p-6 ${
            message.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
          }`}
        >
          {renderContent()}
        </div>
        <div className={`text-xs text-muted-foreground mt-2 ${message.role === "user" ? "text-right" : ""}`}>
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
      {message.role === "user" && (
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
          <User className="h-5 w-5 text-secondary-foreground" />
        </div>
      )}
    </div>
  )
}
