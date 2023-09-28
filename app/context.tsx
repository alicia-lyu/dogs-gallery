"use client"

import { createContext, useState } from "react"

interface SelectedType {
    [key: string]: string[]
}

interface SelectedContextType {
    selected: SelectedType,
    setSelected: React.Dispatch<React.SetStateAction<SelectedType>>
}

export const SelectedContext = createContext<SelectedContextType>({} as SelectedContextType)

export function ContextProvider({ children }: { children: React.ReactNode }) {
    const [selected, setSelected] = useState<SelectedType>({})
    return <SelectedContext.Provider value={{ selected, setSelected }}>
        {children}
    </SelectedContext.Provider>
}