export interface Message {
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
