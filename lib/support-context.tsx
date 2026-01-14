"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface SupportLinks {
  whatsapp: string
  instagram: string
  telegram: string
}

interface SupportContextType {
  links: SupportLinks
  updateLinks: (links: SupportLinks) => void
}

const SupportContext = createContext<SupportContextType | undefined>(undefined)

const defaultLinks: SupportLinks = {
  whatsapp: "",
  instagram: "",
  telegram: "",
}

export function SupportProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<SupportLinks>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("support-links")
      return saved ? JSON.parse(saved) : defaultLinks
    }
    return defaultLinks
  })

  const updateLinks = (newLinks: SupportLinks) => {
    setLinks(newLinks)
    if (typeof window !== "undefined") {
      localStorage.setItem("support-links", JSON.stringify(newLinks))
    }
  }

  return <SupportContext.Provider value={{ links, updateLinks }}>{children}</SupportContext.Provider>
}

export function useSupport() {
  const context = useContext(SupportContext)
  if (!context) {
    throw new Error("useSupport must be used within a SupportProvider")
  }
  return context
}
