import HeaderBody from "@/components/headerBody"
import { Metadata } from "next"
import { AdminPart } from "./parts/adminPart"
import { ListingCollections } from "./parts/listingCollections"
import { TitlePart } from "./parts/titlePart"

export const metadata: Metadata = {
  title: "Trilhas | Vision Teck",
  description: "Vision Teck investindo em um mundo melhor",
  icons: {
    icon: "/assets/favicon.png"
  }
}

export default async function Trains() {
  return (
    <section>
      <HeaderBody children={<TitlePart />} btnAdmin={<AdminPart />} />
      <ListingCollections />
    </section>
  )
}
