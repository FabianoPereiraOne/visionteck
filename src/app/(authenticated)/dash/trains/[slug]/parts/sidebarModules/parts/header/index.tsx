import ButtonAdmin from "@/components/buttonAdmin"
import { layoutAddCollection } from "@/layouts/collection/add"
import { Module } from "@/types/module"
import { fetchClientAllModules } from "@/utils/fetch/modules/getAllClient"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { FiPlus } from "react-icons/fi"
import styled from "./style.module.scss"

export const Header = () => {
  const [update, setUpdate] = useState(false)
  const [modules, setModules] = useState<Module[]>([])
  const { reset, register } = useForm()

  const handlerUpdate = () => {}
  const handlerSubmit = () => {}
  const handlerDelete = () => {}
  const loadSetValues = () => {}

  const loadDataAllModules = async () => {
    try {
      const result = await fetchClientAllModules()
      const response = await result.json()
      const listModules: Module[] = response?.data ?? []

      setModules(listModules)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadDataAllModules()
  }, [])

  return (
    <article className={styled.container}>
      <strong className={styled.title}>Módulos</strong>
      <ButtonAdmin
        reset={reset}
        iconButton={<FiPlus />}
        layout={layoutAddCollection({ register })}
        update={update}
        variant='circle'
        fcUpdate={handlerUpdate}
        fcSubmit={handlerSubmit}
        fcDelete={handlerDelete}
        data={modules}
        fcLoadSetValues={loadSetValues}
      />
    </article>
  )
}
