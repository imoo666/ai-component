import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, User, Tag } from "lucide-react"
import type { Component } from "@/lib/types"

interface ComponentInfoProps {
  component: Component
}

export function ComponentInfo({ component }: ComponentInfoProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>组件信息</CardTitle>
          <CardDescription>详细信息和元数据</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>作者: {component.author}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>创建时间: {new Date(component.createdAt).toLocaleDateString()}</span>
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 text-sm mb-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span>标签</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {component.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>使用说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>1. 点击"下载代码"获取组件源码</p>
            <p>2. 将代码复制到你的项目中</p>
            <p>3. 根据需要调整样式和功能</p>
            <p>4. 确保安装所需的依赖包</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
