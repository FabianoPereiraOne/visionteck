"use server"
import { useParseNumber } from "@/hooks/useParseNumber"
import { useVerifyAccessPlan } from "@/hooks/useVerifyAccessPlan"
import { Collection } from "@/types/collection"
import { Train } from "@/types/train"
import { dataUser } from "@/types/user"
import { HeaderPart } from "./parts/header"
import { ListingTrains } from "./parts/listingTrains"

export const CollectionPart = async ({
  data,
  user,
  listTrains
}: {
  data: Collection
  user: dataUser
  listTrains: Train[]
}) => {
  const { verifyAccess } = useVerifyAccessPlan()
  const userPlan = useParseNumber(`${user?.planId}`)

  const trains = data?.trains?.map(train => {
    const plan = useParseNumber(`${train?.planId}`)

    if (verifyAccess(userPlan, plan)) return { ...train, lock: false }

    return { ...train, lock: true }
  })

  return (
    <section>
      <HeaderPart title={data?.title} themeColor={data?.themeColor} />
      <ListingTrains data={trains} listTrains={listTrains} />
    </section>
  )
}
