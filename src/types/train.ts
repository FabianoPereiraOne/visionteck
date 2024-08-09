export type PostTrainProps = {
  title: string
  description: string
  linkCover: string
  collectionId: number
}

export type patchTrainProps = {
  id: string
  title?: string
  description?: string
  linkCover?: string
  collectionId?: number
}
