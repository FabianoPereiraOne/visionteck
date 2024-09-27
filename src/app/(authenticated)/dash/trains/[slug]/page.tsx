"use client"
import Loading from "@/components/loading"
import { useVisionContext } from "@/context"
import { Train } from "@/types/train"
import { fetchTrain } from "@/utils/fetch/trains/get"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import BodyClass from "./parts/bodyClass"
import SidebarModules from "./parts/sidebarModules"
import styled from "./style.module.scss"

const ModuleController = ({ params }: { params: { slug: string } }) => {
  const router = useRouter()
  const [train, setTrain] = useState<Train | null | undefined>(null)
  const slug = params?.slug
  const { trains } = useVisionContext()

  const loadDataTrain = async () => {
    try {
      const result = await fetchTrain({ id: slug })
      const response = await result.json()

      if (result?.status !== 200) return router.replace("/dash/trains")

      const originTrain = response?.data ?? {}

      setTrain(originTrain)
    } catch (error) {
      console.error(error)
      router.replace("/dash/trains")
    }
  }

  useEffect(() => {
    if (trains?.length <= 0) {
      loadDataTrain()
      return
    }

    const originTrain = trains?.find(train => train?.id === slug)

    if (originTrain) return setTrain(originTrain)

    router.replace("/dash/trains")
  }, [trains])

  return (
    <>
      {train ? (
        <section className={styled.container}>
          <SidebarModules />
          <BodyClass />
        </section>
      ) : (
        <div className={styled.contentLoading}>
          <Loading />
        </div>
      )}
    </>
  )
}

export default ModuleController
