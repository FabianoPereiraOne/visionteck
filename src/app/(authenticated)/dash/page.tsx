import BannerAdsense from "@/components/bannerAdsense"
import ButtonAds from "@/components/bannerAdsense/parts/buttonAds"
import HeaderBody from "@/components/headerBody"
import Notes from "@/components/notes"
import styled from "./style.module.scss"

export default async function Dash() {
  return (
    <main className={styled.main}>
      <HeaderBody enableUserTitle={true} btnAdmin={<ButtonAds />} />
      <BannerAdsense />
      <Notes />
    </main>
  )
}
