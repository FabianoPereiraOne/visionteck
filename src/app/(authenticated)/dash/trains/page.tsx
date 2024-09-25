import HeaderBody from "@/components/headerBody"
import { useVerifyAdmin } from "@/hooks/useVerifyAdmin"
import { getAllPlans } from "@/services/prisma/plans/getAll"
import { Collection } from "@/types/collection"
import { fetchAllCollections } from "@/utils/fetch/collections/getAll"
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
  const { isAdmin, data } = await useVerifyAdmin()

  const result = await fetchAllCollections()
  const response = await result?.json()
  const listData: Collection[] = response?.data ?? []
  const trains = listData?.map(collection => collection?.trains).flat()
  const plans = await getAllPlans()

  return (
    <section>
      <HeaderBody
        user={data}
        isAdmin={isAdmin}
        children={<TitlePart collections={listData} />}
        btnAdmin={
          <AdminPart collections={listData} plans={plans} trains={trains} />
        }
      />
      <ListingCollections user={data} listData={listData} />
    </section>
  )
}
