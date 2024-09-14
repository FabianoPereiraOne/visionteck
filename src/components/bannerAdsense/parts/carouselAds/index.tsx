"use client"
import { TypeAds } from "@/types/ads"
import { memo } from "react"
import "swiper/css"
import "swiper/css/free-mode"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { adsStyle } from "./style"
import styled from "./style.module.scss"

const CarouselAds = ({ listAds }: { listAds: TypeAds[] }) => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false
      }}
      speed={1500}
      navigation={false}
      modules={[Autoplay]}
      className={styled.carousel}
    >
      {listAds.map(ads => {
        return (
          <SwiperSlide
            key={ads?.id}
            style={{ background: `url(${ads?.link})`, ...adsStyle }}
          />
        )
      })}
    </Swiper>
  )
}

export default memo(CarouselAds)
