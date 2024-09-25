import { Module } from "./module"

export type PostTrainProps = {
  title: string
  description: string
  linkCover: string
  collectionId: number
  planId: number
}

export type patchTrainProps = {
  id: string
  title?: string
  description?: string
  linkCover?: string
  collectionId?: number
  planId?: number
}

export type Train = {
  id: string
  title: string
  description: string
  linkCover: string
  collectionId: number | null
  createdAt: Date
  updatedAt: Date
  modules: Module[]
  planId: number
  lock: boolean
}
