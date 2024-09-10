import { getAllAds } from "@/services/prisma/ads/getAll"
import { TypeAds } from "@/types/ads"
import { adsStyle } from "./style"
import styled from "./style.module.scss"

const BannerAdsense = async () => {
 const listAds: TypeAds[] | null = await getAllAds()

 if (!listAds) return <></>

 return (
  <section className={styled.container}>
   <section className={styled.listAds} style={{ width: `${listAds.length * 100}%` }}>
    {listAds.map((ads) => {
     return (
      <article className={styled.ads} key={ads?.id} style={{ background: `url(${ads?.link})`, ...adsStyle }} />
     )
    })}
   </section>
  </section>
 )
}

export default BannerAdsense