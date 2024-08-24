import { schemaAssets } from "@/schemas/others/assets"

export const useLoadTitle = ({
  title,
  description
}: {
  title: string
  description?: string
}) => ({
  title,
  description,
  icons: {
    icon: schemaAssets.general.favicon
  }
})
