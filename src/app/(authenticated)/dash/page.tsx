import BannerAdsense from "@/components/bannerAdsense"
import HeaderBody from "@/components/headerBody"
import Notes from "@/components/notes"
import styled from "./style.module.scss"

export default async function Dash() {
  return (
    <main className={styled.main}>
      <HeaderBody />
      <BannerAdsense />
      <Notes />
    </main>
  )
}
