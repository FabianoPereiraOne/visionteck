"use client"
import { AppContextType } from "@/types/general"
import { Train } from "@/types/train"
import { createContext, ReactNode, useContext, useState } from "react"

const VisionContext = createContext({} as AppContextType)

export function VisionContextProvider({ children }: { children: ReactNode }) {
  const [openMenu, setOpenMenu] = useState(false)
  const [openPopup, setOpenPopup] = useState(false)
  const [trains, setTrains] = useState<Train[]>([])

  return (
    <VisionContext.Provider
      value={{
        openMenu,
        openPopup,
        trains,
        setTrains,
        setOpenMenu,
        setOpenPopup
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
