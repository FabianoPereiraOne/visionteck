export type PostAdsProps = {
  title: string
  description: string
  link: string
}

export type PatchAdsProps = {
  id: string
  title?: string
  description?: string
  link?: string
}
