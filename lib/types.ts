export interface Component {
  id: string
  name: string
  description: string
  code: string
  createdAt: string
  updatedAt?: string
  author: string
  downloads?: number
  likes?: number
}
