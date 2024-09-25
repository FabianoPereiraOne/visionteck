import BannerAdsense from "@/components/bannerAdsense"
import ButtonAds from "@/components/bannerAdsense/parts/buttonAds"
import HeaderBody from "@/components/headerBody"
import Notes from "@/components/notes"
import { useVerifyAdmin } from "@/hooks/useVerifyAdmin"
import styled from "./style.module.scss"

export default async function Dash() {
  const { isAdmin, data } = await useVerifyAdmin()

  return (
    <main className={styled.main}>
      <HeaderBody
        isAdmin={isAdmin}
        user={data}
        enableUserTitle={true}
        btnAdmin={<ButtonAds />}
      />
      <BannerAdsense />
      <Notes isAdmin={isAdmin} />
    </main>
  )
}
