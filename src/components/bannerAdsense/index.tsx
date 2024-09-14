import { getAllAds } from "@/services/prisma/ads/getAll"
import { TypeAds } from "@/types/ads"
import CarouselAds from "./parts/carouselAds"
import styled from "./style.module.scss"

const BannerAdsense = async () => {
  const listAds: TypeAds[] = await getAllAds()

  if (listAds?.length <= 0) return <></>

  return (
    <section className={styled.container}>
      <CarouselAds listAds={listAds} />
    </section>
  )
}

export default BannerAdsense
