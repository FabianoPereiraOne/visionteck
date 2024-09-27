"use client"
import { useVisionContext } from "@/context"
import { useVerifyArrayEmpty } from "@/hooks/useVerifyArrayEmpty"
import { BreakpointsSwapper } from "@/schemas/pages/config"
import { Train } from "@/types/train"
import { useEffect, useRef } from "react"
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi"
import { Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import { FreeMode } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import CardTrain from "./parts/cardTrain"
import styled from "./style.module.scss"

export const ListingTrains = ({
  data,
  listTrains
}: {
  data: Train[]
  listTrains: Train[]
}) => {
  const { isEmpty } = useVerifyArrayEmpty()
  const trains = data?.filter(train => train?.modules.length >= 0)
  const swiperRef = useRef<SwiperType>()
  const { setTrains } = useVisionContext()

  useEffect(() => {
    setTrains(listTrains)
  }, [])

  if (isEmpty(trains)) return <></>

  return (
    <div className={styled.container}>
      <Swiper
        slidesPerView={1}
        pagination={{
          clickable: true
        }}
        breakpoints={BreakpointsSwapper}
        freeMode={true}
        spaceBetween={10}
        speed={1000}
        modules={[FreeMode]}
        className={styled.carousel}
        onBeforeInit={swiper => {
          swiperRef.current = swiper
        }}
      >
        {trains?.map(train => {
          return (
            <SwiperSlide key={train?.id}>
              <CardTrain train={train} />
            </SwiperSlide>
          )
        })}
      </Swiper>
      <button
        className={styled.btnLeft}
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <FiArrowLeftCircle />
      </button>
      <button
        className={styled.btnRight}
        onClick={() => swiperRef.current?.slideNext()}
      >
        <FiArrowRightCircle />
      </button>
    </div>
  )
}
