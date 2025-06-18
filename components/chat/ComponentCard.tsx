import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Save } from "lucide-react";
import { Message } from "./types";
import { ComponentPreview } from "../component-preview";
import { SaveComponentDialog } from "../save-component-dialog";

interface Props {
  message: Message;
}

export function ComponentCard({ message }: Props) {
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent overflow-hidden w-full">
      <div className="p-4 border-b bg-primary/5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Badge variant="default" className="bg-primary">
            🔧 React 组件
          </Badge>
          <span className="text-sm text-muted-foreground">AI 生成</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Copy className="h-3 w-3 mr-1" />
            复制
          </Button>
          {/* <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSaveDialog(true)}
          >
            <Save className="h-3 w-3 mr-1" />
            保存
          </Button> */}
        </div>
      </div>
      <div className="p-4">
        <div className="border rounded-lg bg-white h-[400px] overflow-auto">
          <ComponentPreview
            component={{
              id: message.id,
              name: "Generated Component",
              description: "AI 生成的组件",
              code: message.content!,
              createdAt: message.timestamp.toISOString(),
              author: "AI Generator",
            }}
          />
        </div>
      </div>
      <SaveComponentDialog
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
        componentCode={message.componentCode!}
      />
    </Card>
  );
}
