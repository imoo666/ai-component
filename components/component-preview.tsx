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
        options={{
          wrapContent: true,
          editorHeight: 398,
        }}
      />
    </div>
  )
}
