"use server"
import { useParseNumber } from "@/hooks/useParseNumber"
import { useReturnDecoded } from "@/hooks/useReturnDecoded"
import { useVerifyAccessPlan } from "@/hooks/useVerifyAccessPlan"
import { cookieAuth } from "@/schemas/others/config"
import { Collection } from "@/types/collection"
import { cookies } from "next/headers"
import { HeaderPart } from "./parts/header"
import { ListingTrains } from "./parts/listingTrains"

export const CollectionPart = async ({ data }: { data: Collection }) => {
  const { verifyAccess } = useVerifyAccessPlan()
  const auth = cookies().get(cookieAuth)?.value
  const user = await useReturnDecoded(auth)
  const userPlan = useParseNumber(`${user?.planId}`)

  const trains = data?.trains?.map(train => {
    const plan = useParseNumber(`${train?.planId}`)

    if (verifyAccess(userPlan, plan)) return { ...train, lock: false }

    return { ...train, lock: true }
  })

  return (
    <div>
      <HeaderPart
        id={data?.id}
        title={data?.title}
        themeColor={data?.themeColor}
      />
      <ListingTrains data={trains} />
    </div>
  )
}
