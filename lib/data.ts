import type { Component } from "./types"

const mockComponents: Component[] = [
  {
    id: "1",
    name: "用户卡片",
    description: "展示用户信息的卡片组件，包含头像、姓名和描述",
    code: `export default function UserCard({ user }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center space-x-4">
        <img className="w-12 h-12 rounded-full" src={user.avatar || "/placeholder.svg"} alt={user.name} />
        <div>
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-gray-600">{user.role}</p>
        </div>
      </div>
    </div>
  )
}`,
    createdAt: "2024-01-15T10:30:00Z",
    author: "AI Generator",
    downloads: 156,
    likes: 23,
  },
  {
    id: "2",
    name: "登录表单",
    description: "简洁的登录表单，包含用户名、密码输入和提交按钮",
    code: `export default function LoginForm() {
  return (
    <form className="space-y-4 p-6 bg-white rounded-lg shadow-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700">用户名</label>
        <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">密码</label>
        <input type="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
        登录
      </button>
    </form>
  )
}`,
    createdAt: "2024-01-14T15:20:00Z",
    author: "AI Generator",
    downloads: 89,
    likes: 12,
  },
]

const STORAGE_KEY = "saved-components"
const DELETED_MOCK_COMPONENTS_KEY = "deleted-mock-components"

function getStoredComponents(): Component[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Failed to load stored components:", error)
    return []
  }
}

function setStoredComponents(components: Component[]) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(components))
  } catch (error) {
    console.error("Failed to save components:", error)
  }
}

function getDeletedMockComponents(): string[] {
  if (typeof window === "undefined") return []
  try {
    const deleted = localStorage.getItem(DELETED_MOCK_COMPONENTS_KEY)
    return deleted ? JSON.parse(deleted) : []
  } catch (error) {
    console.error("Failed to load deleted mock components:", error)
    return []
  }
}

function setDeletedMockComponents(deletedIds: string[]) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(DELETED_MOCK_COMPONENTS_KEY, JSON.stringify(deletedIds))
  } catch (error) {
    console.error("Failed to save deleted mock components:", error)
  }
}

export async function getComponents(): Promise<Component[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const storedComponents = getStoredComponents()
  const deletedMockIds = getDeletedMockComponents()
  const availableMockComponents = mockComponents.filter((comp) => !deletedMockIds.includes(comp.id))
  return [...availableMockComponents, ...storedComponents]
}

export async function getComponentById(id: string): Promise<Component | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const storedComponents = getStoredComponents()
  const deletedMockIds = getDeletedMockComponents()
  const availableMockComponents = mockComponents.filter((comp) => !deletedMockIds.includes(comp.id))
  const allComponents = [...availableMockComponents, ...storedComponents]
  return allComponents.find((component) => component.id === id) || null
}

export async function saveComponent(componentData: {
  name: string
  description: string
  code: string
  author: string
}): Promise<Component> {
  const newComponent: Component = {
    id: Date.now().toString(),
    ...componentData,
    createdAt: new Date().toISOString(),
    downloads: 0,
    likes: 0,
  }

  const storedComponents = getStoredComponents()
  const updatedComponents = [...storedComponents, newComponent]
  setStoredComponents(updatedComponents)

  return newComponent
}

export async function deleteComponent(id: string): Promise<void> {
  const storedComponents = getStoredComponents()
  const isStoredComponent = storedComponents.some((comp) => comp.id === id)

  if (isStoredComponent) {
    // 删除用户创建的组件
    const updatedComponents = storedComponents.filter((component) => component.id !== id)
    setStoredComponents(updatedComponents)
  } else {
    // 标记预设组件为已删除
    const deletedMockIds = getDeletedMockComponents()
    if (!deletedMockIds.includes(id)) {
      setDeletedMockComponents([...deletedMockIds, id])
    }
  }
}
