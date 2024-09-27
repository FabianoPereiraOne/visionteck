import { Train } from "@/types/train"
import Link from "next/link"
import { memo } from "react"
import { FiLock } from "react-icons/fi"
import styled from "./style.module.scss"

const CardTrain = ({ train }: { train: Train }) => {
  return (
    <figure title={train?.title} className={styled.contentImg}>
      <Link
        href={train?.lock ? "" : `/dash/trains/${train?.id}`}
        onClick={event => (train?.lock ? event?.preventDefault() : {})}
      >
        <img src={train?.linkCover} alt={train?.title} />
      </Link>
      {train?.lock && <FiLock className={styled.iconLock} />}
    </figure>
  )
}

export default memo(CardTrain)
