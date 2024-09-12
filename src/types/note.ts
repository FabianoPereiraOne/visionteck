import { Bullet } from "@prisma/client"

export type PostNoteProps = {
  title: string
  description: string
  bullet?: Bullet
  bulletColor?: string
}

export type PatchNoteProps = {
  id: number
  title?: string
  description?: string
  bullet?: Bullet
  bulletColor?: string
}

export type NoteProps = {
  id: number
  title: string
  description: string
  bullet: Bullet
  bulletColor: string
  createdAt: Date
  updatedAt: Date
}
