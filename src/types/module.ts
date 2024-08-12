export type postModuleProps = {
  title: string
  description: string
  lock?: boolean
  open?: string
  trainId: string
}

export type patchModuleProps = {
  id: string
  title?: string
  description?: string
  lock?: boolean
  open?: string
  trainId?: string
}
