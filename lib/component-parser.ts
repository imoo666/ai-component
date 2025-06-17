// 从消息中提取组件代码
export function extractComponentFromMessage(content: string): string {
  const componentMatch = content.match(/\[component\]([\s\S]*?)\[\/component\]/)
  return componentMatch ? componentMatch[1].trim() : ""
}

// 解析组件代码，提取相关信息
export function parseComponentCode(code: string) {
  const componentName = extractComponentName(code)
  const props = extractProps(code)
  const imports = extractImports(code)

  return {
    name: componentName,
    props,
    imports,
    code: code.trim(),
  }
}

// 提取组件名称
function extractComponentName(code: string): string | null {
  // 匹配 function ComponentName 或 const ComponentName =
  const functionMatch = code.match(/(?:export\s+default\s+)?function\s+(\w+)/)
  if (functionMatch) return functionMatch[1]

  const constMatch = code.match(/(?:const|let|var)\s+(\w+)\s*=/)
  if (constMatch) return constMatch[1]

  return null
}

// 提取组件 props
function extractProps(code: string): string[] {
  const propsMatch = code.match(/function\s+\w+\s*\(\s*\{\s*([^}]+)\s*\}/)
  if (!propsMatch) return []

  return propsMatch[1]
    .split(",")
    .map((prop) => prop.trim().split(/[=:]/)[0].trim())
    .filter((prop) => prop.length > 0)
}

// 提取 import 语句
function extractImports(code: string): string[] {
  const importMatches = code.match(/import\s+.*?from\s+['"][^'"]+['"]/g)
  return importMatches || []
}

// 验证组件代码是否有效
export function validateComponentCode(code: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  // 检查是否有组件定义
  if (!extractComponentName(code)) {
    errors.push("未找到有效的组件定义")
  }

  // 检查基本语法
  const openBraces = (code.match(/\{/g) || []).length
  const closeBraces = (code.match(/\}/g) || []).length
  if (openBraces !== closeBraces) {
    errors.push("括号不匹配")
  }

  // 检查是否有 return 语句
  if (!code.includes("return")) {
    errors.push("组件缺少 return 语句")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// 格式化组件代码
export function formatComponentCode(code: string): string {
  // 简单的代码格式化，实际项目中可以使用 prettier
  return code
    .replace(/\s*\{\s*/g, " {\n  ")
    .replace(/\s*\}\s*/g, "\n}\n")
    .replace(/;\s*/g, ";\n  ")
    .trim()
}
