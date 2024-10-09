import { useVerifyAdmin } from "@/hooks/useVerifyAdmin"
import { getPlan } from "@/services/prisma/plans/get"
import { dataUser } from "@/types/user"
import { Metadata } from "next"
import { PlanData } from "./parts/planData"
import { TitlePart } from "./parts/titlePart"
import { UserData } from "./parts/userData"
import styled from "./style.module.scss"

export const metadata: Metadata = {
  title: "Configurações | Vision Teck",
  description: "Vision Teck investindo em um mundo melhor",
  icons: {
    icon: "/assets/favicon.png"
  }
}

export default async function Settings() {
  const { data, isAdmin }: { isAdmin: boolean; data: dataUser } =
    await useVerifyAdmin()
  const plan = await getPlan({ id: data?.planId })

  return (
    <section className={styled.container}>
      <TitlePart isAdmin={isAdmin} />
      <UserData data={data} />
      <PlanData plan={plan} />
    </section>
  )
}
