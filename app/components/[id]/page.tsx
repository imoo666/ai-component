"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ComponentPreview } from "@/components/component-preview"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Calendar, User, Home, Trash2 } from "lucide-react"
import { getComponentById, deleteComponent } from "@/lib/data"
import { toast } from "sonner"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import type { Component } from "@/lib/types"

interface ComponentPageProps {
  params: { id: string }
}

export default function ComponentPage({ params }: ComponentPageProps) {
  const [component, setComponent] = useState<Component | null>(null)
  const [loading, setLoading] = useState(true)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const loadComponent = async () => {
      try {
        const data = await getComponentById(params.id)
        setComponent(data)
      } catch (error) {
        console.error("Failed to load component:", error)
      } finally {
        setLoading(false)
      }
    }

    loadComponent()
  }, [params.id])

  const handleConfirmDelete = async () => {
    if (!component) return

    setDeleting(true)
    try {
      await deleteComponent(component.id)
      toast.success("组件删除成功")
      router.push("/")
    } catch (error) {
      toast.error("删除失败，请重试")
    } finally {
      setDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-4 bg-muted rounded w-48" />
            <div className="h-8 bg-muted rounded w-64" />
            <div className="h-96 bg-muted rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (!component) {
    return (
      <div className="min-h-screen bg-background px-6 py-8">
        <div className="max-w-6xl mx-auto text-center py-12">
          <p className="text-muted-foreground">组件未找到</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-background px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  首页
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{component.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <header className="flex items-start justify-between">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">{component.name}</h1>
              <p className="text-lg text-muted-foreground">{component.description}</p>
              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {component.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(component.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            <Button
              variant="destructive"
              onClick={() => setShowDeleteDialog(true)}
              className="gap-2"
              disabled={deleting}
            >
              <Trash2 className="h-4 w-4" />
              删除组件
            </Button>
          </header>

          <Card>
            <CardHeader>
              <CardTitle>组件预览</CardTitle>
            </CardHeader>
            <CardContent className="border rounded-lg p-8 bg-white min-h-[500px]">
              <ComponentPreview component={component} />
            </CardContent>
          </Card>
        </div>
      </div>

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleConfirmDelete}
        componentName={component.name}
      />
    </>
  )
}
