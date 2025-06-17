"use client"

import { useState, useEffect } from "react"
import { ComponentCard } from "./component-card"
import { getComponents } from "@/lib/data"
import type { Component } from "@/lib/types"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ComponentGrid() {
  const [components, setComponents] = useState<Component[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadComponents = async () => {
      try {
        const data = await getComponents()
        setComponents(data)
      } catch (error) {
        console.error("Failed to load components:", error)
      } finally {
        setLoading(false)
      }
    }
    loadComponents()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-48 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  if (components.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <Plus className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">还没有组件</h3>
          <p className="text-muted-foreground">开始创建你的第一个 AI 生成组件吧！</p>
          <Link href="/create">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              创建组件
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {components.map((component) => (
        <ComponentCard key={component.id} component={component} />
      ))}
    </div>
  )
}
