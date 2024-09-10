"use client"
import { AppContextType } from "@/types/general";
import { createContext, ReactNode, useContext, useState } from "react";

const VisionContext = createContext({} as AppContextType)

export function VisionContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null)
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <VisionContext.Provider value={{ user, openMenu, setUser, setOpenMenu }}>
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