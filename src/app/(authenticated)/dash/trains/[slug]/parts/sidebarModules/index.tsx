import { Module } from "@/types/module"
import { memo } from "react"
import { Header } from "./parts/header"
import { ModuleComponent } from "./parts/module"
import styled from "./style.module.scss"

const SidebarModules = ({ modules = [] }: { modules: Module[] }) => {
  return (
    <aside className={styled.container}>
      <Header />
      <ul className={styled.contentModules}>
        {modules.map(module => {
          return <ModuleComponent module={module} />
        })}
      </ul>
    </aside>
  )
}

export default memo(SidebarModules)
