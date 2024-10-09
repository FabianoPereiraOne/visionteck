import { Metadata } from "next"
import { CalendarPart } from "./calendar"
import styled from "./style.module.scss"
import { TitlePart } from "./titlePart"

export const metadata: Metadata = {
  title: "Consultoria | Vision Teck",
  description: "Vision Teck investindo em um mundo melhor",
  icons: {
    icon: "/assets/favicon.png"
  }
}

export default async function Meeting() {
  return (
    <section className={styled.container}>
      <TitlePart />
      <CalendarPart />
    </section>
  )
}
