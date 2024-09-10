"use client"
import useGetUserData from "@/hooks/useGetUserData";
import { AppContextType } from "@/types/general";
import { createContext, ReactNode, useContext, useState } from "react";

const VisionContext = createContext({} as AppContextType)

export function VisionContextProvider({ children }: { children: ReactNode }) {
  const { getUserData } = useGetUserData()
  const [openMenu, setOpenMenu] = useState(false)
  const user = getUserData()

  return (
    <VisionContext.Provider value={{ user, openMenu, setOpenMenu }}>
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