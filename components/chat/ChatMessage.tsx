"use client";

import { Message } from "./types";
import { MessageAvatar } from "./MessageAvatar";
import { MessageContent } from "./MessageContent";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-4 ${isUser && "justify-end"}`}>
      {!isUser && <MessageAvatar role="assistant" />}
      <div
        className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}
      >
        <MessageContent message={message} />
      </div>
      {isUser && <MessageAvatar role="user" />}
    </div>
  );
}
