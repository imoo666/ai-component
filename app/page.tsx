"use client"

import { Suspense } from "react"
import { ComponentGrid } from "@/components/component-grid"
import { Button } from "@/components/ui/button"
import { Plus, Code, Zap, Sparkles } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const scrollToComponents = () => {
    document.getElementById("components-section")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200/30 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-indigo-200/30 rounded-full blur-xl animate-pulse delay-500" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 min-h-screen flex items-center">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-30 animate-pulse" />
                <div className="relative bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <Code className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                  AI 组件生成器
                </span>
              </h1>
              <div className="flex items-center justify-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                <Zap className="h-4 w-4" />
                <span>智能 • 快速 • 高效</span>
                <Sparkles className="h-4 w-4" />
              </div>
            </div>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              使用 AI 技术快速生成高质量的 React 组件
              <br />
              <span className="text-lg text-gray-500 dark:text-gray-400">让创意变成代码，让想法变成现实</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/create">
                <Button
                  size="lg"
                  className="px-8 py-4 text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  开始创建组件
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToComponents}
                className="px-8 py-4 text-lg font-medium border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <Code className="h-5 w-5 mr-2" />
                浏览组件库
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">AI</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">智能生成</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">React</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">现代框架</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">快速</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">即时预览</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Components Section */}
      <div id="components-section" className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12 text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">组件库</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            浏览和管理你的组件集合，每个组件都经过精心设计和优化
          </p>
        </div>

        <Suspense fallback={<ComponentGridSkeleton />}>
          <ComponentGrid />
        </Suspense>
      </div>
    </div>
  )
}

function ComponentGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-48 bg-muted rounded-lg animate-pulse" />
      ))}
    </div>
  )
}
