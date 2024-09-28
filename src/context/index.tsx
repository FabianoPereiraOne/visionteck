"use client"
import { AppContextType } from "@/types/general"
import { Module } from "@/types/module"
import { Train } from "@/types/train"
import { dataUser } from "@/types/user"
import { createContext, ReactNode, useContext, useState } from "react"
import { useForm } from "react-hook-form"

const VisionContext = createContext({} as AppContextType)

export function VisionContextProvider({ children }: { children: ReactNode }) {
  const [openMenu, setOpenMenu] = useState(false)
  const [openPopup, setOpenPopup] = useState(false)
  const [trains, setTrains] = useState<Train[]>([])
  const [modules, setModules] = useState<Module[]>([])
  const [user, setUser] = useState<dataUser | null>(null)
  const { reset, setValue, register, getValues } = useForm()

  return (
    <VisionContext.Provider
      value={{
        openMenu,
        openPopup,
        trains,
        modules,
        user,
        setUser,
        setTrains,
        setModules,
        setOpenMenu,
        setOpenPopup,
        reset,
        setValue,
        register,
        getValues
      }}
    >
      {children}
    </VisionContext.Provider>
  )
}

export const useVisionContext = () => {
  const context = useContext(VisionContext)

  if (context === undefined) {
    throw new Error("Contexto inacessível.")
  }

  return context
}
