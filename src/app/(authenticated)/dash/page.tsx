import BannerAdsense from "@/components/bannerAdsense"
import ButtonAds from "@/components/bannerAdsense/parts/buttonAds"
import HeaderBody from "@/components/headerBody"
import Notes from "@/components/notes"
import { useReturnDecoded } from "@/hooks/useReturnDecoded"
import { cookieAuth } from "@/schemas/others/config"
import { cookies } from "next/headers"
import styled from "./style.module.scss"

export default async function Dash() {
  const auth = cookies().get(cookieAuth)?.value
  const user = await useReturnDecoded(auth)

  const title = `👋 Olá, ${user && user?.name}`

  return (
    <main className={styled.main}>
      <HeaderBody title={title} btnAdmin={<ButtonAds />} />
      <BannerAdsense />
      <Notes />
    </main>
  )
}
