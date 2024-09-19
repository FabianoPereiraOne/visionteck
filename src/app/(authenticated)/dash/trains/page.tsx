import HeaderBody from "@/components/headerBody"
import { AdminPart } from "./parts/adminPart"
import { CollectionPart } from "./parts/collection"

export default async function Trains() {
  return (
    <section>
      <HeaderBody children={<CollectionPart />} btnAdmin={<AdminPart />} />
    </section>
  )
}
