import { Bot, User } from "lucide-react";

interface Props {
  role: "user" | "assistant";
}

export function MessageAvatar({ role }: Props) {
  const Icon = role === "user" ? User : Bot;
  const bg = role === "user" ? "bg-secondary" : "bg-primary";
  const text =
    role === "user" ? "text-secondary-foreground" : "text-primary-foreground";

  return (
    <div
      className={`shrink-0 w-10 h-10 rounded-full ${bg} flex items-center justify-center shadow-md`}
    >
      <Icon className={`h-5 w-5 ${text}`} />
    </div>
  );
}
