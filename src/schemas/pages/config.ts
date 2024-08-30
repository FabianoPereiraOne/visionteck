import { Inter } from "next/font/google"
import { schemaAssets } from "../others/assets"

export const InterFont = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"]
})

export const MetaDataPage = ({
  title,
  description
}: {
  title: string
  description?: string
}) => {
  return {
    title: `${title} | Vision Teck`,
    description: description
      ? description
      : "Vision Teck investindo em um mundo melhor",
    icons: {
      icon: schemaAssets.general.favicon
    }
  }
}
