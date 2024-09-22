"use client"
import { useVerifyArrayEmpty } from "@/hooks/useVerifyArrayEmpty"
import { Train } from "@/types/train"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi"
import { Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import { FreeMode } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import styled from "./style.module.scss"

export const ListingTrains = ({ data }: { data: Train[] }) => {
  const { isEmpty } = useVerifyArrayEmpty()
  const router = useRouter()
  const trains = data?.filter(train => train?.modules.length >= 0)
  const swiperRef = useRef<SwiperType>()

  if (isEmpty(trains)) return <></>

  return (
    <div className={styled.container}>
      <Swiper
        slidesPerView={1}
        pagination={{
          clickable: true
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30
          },
          1600: {
            slidesPerView: 5,
            spaceBetween: 30
          }
        }}
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
              <figure
                title={train?.title}
                className={styled.contentImg}
                onClick={() => router.push(`/dash/trains/${train?.id}`)}
              >
                <img src={train?.linkCover} alt={train?.title} />
              </figure>
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
