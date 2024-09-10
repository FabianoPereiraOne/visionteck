"use client"
import { userSession } from "@/schemas/others/config";
import { AppContextType } from "@/types/general";
import { createContext, ReactNode, useContext, useState } from "react";

const VisionContext = createContext({} as AppContextType)

export function VisionContextProvider({ children }: { children: ReactNode }) {
  const saveUser = sessionStorage && sessionStorage.getItem(userSession)
  const userSessionData = saveUser ? JSON.parse(saveUser) : null
  const [user, setUser] = useState(userSessionData)
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