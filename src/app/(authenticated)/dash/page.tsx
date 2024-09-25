import BannerAdSense from "@/components/bannerAdSense"
import ButtonAds from "@/components/bannerAdSense/parts/buttonAds"
import HeaderBody from "@/components/headerBody"
import Notes from "@/components/notes"
import { useVerifyAdmin } from "@/hooks/useVerifyAdmin"
import { getAllAds } from "@/services/prisma/ads/getAll"
import { TypeAds } from "@/types/ads"
import styled from "./style.module.scss"

export default async function Dash() {
  const { isAdmin, data } = await useVerifyAdmin()
  const listAds: TypeAds[] = await getAllAds()

  return (
    <main className={styled.main}>
      <HeaderBody
        isAdmin={isAdmin}
        user={data}
        enableUserTitle={true}
        btnAdmin={<ButtonAds listAds={listAds} />}
      />
      <BannerAdSense listAds={listAds} />
      <Notes isAdmin={isAdmin} />
    </main>
  )
}
