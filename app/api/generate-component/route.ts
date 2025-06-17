"use client"

import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    // 这里集成你的 Dify API
    // const difyResponse = await fetch('YOUR_DIFY_API_ENDPOINT', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.DIFY_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     inputs: {
    //       query: message,
    //       conversation_id: '', // 如果需要保持对话上下文
    //     },
    //     response_mode: 'blocking',
    //     user: 'user-id'
    //   })
    // })

    // const result = await difyResponse.json()

    // 模拟 Dify 响应
    const mockResponse = {
      content: generateMockAIResponse(message),
      conversation_id: "mock-conversation-id",
    }

    return NextResponse.json(mockResponse)
  } catch (error) {
    console.error("Error calling Dify API:", error)
    return NextResponse.json({ error: "Failed to generate component" }, { status: 500 })
  }
}

function generateMockAIResponse(message: string): string {
  const responses = [
    `我来为你创建一个${message}组件。

[component]
export default function CustomButton({ children, variant = "primary", size = "md", onClick, disabled = false }) {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50 focus:ring-gray-500"
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base", 
    lg: "px-6 py-3 text-lg"
  }
  
  return (
    <button
      className={\`\${baseClasses} \${variants[variant]} \${sizes[size]} \${disabled ? 'opacity-50 cursor-not-allowed' : ''}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
[/component]

这个按钮组件支持多种样式变体和尺寸，你可以根据需要进行调整。需要我修改什么地方吗？`,

    `好的，我为你创建一个表单组件：

[component]
export default function ContactForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-6 bg-white rounded-lg shadow-lg">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          姓名
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          邮箱
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          消息
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        提交
      </button>
    </form>
  )
}
[/component]

这个联系表单包含了姓名、邮箱和消息字段，具有基本的验证和样式。你想要添加其他字段或修改样式吗？`,
  ]

  return responses[Math.floor(Math.random() * responses.length)]
}
