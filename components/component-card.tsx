import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Calendar } from "lucide-react"
import Link from "next/link"
import type { Component } from "@/lib/types"

interface ComponentCardProps {
  component: Component
}

export function ComponentCard({ component }: ComponentCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardHeader className="pb-4">
        <div className="space-y-3">
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {component.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{component.description}</p>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{new Date(component.createdAt).toLocaleDateString()}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-4 border-t flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {component.author}
          </Badge>
        </div>
        <Link href={`/components/${component.id}`}>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Eye className="h-4 w-4" />
            查看详情
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
