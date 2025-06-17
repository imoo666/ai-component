"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { saveComponent } from "@/lib/data"
import { toast } from "sonner"

interface SaveComponentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  componentCode: string
}

export function SaveComponentDialog({ open, onOpenChange, componentCode }: SaveComponentDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!name.trim() || !description.trim()) {
      toast.error("请填写完整信息")
      return
    }

    setSaving(true)
    try {
      await saveComponent({
        name: name.trim(),
        description: description.trim(),
        code: componentCode,
        author: "用户创建",
      })

      toast.success("组件保存成功！")
      onOpenChange(false)
      setName("")
      setDescription("")
    } catch (error) {
      toast.error("保存失败，请重试")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>保存组件</DialogTitle>
          <DialogDescription>填写组件信息以保存到本地组件库</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">组件名称</Label>
            <Input id="name" placeholder="输入组件名称" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">组件描述</Label>
            <Textarea
              id="description"
              placeholder="描述组件的功能和用途"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "保存中..." : "保存组件"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
