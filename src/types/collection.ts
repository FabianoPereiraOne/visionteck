import { Train } from "./train"

export type postCollectionProps = {
  title: string
  description: string
  themeColor: string
}

export type patchCollectionProps = {
  id: number
  title?: string
  description?: string
  themeColor?: string
}

export type Collection = {
  id: number
  title: string
  description: string
  themeColor: string
  createdAt: Date
  updatedAt: Date
  trains: Train[]
}
