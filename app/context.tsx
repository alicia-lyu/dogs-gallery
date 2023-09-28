"use client"

import { createContext, useState } from "react"

interface SelectedContextType {
    selected: string[]
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
}

export const SelectedContext = createContext<SelectedContextType>({} as SelectedContextType)

export function ContextProvider({ children }: { children: React.ReactNode }) {
    const [selected, setSelected] = useState<string[]>([""])
    return <SelectedContext.Provider value={{selected, setSelected}}>
        {children}
    </SelectedContext.Provider>
}