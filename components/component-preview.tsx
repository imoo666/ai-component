"use client"

import { Sandpack } from "@codesandbox/sandpack-react"
import type { Component } from "@/lib/types"

interface ComponentPreviewProps {
  component: Component
}

export function ComponentPreview({ component }: ComponentPreviewProps) {
  const files = {
    "/App.js": {
      code:
        component.code ||
        `export default function App() {
        return (
          <div className="p-4">
            <h1>${component.name}</h1>
            <p>${component.description}</p>
          </div>
        )
      }`,
    },
  }

  return (
    <div className="w-full h-full min-h-[400px]">
      <Sandpack
        template="react"
        files={files}
        theme="light"
        options={{
          showNavigator: false,
          showTabs: false,
          showLineNumbers: false,
          showInlineErrors: true,
          wrapContent: true,
          editorHeight: 400,
          layout: "preview", // 只显示预览，不显示编辑器
        }}
      />
    </div>
  )
}
