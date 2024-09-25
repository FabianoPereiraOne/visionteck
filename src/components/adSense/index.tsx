"use server"
import { TypeAds } from "@/types/ads"
import CarouselAds from "./parts/carouselAds"
import styled from "./style.module.scss"

const BannerAdSense = async ({ listAds }: { listAds: TypeAds[] }) => {
  if (listAds?.length <= 0) return <></>

  return (
    <section className={styled.container}>
      <CarouselAds listAds={listAds} />
    </section>
  )
}

export default BannerAdSense
