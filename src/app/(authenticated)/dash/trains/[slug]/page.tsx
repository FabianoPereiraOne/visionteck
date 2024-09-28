"use client"
import Loading from "@/components/loading"
import { useVisionContext } from "@/context"
import { useVerifyAccessPlan } from "@/hooks/useVerifyAccessPlan"
import { Train } from "@/types/train"
import { dataUser } from "@/types/user"
import { fetchClientAllTrains } from "@/utils/fetch/trains/getAllClient"
import { fetchClientUser } from "@/utils/fetch/user/get"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FiArrowLeft } from "react-icons/fi"
import BodyClass from "./parts/bodyClass"
import SidebarModules from "./parts/sidebarModules"
import styled from "./style.module.scss"

const ModuleController = ({ params }: { params: { slug: string } }) => {
  const router = useRouter()
  const [train, setTrain] = useState<Train | null | undefined>(null)
  const [open, setOpen] = useState(false)
  const slug = params?.slug
  const { verifyAccess } = useVerifyAccessPlan()
  const { trains, setUser, setValue, setTrains, setModules, classActive } =
    useVisionContext()

  const loadDataUser = async () => {
    try {
      const result = await fetchClientUser()
      const response = await result?.json()
      const user: dataUser = response?.data

      setUser(user)
      return user
    } catch (error) {
      console.error(error)
    }
  }

  const loadDataTrain = async (localTrain?: Train) => {
    try {
      const dataUser = await loadDataUser()

      if (!dataUser?.planId) return router.replace("/dash/trains")

      if (localTrain) {
        setValue("trainId", localTrain?.id)
        return setTrain(localTrain)
      }

      const result = await fetchClientAllTrains()
      const response = await result.json()
      const listTrains: Train[] = response?.data ?? []
      const dataTrain = listTrains.find((train: Train) => train?.id === slug)
      const listModules = listTrains
        ?.map((train: Train) => train?.modules)
        .flat()

      if (!dataTrain) return router.replace("/dash/trains")

      const hasAccess = verifyAccess(dataUser?.planId, dataTrain?.planId)

      if (!hasAccess) {
        toast("Você não tem acesso a essa trilha.", {
          icon: "ⓘ"
        })
        return setTimeout(() => router.replace("/dash/trains"), 500)
      }

      setTrain(dataTrain)
      setValue("trainId", dataTrain?.id)
      setTrains(listTrains)
      setModules(listModules)
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

    const trainFiltered = trains?.find(train => train?.id === slug)

    if (trainFiltered) {
      loadDataTrain(trainFiltered)
      const listModules = trains?.map((train: Train) => train?.modules).flat()
      setModules(listModules)
      return
    }

    router.replace("/dash/trains")
  }, [trains])

  return (
    <>
      {train ? (
        <section className={styled.container}>
          <button className={styled.btnModule} onClick={() => setOpen(!open)}>
            <FiArrowLeft /> Módulos
          </button>
          <SidebarModules
            fcReload={loadDataTrain}
            modules={train?.modules}
            active={open}
            fcOpen={setOpen}
          />
          <BodyClass classActive={classActive} />
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
