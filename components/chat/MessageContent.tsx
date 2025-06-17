import { Message } from "./types";
import { ComponentCard } from "./ComponentCard";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // 可替换为喜欢的主题样式

interface Props {
  message: Message;
}

export function MessageContent({ message }: Props) {
  if (message.type === "component") {
    if (message.isStreaming) {
      return (
        <div className="rounded-2xl px-4 py-3 shadow-sm bg-muted/80 backdrop-blur-sm flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span>正在生成组件...</span>
        </div>
      );
    }
    return <ComponentCard message={message} />;
  }

  if (message.isStreaming && !message.content) {
    return (
      <div className="rounded-2xl px-4 py-3 shadow-sm bg-muted/80 backdrop-blur-sm flex items-center gap-2 text-xs text-muted-foreground">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        <span>正在思考...</span>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl px-4 py-3 shadow-sm ${
        message.role === "user"
          ? "bg-primary text-primary-foreground ml-auto"
          : "bg-muted/80 backdrop-blur-sm"
      }`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {message.content}
      </ReactMarkdown>
    </div>
  );
}
