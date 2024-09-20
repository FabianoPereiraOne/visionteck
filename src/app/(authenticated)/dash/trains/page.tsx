import HeaderBody from "@/components/headerBody"
import { AdminPart } from "./parts/adminPart"
import { ListingCollections } from "./parts/listingCollections"
import { TitlePart } from "./parts/titlePart"

export default async function Trains() {
  return (
    <section>
      <HeaderBody children={<TitlePart />} btnAdmin={<AdminPart />} />
      <ListingCollections />
    </section>
  )
}
