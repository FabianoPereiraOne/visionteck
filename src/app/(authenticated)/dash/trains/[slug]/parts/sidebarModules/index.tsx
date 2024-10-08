import { Module } from "@/types/module"
import { Train } from "@/types/train"
import { FiXCircle } from "react-icons/fi"
import { Header } from "./parts/header"
import { ModuleComponent } from "./parts/module"
import styled from "./style.module.scss"

const SidebarModules = ({
  modules = [],
  active,
  fcOpen,
  fcReload
}: {
  modules: Module[]
  active: boolean
  fcOpen: (item: boolean) => void
  fcReload: (localTrain?: Train) => Promise<void | NodeJS.Timeout>
}) => {
  const handlerClosePopup = () => {
    fcOpen(false)
  }

  return (
    <aside className={`${styled.container} ${active ? styled.active : ""}`}>
      <button className={styled.btnClose} onClick={handlerClosePopup}>
        <FiXCircle />
      </button>
      <Header fcReload={fcReload} />
      <ul className={styled.contentModules}>
        {modules.map(module => {
          return (
            <ModuleComponent
              key={module?.id}
              fcClosePopup={handlerClosePopup}
              module={module}
              fcReload={fcReload}
              listModules={modules}
            />
          )
        })}
      </ul>
    </aside>
  )
}

export default SidebarModules
