import { Module } from "@/types/module"
import { FiXCircle } from "react-icons/fi"
import { Header } from "./parts/header"
import { ModuleComponent } from "./parts/module"
import styled from "./style.module.scss"

const SidebarModules = ({
  modules = [],
  active,
  fcOpen
}: {
  modules: Module[]
  active: boolean
  fcOpen: (item: boolean) => void
}) => {
  return (
    <aside className={`${styled.container} ${active ? styled.active : ""}`}>
      <button className={styled.btnClose} onClick={() => fcOpen(false)}>
        <FiXCircle />
      </button>
      <Header />
      <ul className={styled.contentModules}>
        {modules.map(module => {
          return <ModuleComponent key={module?.id} module={module} />
        })}
      </ul>
    </aside>
  )
}

export default SidebarModules
